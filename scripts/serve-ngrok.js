#!/usr/bin/env node

/**
 * ----- Server ----------------------------------------------------------------
 *
 * This module creates a static asset server on a random local port and then
 * creates an ngrok tunnel to that server.
 *
 * The server uses zlib compression to make things as production-like as
 * possible and to improve Lighthouse scores.
 *
 * The server assumes it will be serving assets from a
 */
import fs from 'fs/promises';
import path from 'path';

import LogFactory from '@darkobits/log';
import compression from 'compression';
import express from 'express';
import getPort from 'get-port';
import ms from 'ms';
import ngrok from 'ngrok';
import pTimeout from 'p-timeout';
import waitOn from 'wait-on';
import which from 'which';


/**
 * @private
 *
 * Logger instance.
 */
const log = LogFactory({ heading: 'serve' });


/**
 * @private
 *
 * Amount in milliseconds to wait for a given ngrok executable to successfully
 * connect.
 */
const NGROK_TIMEOUT = 1000;


/**
 * @private
 *
 * Error message to show the user if all ngrok executables timed-out.
 */
const NGROK_TIMEOUT_MSG = [
  'Timeout while creating tunnel.',
  'This is usually due to an issue with your ngrok installation.'
].join(' ');


/**
 * @private
 *
 * Provided an absolute path or a path relative to the working directory,
 * resolves the path, ensure it is a directory that can be read, and checks for
 * the presence of an index.html file within.
 *
 * @returns The absolute path to the resolved directory.
 */
async function resolveTargetDirectory(dir = '.') {
  let targetDir = '';

  if (path.isAbsolute(dir)) {
    targetDir = dir;
  } else {
    const cwd = process.cwd();
    targetDir = path.resolve(cwd, dir);
  }

  // Wait for target directory to become available.
  log.verbose(log.prefix('targetDir'), `${log.chalk.green(targetDir)} - waiting.`);

  await waitOn({
    resources: [targetDir],
    timeout: 15_000
  });

  log.verbose(log.prefix('targetDir'), `${log.chalk.green(targetDir)} - ready.`);

  const files = await fs.readdir(targetDir);

  // Issue a warning if the target directory does not contain index.html. This
  // is not necessarily an error, as the user may not have compiled their
  // application yet, or may be using a tool that continuously rebuilds it.
  if (!files.includes('index.html')) {
    log.warn(`Directory ${log.chalk.green(targetDir)} does not contain an ${log.chalk.green('index.html')}.`);
  }

  return targetDir;
}


/**
 * @private
 *
 * Uses `which` to get the paths of all known ngrok executables installed on the
 * system.
 */
function getNgrokBinPaths() {
  return new Promise((resolve, reject) => {
    which('ngrok', { all: true }, (err, resolvedPaths) => {
      if (err) return reject(err);
      resolve(resolvedPaths.map(path.dirname));
    });
  });
}


/**
 * @private
 *
 * Provided a list of ngrok executable paths and a port, attempts to create a
 * tunnel using each. Returns the tunnel URL of the first executable to create
 * one.
 *
 * Rationale: At the time of development, the Node wrapper for ngrok uses an
 * executable that is compiled for the darwin-x86 architecture, but on M1 Macs,
 * we need the darwin-arm64 version. Additionally, when the Node wrapper tries
 * to use an incompatible executable, it will hang indefinitely rather than
 * throwing an error. Therefore, by attempting multiple installation paths
 * (with timeouts) we can gracefully fall-back to a global installation of ngrok
 * that actually works.
 *
 * @param {Array<string>} binPaths
 * @param {number} port
 */
async function createNgrokTunnel(binPaths, port) {
  for (const binPath of binPaths) {
    try {
      const url = await pTimeout(ngrok.connect({
        binPath: () => binPath,
        proto: 'http',
        addr: port,
        onStatusChange: status => {
          log.verbose(log.prefix('ngrok'), `Status: ${log.chalk.yellow(status)}`);
        },
        onLogEvent: data => {
          log.silly(log.prefix('ngrok'), data);
        }
      }), NGROK_TIMEOUT, 'TIMEOUT');

      log.verbose(log.prefix('ngrok'), `Using executable at ${log.chalk.green(binPath)}`);

      return url;
    } catch (err) {
      if (err.message === 'TIMEOUT') {
        continue;
      }

      throw err;
    }
  }

  throw new Error(NGROK_TIMEOUT_MSG);
}


async function main() {
  const time = log.createTimer();

  try {
    // ----- Prerequisites -----------------------------------------------------

    const relativeTargetDir = process.argv[2];

    const [
      targetDir,
      ngrokBinPaths,
      port
    ] = await Promise.all([
      // Resolve path to target directory, wait for it to become available.
      resolveTargetDirectory(relativeTargetDir),
      // Resolve paths to all ngrok installations on the system.
      getNgrokBinPaths(),
      // Get a random unused high port for the local server to listen on.
      getPort()
    ]);


    // ----- Express App -------------------------------------------------------

    const app = express();
    app.use(compression());

    log.verbose(log.prefix('ngrokBinPath'), log.chalk.green(ngrokBinPaths));

    // Serve static files from the target directory.
    app.use(express.static(targetDir, { maxAge: ms('1 year') }));

    const indexPath = path.resolve(targetDir, 'index.html');

    // Respond to all other requests by serving index.html.
    app.get('*', async (req, res, next) => {
      try {
        // Wait up to 15 seconds for index.html to become available.
        await waitOn({ resources: [indexPath], timeout: ms('10 seconds') });

        if (res.headersSent) {
          throw new Error('[GET] Unable to send index.html; headers already sent.');
        }

        await new Promise((resolve, reject) => {
          res.sendFile(indexPath, err => (err ? reject(err) : resolve()));
        });

        next();
      } catch (err) {
        console.error(`[GET] ${req.path} - Error:`, err);
        console.error(`[GET] ${req.path} - Responding with a 404.`);
        res.sendStatus(404);
        next(err);
      }
    });


    // ----- Initialization ----------------------------------------------------

    const [
      tunnelUrl
    ] = await Promise.all([
      // Create tunnel.
      createNgrokTunnel(ngrokBinPaths, port),
      // Start server
      new Promise(resolve => app.listen(port, resolve))
    ]);

    log.silly(`Local: ${log.chalk.blue(`https://localhost:${port}`)}`);
    log.info(`Tunnel: ${log.chalk.blue(tunnelUrl)}`);
    log.info(`Admin:  ${log.chalk.blue('http://localhost:4040')}`);
    log.info(`Root:   ${log.chalk.green(targetDir)}`);
    log.info(log.chalk.gray(`Ready in ${time}.`));
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
}


void main();
