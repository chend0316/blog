const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: './dist',
    hot: true
  },
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
}
