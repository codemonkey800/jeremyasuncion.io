import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

import common from './common.config';
import { serverRule as babelRule } from './babel-loader.config';
import { dev } from '../common';

export default {
  ...common,

  target: 'node',

  externals: nodeExternals(),
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    globals: false,
    process: false,
  },

  entry: './src/server/index.js',

  output: {
    ...common.output,
    filename: 'server.js',
  },

  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      babelRule,
    ],
  },

  plugins: [
    ...common.plugins,

    new webpack.ProvidePlugin({
      fetch: 'node-fetch',
    }),

    ...(!dev ? [] : [
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: true,
      }),
    ]),
  ],
};

