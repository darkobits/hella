import path from 'path';

import bytes from 'bytes';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ms from 'ms';
import webpack from 'webpack';
import { GenerateSW, GenerateSWOptions } from 'workbox-webpack-plugin';


/**
 * Resolve the path to our package root and package.json. Used throughout
 * configuration.
 */
const PKG_ROOT = path.resolve(__dirname);
const PKG_JSON = require(path.resolve(PKG_ROOT, 'package.json'));
const APP_NAME = PKG_JSON.displayName || 'App';


export default (env: string, argv: any): webpack.Configuration => {
  const config: webpack.Configuration = {};
  config.module = {rules: []};
  config.plugins = [];


  // ----- Entry / Output ------------------------------------------------------

  config.entry = {
    app: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'react-hot-loader/patch',
      path.resolve(PKG_ROOT, 'src', 'index.tsx')
    ]
  };

  config.output = {
    path: path.resolve(PKG_ROOT, 'dist'),
    filename: argv.mode === 'production' ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  };


  // ----- Loaders -------------------------------------------------------------

  // ESLint
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    enforce: 'pre',
    use: [{
      loader: 'eslint-loader',
      options: {
        emitErrors: true,
        emitWarning: true,
        failOnError: argv.mode === 'production'
      }
    }]
  });

  // TypeScript & JavaScript files.
  config.module.rules.push({
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: true
      }
    }, {
      loader: 'linaria/loader',
      options: {
        sourceMap: argv.mode === 'development',
        displayName: argv.mode === 'development'
      }
    }]
  });

  // Stylesheets.
  config.module.rules.push({
    test: /\.css$/,
    use: [{
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true
      }
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: argv.mode === 'development'
      }
    }]
  });

  // SVG.
  config.module.rules.push({
    test: /\.svg$/,
    use: [{
      loader: '@svgr/webpack'
    }]
  });

  // Other images.
  config.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: bytes('10kb'),
        name: 'assets/[name].[hash].[ext]'
      }
    }]
  });

  // Text files.
  config.module.rules.push({
    test: /\.txt$/,
    use: [{
      loader: 'raw-loader'
    }]
  });

  // Fonts.
  config.module.rules.push({
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: bytes('10kb')
      }
    }]
  });


  // ----- Module Resolution ---------------------------------------------------

  config.resolve = {
    alias: {
      // Use the @hot-loader variant of react-dom in development to avoid this
      // issue: https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-469046186
      'react-dom': argv.mode === 'production' ? 'react-dom' : '@hot-loader/react-dom'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  };


  // ----- Plugins -------------------------------------------------------------

  config.plugins.push(new webpack.NamedModulesPlugin());

  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(PKG_ROOT, 'src', 'index.html'),
    inject: true,
    title: APP_NAME
  }));

  config.plugins.push(new MiniCssExtractPlugin({
    filename: argv.mode === 'production' ? 'styles-[contenthash].css' : 'styles.css'
  }));

  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: argv.mode === 'production'
  }));

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(argv.mode),
    'process.env.NAME': JSON.stringify(APP_NAME),
    'process.env.DESCRIPTION': JSON.stringify(PKG_JSON.description),
    'process.env.VERSION': JSON.stringify(PKG_JSON.version)
  }));

  if (argv.mode === 'development') {
    config.plugins.push(new FriendlyErrorsWebpackPlugin());
  }

  if (argv.mode === 'production') {
    // Delete the build output directory before production builds.
    config.plugins.push(new CleanWebpackPlugin());

    config.plugins.push(new GenerateSW({
      cacheId: APP_NAME,
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: argv.mode === 'development' ? bytes('100mb') : bytes('750kb'),
      // Allow Workbox to add local assets to the cache that were not in the
      // initial manifest.
      runtimeCaching: [{
        urlPattern: new RegExp('(' + [
          // To allow Workbox to cache requests from Google Fonts, we must use a
          // pattern that matches the start of the URL.
          '^https://fonts.googleapis.com',
          // Match any other requests.
          '.*'
        ].join('|') + ')', 'g'),
        // The StaleWhileRevalidate strategy tells Workbox to serve the cached
        // asset while it tries to fetch a newer version.
        handler: 'StaleWhileRevalidate',
        options: {
          // If a network request fails, allow Workbox to replay the request when
          // connectivity has been restored.
          backgroundSync: {
            name: 'background-sync-queue',
            options: {
              maxRetentionTime: ms('1 hour')
            }
          }
        }
      }]
    }));
  }

  config.plugins.push(new FaviconsWebpackPlugin({
    logo: path.resolve(PKG_ROOT, 'src', 'assets', 'favicon.png'),
    mode: 'webapp',
    inject: true,
    prefix: 'icons/',
    favicons: {
      appName: [
        APP_NAME,
        argv.mode === 'development' ? '(Dev)' : false
      ].filter(Boolean).join(' '),
      icons: {
        appleStartup: {
          background: '#121416'
        }
      }
    }
  }));


  // ----- Dev Server ----------------------------------------------------------

  if (argv.mode === 'development') {
    config.devServer = {
      port: 8080,
      compress: true,
      historyApiFallback: true,
      disableHostCheck: true,
      host: '0.0.0.0',
      hot: true,
      inline: true,
      overlay: true,
      quiet: true
    };
  }


  // ----- Misc ----------------------------------------------------------------

  config.node = {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  };

  config.devtool = argv.mode === 'development' ? '#eval-source-map' : '#source-map';

  config.optimization = {
    minimize: argv.mode === 'production',
    splitChunks: {
      chunks: 'all'
    }
  };

  config.stats = 'minimal';

  return config;
};
