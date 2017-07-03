import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';

import common from './common.config';
import { clientRule as babelRule } from './babel-loader.config';
import { dev } from '../common';

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

  plugins: [
    ...common.plugins,

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
      fileName: 'webpack-manifest.json',
    }),

    ...(dev ? [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new ExtractTextPlugin('[name].[contenthash].css'),
    ]),
  ],
};

