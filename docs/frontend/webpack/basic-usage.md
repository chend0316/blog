# 基本使用场景

## 解析代码、资源
### 解析 CSS、Less、Sass
以 Sass 为例，按顺序使用 sass-loader、css-loader、style-loader 即可。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
}
```

### 解析图片、字体等二进制文件
可以使用 file-loader 或 url-loader 加载二进制文件，file-loader 更简单一些，我们以 file-loader 为例。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

以 PNG 图片为例，file-loader 会将图片移动到输出目录，并修改文件名为：xxx.png。在业务中，我们可以像下面这样引入图片，代码中 logo 变量的值就是 xxx.png。
```javascript
import logo from './logo.png'

const img = document.createElement('img')
img.src = logo
document.body.appendChild(img)
```

### 解析 React JSX

### 解析 Vue

### 解析 TypeScript

### 打包基础库
打包库一般会使用 Rollup，因为更加简单、纯粹，但用 Webpack 也可以。

基本需求为：
- 支持打包压缩版、非压缩版本
- 支持 AMD/CMD/ESM 引入
- 单元测试
- `npm publish` 发包，通过钩子配置发包前执行的命令

发包的流程是：
- 执行 `npm publish` 命令
- 自动执行钩子，例如 `npm test`、`npm build` 这样的命令
- 然后就会根据 package.json 中 main 字段指定的入口发包

## 兼容性
### 自动添加 CSS 前缀
[Autoprefixer](https://www.npmjs.com/package/autoprefixer) 

### 移动端 px 自动转 rem

## 工程、效率
### HtmlWebpackPlugin
可以自动生成一个 index.html，很方便，开发必备。最高级的地方在于可以在页面中自动插入一行 `<script src="bundle.js">`。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

### 自动清理 dist 目录
使用 clean-webpack-plugin。

## 其它
### 打包多页应用
单页应用叫做 SPA，多页应用叫做 MPA，MPA 会有多个入口文件。

::: details 传统 MPA 的配置方法
<<< @/../labs/webpack/webpack-mpa/webpack.config.bad.js
:::

上面的配置方法不够灵活，如果增加了新的页面，我们还需要手动修改 Webpack 配置文件。考虑到 Webpack 配置文件本身就是 JavaScript 代码，我们可以借此实现更灵活的打包。

关键思路如下：
- 团队成员约定多页应用中，代码文件的组织规则
- 利用 [glob](https://www.npmjs.com/package/glob) 这个包，根据约定的规则动态获取 src 目录下的文件

::: details 利用 glob 灵活打包多页应用
<<< @/../labs/webpack/webpack-mpa/webpack.config.good.js
:::
