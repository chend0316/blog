const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
  	path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' } // 对于 .txt 后缀的文件，采用 raw-loader 处理
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './src/index.html'
    })
  ]
};