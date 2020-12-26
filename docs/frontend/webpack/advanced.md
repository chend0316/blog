# Webpack 进阶

## 灵活的配置文件
要理解 Webpack 的配置文件也是 JS 文件，它会被 Node.js 执行，所以可以使用 `require()` 导入社区第三方的包。

对于中大型系统，构建的需求会很复杂，这时候可以充分利用“配置文件也是 JS 代码”这一点来实现各种灵活的需求。

### 例子：多页应用打包方案
单页应用叫做 SPA，多页应用叫做 MPA，MPA 会有多个入口文件。

::: details 传统 MPA 的配置方法
<<< @/../labs/webpack/webpack-mpa/webpack.config.bad.js
:::

上面的配置方法不够灵活，如果增加了新的页面，我们还需要手动修改 Webpack 配置文件。考虑到 Webpack 配置文件本身就是 JavaScript 代码。我们可以充分利用这个特性，实现灵活的 MPA 应用打包。

关键思路如下：
- 团队成员约定多页应用中，代码文件的组织规则
- 利用 [glob](https://www.npmjs.com/package/glob) 这个包，根据约定的规则动态获取 src 目录下的文件

::: details 利用 glob 灵活打包多页应用
<<< @/../labs/webpack/webpack-mpa/webpack.config.good.js
:::

## 高级应用场景
### 文件监听、自动刷新、HMR
【实现文件监听自动构建】在命令行参数加上 `--watch` 或在配置文件加上 `watch: true` 可以实现文件变动的时候自动重新构建，但是网页还是需要手动刷新。

【实现浏览器自动刷新】使用 webpack-dev-server 可以在构建完成后自动刷新浏览器，但刷新后页面的一些状态都会被重置，开发体验并不是最好。

【使用 HMR】HMR 即实现页面的局部刷新，而不是全页面刷新，可以保留页面上的数据状态。将配置文件中 devServer 的 `hot` 字段配置设为 true 即可打开 HMR 功能。

如果你使用了 style-loader，那么修改 css 之后可以体验到 HMR。如果你使用的是 Vue、React、Angular 这样的框架，也能体验到 HMR。其它情况基本体验不到 HMR，这背后的原因比较复杂，我们后续会继续介绍 HMR 的原理。

启用 HMR 的配置文件如下：

<<< @/../labs/webpack/webpack-hmr/webpack.config.js

从 Webpack 5 开始，运行 webpack-dev-server 的方式为：`webpack serve`

### 自动添加 CSS 前缀
[Autoprefixer](https://www.npmjs.com/package/autoprefixer) 

### 移动端 px 自动转 rem

## Webpack API
我们通常是编写配置文件，然后执行 webpack 命令进行打包。而 Webpack API 是反过来的，由另一个系统调用 Webpack 进行打包，可以用于集成到现有工具链中。

## 实现原理
### HMR
Webpack 自带了一个 HotModuleReplacementPlugin 插件。这个插件的原理是将 HMR Runtime 注入到浏览器端，文件变动后，webpack-dev-server 会通过 WebSocket 告知 HMR Runetime，HMR Runetime 做页面的局部刷新。

通过阅读 Webpack 官网给出的[一个 HMR 的例子](https://webpack.js.org/guides/hot-module-replacement/)，我们会发现即使是最简单的业务，也需要编写繁琐的 HMR 代码，代码类似下面这样。

```javascript
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('准备更新 print.js 模块');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  })
}
```

不过幸运的是，一些 loader 已经帮我们实现了 HMR。如果你正在使用 React、Vue 等框架，那么就能享受到 HMR 带来的高效的开发体验。
