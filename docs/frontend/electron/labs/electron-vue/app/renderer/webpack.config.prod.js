const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')

const config = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
}

module.exports = merge(baseConfig, config)
