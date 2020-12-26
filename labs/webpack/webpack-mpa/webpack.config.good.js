const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob')

function generateMPAConfig() {
  const entryFiles = glob.sync('./src/*/index.js')
  // entryFiles === [ './src/about/index.js', './src/home/index.js' ]
  const htmlWebpackPlugins = []
  const entry = {}
  entryFiles.forEach((filePath) => {
    const match = filePath.match(/src\/(.+)\/index\.(js|ts)$/)
    const entryName = match && match[1]
    entry[entryName] = filePath
    htmlWebpackPlugins.push(new HtmlwebpackPlugin({
      template: path.resolve(__dirname, `./src/${entryName}/index.html`),
      filename: `${entryName}.html`,
      chunks: [entryName] 
    }))
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = generateMPAConfig()

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins
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