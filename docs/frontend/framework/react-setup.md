# 从零开始搭建 React 环境

安装最基本的包：
- webpack
- react
- react-dom

## 使用 JSX
关键是要把代码扔给 Babel 过一遍，然后 Babel 的预设使用 env 和 react。

由于我们使用 Webpack 去拉起 Babel，所以还要装 babel-loader。

package.json：
```json
{
  "dependencies": {
    "react": "^16.13.1"
  },
  "devDependencies": {
    "@babel/core": "^7.10.5",
    "@babel/preset-env": "^7.10.4",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ]
  }
}
```

webpack.config.js：
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './helloworld.js',
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
```
