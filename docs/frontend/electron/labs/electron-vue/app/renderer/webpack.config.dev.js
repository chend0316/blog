const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')

const config = {
  devServer: {

  },
  mode: 'development',
}

module.exports = merge(baseConfig, config)