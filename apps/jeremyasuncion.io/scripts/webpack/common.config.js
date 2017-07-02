import webpack from 'webpack';

import { dev, resolve } from '../common';

export default {
  cache: dev,
  context: resolve(),
  devtool: dev ? '#inline-source-map' : false,

  output: {
    path: resolve('dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        loader: 'eslint-loader',
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.EnvironmentPlugin({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
    }),

    ...(dev ? [] : [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
      }),
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
      }),
    ]),
  ],
};

