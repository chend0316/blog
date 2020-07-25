# 配置 Vue 工程环境
虽然我们有开箱即用的 vue-cli 脚手架，但不代表我们不需要理解 Vue 是如何跑起来的，因此有必要学习在不用 vue-cli 的情况下如何配置 Vue 工程。

## 开篇介绍
### 阅读前的环境准备工作
本文从零开始，项目初始时只有一个`package.json`文件，文件里面也只是一个空对象，如下：
```json
{}
```

### 阅读本文前需要具备的知识
- 包管理工具可选 npm、yarn，这里采用 npm
- 打包工具这里选用 Webpack
- Vue 应用开发一般会编写 .vue 后缀的单文件组件 (SFC)，这是需要配置的
- 如果要用 TypeScript，也要进行配置

### 本文知识点
基础：
- 不使用 SFC 的情况下搭建 Vue 工程
- 使用 SFC
- 使用 JSX

为什么说 Vue 对 TypeScript 的支持不友好？
- SFC + TypeScript 的组合，需要先编译 SFC 后编译 TS，这让 tsconfig 文件变得怪异
- Vue 的 API 风格对人类友好，但对 TS 类型推断 (Type Inference) 不友好
- Vue HTML 模板中的插值表达式 (Interpolations) 难以启用 TS 类型检查

## Webpack
Webpack 的工作流程：
- 用 npm 安装：`npm install -D webpack webpack-cli`
- 编写 webpack.config.js 配置文件
- 运行 Webpack

Webpack 最小配置：
```js
const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

### SFC 配置
虽然理论上不用，但一般 Vue 项目都会编写 [SFC](https://cn.vuejs.org/v2/guide/single-file-components.html)，这就需要引入 [Vue Loader](https://vue-loader.vuejs.org/zh/) 来编译 SFC。Loader 和 Plugin 都是 Webpack 的概念。

安装：`npm install -D vue-loader vue-template-compiler`。

编译时，需要将 SFC 拆分为 HTML、JS、CSS 这三个不同部分，然后对于不同部分采用各自的 Loader 处理。对 Webpack 熟悉的同学应该知道，对文件一分三的操作无法通过 Loader 实现，需要用 Plugin。这也就是为什么在 Webpack 配置文件中，我们还需要引入 Vue 的 Plugin，如下。
``` js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

通过上面的配置，我们就能 `import` SFC 了，如下：
```js
import './App.vue';
```

### JSX 配置

## TypeScript 配置
