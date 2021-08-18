# Web 前端开发基础
## CSS
[盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)
- box-sizing
- [外边距折叠]()https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing ([Margin Collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing))

垂直居中、水平居中。

## JavaScript

### 语言
this 指向:
- function
- `Function.prototype.call`、`Function.prototype.apply`
- Object Method
- `Function.prototype.bind`，[本质是函数柯里化 (Function Currying)](https://medium.com/@allansendagi/javascript-fundamentals-bind-and-currying-c851902c40ae)
- arrow function

闭包 (Clousure)

### 模式
事件代理/委托。

## 性能优化
### Web Vitals
[Web Vitals 网站核心指标](https://web.dev/vitals/)
- Loading: [LCP (Largest Contentful Paint)](https://web.dev/lcp/) 用于衡量网站加载速度
- Interactivity: [FID (First Input Delay)](https://web.dev/fid/) 用于衡量网站交互速度
- Visual stability: [CLS (Cumulative Layout Shift)](https://web.dev/cls/) 用于衡量网站的视觉稳定性

测量 Web Vitals 的工具:
- Lighthouse

一些性能分析/监控平台也引入了 Web Vitals:
- [SpeedCurve](https://www.speedcurve.com/blog/web-vitals-user-experience/)
- [Sentry](https://sentry.io/for/web-vitals/)

谷歌将 Web Vitals 作为搜索排序依据，所以一些内容平台为了 SEO 也引入了 Web Vitals:
- [WiX](https://support.wix.com/en/article/site-performance-about-core-web-vitals) 是一个 CMS 平台
- WordPress

### 打包工具
[构建工具对比](https://bundlers.tooling.report/)

主流的打包工具提供了体积压缩方案，但这些方案会混淆 (obfuscate) 代码，降低代码可读性、可分析性。

Sourcemap 提供了混淆代码与源代码的一个映射，主流浏览器都支持了 Sourcemap，在 [Chrome 中可以启用 Sourcemap](https://developer.chrome.com/docs/devtools/javascript/source-maps/)。

### 减少 JS Bundle 体积
减少 Bundle 体积可以优化 LCP 和 FID 指标。

首先要分析哪些代码占体积比较大:
- 使用 Chrome Network Panel 大致观察 Bundle 体积
- 使用 [Chrome 代码覆盖率工具](https://developer.chrome.com/docs/devtools/coverage/) 找哪些代码没有用到，建议配合 Sourcemap 使用
- 主流打包工具都提供了 Bundle 体积分析工具，例如 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)，可以分析 Bundle 中各个模块的体积占比
- 使用 Lighthouse 这样的集成工具

然后想办法删代码或者懒加载。

### 删除不必要的 Legacy JavaScript
目前 95% 的浏览器都是现代浏览器，没必要为它们提供 Polyfills，也没必要 transforms to legacy JS，这样代码体积更大、执行更浪费 CPU。

当然对于 Legacy Browser 还是要使用 Legacy JavaScript 的，所以技术重点在于:
- 打包的时候打两份，一份给新浏览器，一份给旧浏览器
- Server 要区分新旧浏览器，然后发送不同版本的 JS

更多资料自己谷歌搜「avoid serving legacy javascript to modern browsers」
