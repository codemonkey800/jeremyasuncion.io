import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-assets-manifest';

import common from './common.config';
import { clientRule as babelRule } from './babel-loader.config';
import { dev } from '../common';

const COMPRESS_THRESHOLD_SIZE = 1024 * 10;

export default {
  ...common,

  entry: {
    client: [].concat(
      'normalize.css',
      'babel-polyfill',
      'whatwg-fetch',
      'react-hot-loader/patch',
      './src/client/index.js',
    ),
  },

  output: {
    ...common.output,
    filename: dev ? '[name].js' : '[name].[chunkhash].js',
  },

  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      babelRule,
      {
        test: /\.css$/,
        use: dev ? [
          'style-loader',
          'css-loader',
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [].concat(
    common.plugins,

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ context }) => (
        context &&
        context.includes('node_modules')
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new ManifestPlugin({
      output: 'webpack-manifest.json',
      writeToDisk: !dev,
    }),

    dev ? [] : [
      new ExtractTextPlugin('[name].[contenthash].css'),
      new CompressionPlugin({
        threshold: COMPRESS_THRESHOLD_SIZE,
      }),
    ],
  ),
};

