# 前端性能优化

## 性能指标
### Web Vitals
[Web Vitals 网站指标](https://web.dev/vitals/)
- Loading: [LCP (Largest Contentful Paint)](https://web.dev/lcp/) 用于衡量网站加载速度
- Interactivity: [FID (First Input Delay)](https://web.dev/fid/) 用于衡量网站交互速度
- Visual stability: [CLS (Cumulative Layout Shift)](https://web.dev/cls/) 用于衡量网站的视觉稳定性
- FMP 利用工具难以自动识别，所以被 Web Vitals 弃用，取而代之的是 LCP
- FID 测试需要一个真人参与，所以在 Chrome DevTools 里面是看不到 FID 指标的，取而代之的是 TBT (Total Blocking Time)。TBT 可以评估主线程被 block 的时间，block 期间浏览器无法响应任何用户输入，所以 TBT 能够间接量化 FID。TBT 的具体衡量算法是累加所有 JS Task 运行时长超出 50ms 的部分，如果运行了 53 ms，那么 TBT 为 3ms，如果运行了 49ms，那么 TBT 为 0ms。

测量 Web Vitals 的工具:
- Lighthouse
- https://web.dev/vitals-tools/
- [Chrome 84 增加了 TBT、CLS 的测量工具](https://developer.chrome.com/blog/new-in-devtools-84/)

一些性能分析/监控平台也引入了 Web Vitals:
- [SpeedCurve](https://www.speedcurve.com/blog/web-vitals-user-experience/)
- [Sentry](https://sentry.io/for/web-vitals/)

谷歌将 Web Vitals 作为搜索排序依据，所以一些内容平台为了 SEO 也引入了 Web Vitals:
- [WiX](https://support.wix.com/en/article/site-performance-about-core-web-vitals) 是一个 CMS 平台
- WordPress

参考资料:
- https://www.youtube.com/watch?v=AQqFZ5t8uNc&list=PLNYkxOF6rcIDC0-BiwSL52yQ0n9rNozaF&index=3
- https://www.youtube.com/watch?v=t8YBZLjL-KU&list=PLNYkxOF6rcIDC0-BiwSL52yQ0n9rNozaF&index=6

### 其它指标
fp fcp fmp tti

资源的网络请求耗时可以看下图。

![](./img/chrome-devtool-timing.png)

- Queuing 是排队等待，因为资源有优先级而且最多 6 个长连接，所以有些资源会排队等待
- Initial connection 是建立 TCP 连接的过程
- SSL 是 HTTPS 中的 SSL 握手过程
- Request sent 是将数据发送出去的过程，这个过程很快
- TTFB 是从发出数据到接收到服务器第一个字节的过程，这是衡量服务器的响应速度的重要指标
- Content Download 是接受数据的过程，如果太慢可以考虑压缩资源大小

## 网络资源加载
### 资源加载会阻塞 DOM 解析

因为 JS 中可能会操作 DOM，所以遇到 `<script>` 会等 JS 加载、执行完毕后才会解析后续的 DOM。为了避免阻塞页面解析，所以我们一般将 `<script>` 放在最后。如果 JS 里面没有操作 DOM 的代码，开发人员可以用 `<script async>` 或 `<script defer>` 告诉浏览器不要阻塞。async 会异步加载，一旦加载完成会立刻执行。defer 也是异步加载，会在 DOMContentLoaded 事件之前执行。

因为 JS 可以操作样式 `div1.style.color = 'red'`，所以说 JS 是依赖 CSS 的。所以只有 CSS 文件加载完成后，才会执行 JS，这样 JS 就会被 CSS 阻塞。从而导致 CSS 也会阻塞 DOM 解析。

### 压缩 JS 体积

#### 打包工具
[构建工具对比](https://bundlers.tooling.report/)

主流的打包工具提供了体积压缩方案，但这些方案会混淆 (obfuscate) 代码，降低代码可读性、可分析性。

Sourcemap 提供了混淆代码与源代码的一个映射，主流浏览器都支持了 Sourcemap，在 [Chrome 中可以启用 Sourcemap](https://developer.chrome.com/docs/devtools/javascript/source-maps/)。

#### 减少 JS Bundle 体积
减少 Bundle 体积可以优化 LCP 和 FID 指标。

首先要分析哪些代码占体积比较大:
- 使用 Chrome Network Panel 大致观察 Bundle 体积
- 使用 [Chrome 代码覆盖率工具](https://developer.chrome.com/docs/devtools/coverage/) 找哪些代码没有用到，建议配合 Sourcemap 使用
- 主流打包工具都提供了 Bundle 体积分析工具，例如 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)，可以分析 Bundle 中各个模块的体积占比
- 使用 Lighthouse 这样的集成工具

然后想办法删代码或者懒加载。

#### 删除不必要的 Legacy JavaScript
目前 95% 的浏览器都是现代浏览器，没必要为它们提供 Polyfills，也没必要 transforms to legacy JS，这样代码体积更大、执行更浪费 CPU。

当然对于 Legacy Browser 还是要使用 Legacy JavaScript 的，所以技术重点在于:
- 打包的时候打两份，一份给新浏览器，一份给旧浏览器
- Server 要区分新旧浏览器，然后发送不同版本的 JS

更多资料自己谷歌搜「avoid serving legacy javascript to modern browsers」

## CSR、SSR、同构

SSR好处：
- SEO
- 性能

BigPipe 是非常古老的技术，利用了 HTTP/1.1 支持分块传输的能力，在响应头中加上 `Transfer-Encoding: chunked` 就可以告知浏览器启用该能力。
