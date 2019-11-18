const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  context: __dirname,
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
  },

  entry: {
    app: './src/index.tsx',
  },

  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },

      {
        test: /\.pug/,
        exclude: /node_modules/,
        loader: 'pug-loader',
      },

      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],

    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: './src/index.pug',
    }),

    new ForkTsCheckerPlugin({
      eslint: true,
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
}

if (isProd) {
  config.mode = 'development'
  config.devtool = false
  config.output.filename = '[name].[contenthash].js'
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  }
}

module.exports = config
