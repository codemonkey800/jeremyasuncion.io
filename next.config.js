const TsconfigPathsplugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack(config) {
    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(new TsconfigPathsplugin())

    return config
  },
}
