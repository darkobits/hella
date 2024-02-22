/* eslint-disable quotes */
import fs from 'node:fs/promises';

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import iconsPlugin from 'unplugin-icons/webpack';


export default async (phase, { defaultConfig }) => {
  const packageJson = JSON.parse(await fs.readFile('package.json', { encoding: 'utf8' }));

  const cspHeader = [
    `default-src 'self';`,
    `script-src 'self' 'unsafe-eval' 'unsafe-inline';`,
    `style-src 'self' 'unsafe-inline' fonts.googleapis.com;`,
    `img-src 'self' blob: data:;`,
    `font-src 'self' fonts.gstatic.com;`,
    `object-src 'none';`,
    `base-uri 'self';`,
    `form-action 'self';`,
    `frame-ancestors 'none';`,
    `connect-src 'self' finnhub.io;`,
    'block-all-mixed-content;'
  ];

  if (phase === 'phase-production-build') {
    cspHeader.push('upgrade-insecure-requests;');
  }

  /**
   * @type { import('next').NextConfig }
   */
  const nextConfig = {
    // Broken af as of Feb 23, 2024.
    // output: 'export',
    // distDir: 'dist',

    // See: https://vanilla-extract.style/documentation/integrations/next/#transpiling-vanilla-extract-dependent-libraries
    // transpilePackages: []

    reactStrictMode: true,

    env: {
      VERSION: packageJson.version,
      DESCRIPTION: packageJson.description,
      BUILD_TIME: String(Date.now())
    },

    // headers: () => [{
    //   source: '/(.*)',
    //   headers: [{
    //     key: 'Content-Security-Policy',
    //     value: cspHeader.join(' ')
    //   }]
    // }],

    images: {
      // https://universal.hellopublic.com/companyLogos/AAPL@2x.png
      remotePatterns: [{
        protocol: 'https',
        hostname: 'universal.hellopublic.com',
        pathname: '/**',
        port: ''
      }]
    },

    webpack: config => {
      config.plugins.push(iconsPlugin({
        compiler: 'jsx',
        jsx: 'react'
      }));

      return config;
    }
  };

  const withVanillaExtract = createVanillaExtractPlugin();
  return  withVanillaExtract(nextConfig);
};
