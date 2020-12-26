const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    home: './src/home/index.js',
    about: './src/about/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, './src/home/index.html'),
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, './src/about/index.html'),
      filename: 'about.html',
      chunks: ['about']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
}