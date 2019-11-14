const withCSS = require('@zeit/next-css')
const TsconfigPathsplugin = require('tsconfig-paths-webpack-plugin')

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    namedExport: true,
  },

  webpack(config, options) {
    if (!options.isServer) {
      const cssLoader = options.defaultLoaders.css.find(
        entry => entry.loader === 'css-loader',
      )
      if (cssLoader) {
        cssLoader.loader = 'typings-for-css-modules-loader'
      }
    }

    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(new TsconfigPathsplugin())

    return config
  },
})
