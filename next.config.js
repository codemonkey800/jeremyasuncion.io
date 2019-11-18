const TsconfigPathsplugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },

  webpack(config) {
    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(new TsconfigPathsplugin())

    return config
  },
}
