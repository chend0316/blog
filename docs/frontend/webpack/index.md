# Webpack 介绍

## 各工具对比
历史发展顺序：
- 手工进行代码混淆、代码压缩
- Grunt
- Gulp
- Rollup、Webpack、Parcel

### Grunt vs. Gulp
这两个都是 Task Runner。Grunt 会把中间结果放到 .tmp 文件夹下面，涉及到磁盘 I/O 操作，所以速度很慢。Gulp 把中间结果存放到内存里面，加快打包速度。

### Webpack vs. Rollup
这两个是目前最流行的构建工具，一般开发应用系统会使用 Webpack，开发组件库会使用 Rullup。

### Webpack vs. Grunt vs. Gulp
Webpack 是 Model Bundler，而 Grunt 和 Gulp 是 Task Runner。目前 Webpack 社区比其它两个更活跃，官方维护更加积极，插件更丰富，使用的人更多。

## 快速上手
### 安装
这里以最新的 Webpack 5 为例：`npm install webpack webpack-cli --save-dev`。

### 配置文件
下面是一个典型配置，可以当做 Cheat Sheet 查阅，或者背下来。文件名一般为 webpack.config.js。

<<< @/../labs/webpack/webpack-basic/webpack.config.js

一些小众知识点无需记忆，善用搜索引擎即可，例如多入口的配置，直接谷歌搜「multiple target site:webpack.js.org」即可。

如果突然忘了某个配置怎么写，也不要慌，应该首先去查阅[官网的交互式 Cheat Sheet](https://webpack.js.org/configuration/#options)，用起来非常方便。

Webpack 本身只能处理 .js、.json 格式的文件，其它格式需要借助 loader。Webpack 官方提供了很多 [loader](https://webpack.js.org/loaders/) 和 [plugin](https://webpack.js.org/plugins/)，对于常见的最好背下来。也有很多第三方社区的 loader、plugin，日常开发中可以慢慢积累。
