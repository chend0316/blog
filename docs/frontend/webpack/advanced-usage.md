# 高级使用场景

## 性能、体积优化
### 代码压缩

### 提取公共代码、文件

::: details 使用 html-webpack-externals-plugin 将 React 提取到 CDN
<<< @/../labs/webpack/html-webpack-externals-plugin/webpack.config.js
<<< @/../labs/webpack/html-webpack-externals-plugin/src/index.js
:::

::: details 使用 SplitChunksPlugin 分离公共代码
<<< @/../labs/webpack/split-chunks-plugin/webpack.config.js
:::

### 图片压缩

### 初级分析：Webpack stats

### 速度优化：speed-measure-webpack-plugin

### 体积优化：webpack-bundle-analyzer

## 工程、效率
### 文件监听、自动刷新、HMR
【实现文件监听自动构建】在命令行参数加上 `--watch` 或在配置文件加上 `watch: true` 可以实现文件变动的时候自动重新构建，但是网页还是需要手动刷新。

【实现浏览器自动刷新】使用 webpack-dev-server 可以在构建完成后自动刷新浏览器，但刷新后页面的一些状态都会被重置，开发体验并不是最好。

【使用 HMR】HMR 即实现页面的局部刷新，而不是全页面刷新，可以保留页面上的数据状态。将配置文件中 devServer 的 `hot` 字段配置设为 true 即可打开 HMR 功能。

如果你使用了 style-loader，那么修改 css 之后可以体验到 HMR。如果你使用的是 Vue、React、Angular 这样的框架，也能体验到 HMR。其它情况基本体验不到 HMR，这背后的原因比较复杂，我们后续会继续介绍 HMR 的原理。

启用 HMR 的配置文件如下：

<<< @/../labs/webpack/webpack-hmr/webpack.config.js

从 Webpack 5 开始，运行 webpack-dev-server 的方式为：`webpack serve`

### 多进程构建

### 多进程压缩代码

### 利用缓存提升第二次构建速度

## 服务端渲染

## 持续集成、自动化
### 冒烟测试
### 单元测试
### 持续集成
### 自动发包
