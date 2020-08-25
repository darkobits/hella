import path from 'node:path';

import { vite } from '@darkobits/tsx';
import { faviconsPlugin } from '@darkobits/vite-plugin-favicons';
import { visualizer } from 'rollup-plugin-visualizer';
import iconsPlugin from 'unplugin-icons/vite';
import fontsPlugin from 'vite-plugin-fonts';
import { VitePWA } from 'vite-plugin-pwa';

import type { PluginOption } from 'vite';

// N.B. This package's default export is currently broken.
// const fontsPlugin = Reflect.get(_fontsPlugin, 'default') as typeof _fontsPlugin;


/**
 * Creates a virtual module, 'virtual:build-time' which exports a number
 * representing the Unix timestamp at which the application was built.
 */
function buildTimePlugin(): PluginOption {
  const virtualModuleId = 'virtual:build-time';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'build-time-plugin',
    resolveId: id => {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load: id => {
      if (id !== resolvedVirtualModuleId) return;

      return `
        let BUILD_TIME = ${Date.now()};

        if (import.meta.hot) {
          import.meta.hot.on('build-time-plugin:update', timestamp => {
            BUILD_TIME = timestamp;
          });
        }

        export default () => BUILD_TIME;
      `;
    },
    handleHotUpdate: ({ server }) => {
      server.ws.send({
        type: 'custom',
        event: 'build-time-plugin:update',
        data: Date.now()
      });
    }
  }
};


export default vite(({ config, pkg, mode, ms, manualChunks }) => {
  config.define = {
    ...config.define,
    'import.meta.env.DESCRIPTION': `"${pkg.json.description}"`,
    'import.meta.env.VERSION': `"${pkg.json.version}"`,
  };

  // Code splitting.
  manualChunks([{
    name: 'react',
    vendor: true,
    include: [
      'object-assign',
      'scheduler',
      'react',
      'react-dom'
    ]
  }, {
    name: 'vendor',
    vendor: true
  }]);


  // ----- Plugins -------------------------------------------------------------

  config.plugins.push(buildTimePlugin());

  // reconfigurePlugin(config)(buildTimePlugin());

  config.plugins.push(faviconsPlugin({
    appName: 'Hella',
    version: pkg.json.version,
    appDescription: pkg.json.description,
    developerName: 'darkobits',
    developerURL: 'https://github.com/darkobits',
    icons: {
      favicons: {
        source: path.resolve(pkg.rootDir, 'src', 'assets', 'favicon.png')
      },
      appleIcon: {
        source: path.resolve(pkg.rootDir, 'src', 'assets', 'favicon.png')
      },
      appleStartup: {
        source: path.resolve(pkg.rootDir, 'src', 'assets', 'favicon.png'),
        background: '#121416'
      },
      android: {
        source: path.resolve(pkg.rootDir, 'src', 'assets', 'favicon.png')
      }
    }
  }));

  // Google Fonts
  config.plugins.push(fontsPlugin({
    google: {
      families: ['Montserrat']
    }
  }));

  // Icons: https://icones.js.org/
  config.plugins.push(iconsPlugin({
    compiler: 'jsx',
    jsx: 'react'
  }));

  // Workbox (PWA) Setup.
  config.plugins.push(VitePWA({
    // TODO: Fix this typing in tsx.
    outDir: config.build.outDir as string,
    filename: 'service-worker.js',
    manifest: {
      name: 'Hella',
      description: pkg.json.description,
      display: 'standalone',
      background_color: '#17191B',
      // Note: This will be the background color of the notched area on Apple
      // devices with them.
      // theme_color: '#17191B'
    },
    injectRegister: null,
    workbox: {
      // Instruct Workbox to pre-cache all static assets in the build.
      globPatterns: [
        '**'
      ],
      globIgnores: [
        '**\/node_modules\/**\/*',
        '**\/apple-touch-*',
        '**\/android-chrome-*',
        '**\/firefox_app_*',
        '**\/favicon-*'
      ],
      cacheId: pkg.json.displayName,
      runtimeCaching: [{
        // The StaleWhileRevalidate strategy tells Workbox to serve the cached
        // asset while it tries to fetch a newer version.
        handler: 'StaleWhileRevalidate',
        urlPattern: new RegExp(`(${[
          // To allow Workbox to cache responses from Google Fonts, we _must_
          // use a pattern that matches the start of the URL.
          '^https://fonts.googleapis.com',
          // Match any other requests.
          '.*'
        ].join('|')})`, 'g'),
        options: {
          // If a network request fails, allow Workbox to replay the request
          // when connectivity has been restored.
          backgroundSync: {
            name: `${pkg.json.displayName.toLowerCase()}-background-sync-queue`,
            options: {
              maxRetentionTime: ms('20 seconds')
            }
          }
        }
      }]
    }
  }));


  /**
   * Generate a report for production builds.
   */
  if (mode === 'production') {
    config.plugins.push(visualizer({
      emitFile: true,
      filename: 'build-stats.html',
      template: 'sunburst',
      gzipSize: true
    }));
  }
});
