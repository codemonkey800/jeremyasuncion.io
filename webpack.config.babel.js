import BabiliPlugin from 'babili-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import path from 'path';
import webpack from 'webpack';

import packageConfig from './package.json';

const isDev = process.env.NODE_ENV !== 'production';

const devServer = {
  contentBase: path.resolve(__dirname, 'dist'),
  historyApiFallback: true,
  host: '0.0.0.0',
  hot: true,
  noInfo: true,
  port: 8080,
};

export default {
  devServer,

  context: __dirname,
  devtool: isDev ? '#inline-source-map' : false,
  entry: {
    entry: [].concat(
      'react-hot-loader/patch',

      isDev ? [
        `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
        'webpack/hot/only-dev-server',
      ] : [],

      './src/index.js',
    ),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
  },
  module: {
    rules: [].concat(
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },

      isDev ? {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      } : {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules',
            'postcss-loader',
          ],
        }),
      },
    ),
  },
  plugins: [].concat(
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${isDev ? 'development' : 'production'}"`,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ context }) => (
        context &&
        context.indexOf('node_modules') !== -1
      ),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new ExtractTextPlugin('styles.[contenthash].css'),

    new HTMLPlugin({
      title: packageConfig.name,
      template: './src/index.ejs',
    }),

    new CopyPlugin([
      { from: './CNAME' },
    ]),

    isDev ? [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
      }),
      new OfflinePlugin(),
      new BabiliPlugin({
        comments: false,
      }),
    ],
  ),
};
