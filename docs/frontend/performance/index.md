# 前端性能优化

## 性能分析
### 性能分析指标
fp fcp fmp tti

### 性能分析工具
https://webpagetest.org/ 是一个生成性能分析报告的网站。

资源的网络请求耗时可以看下图。

![](./img/chrome-devtool-timing.png)

- Queuing 是排队等待，因为资源有优先级而且最多 6 个长连接，所以有些资源会排队等待
- Initial connection 是建立 TCP 连接的过程
- SSL 是 HTTPS 中的 SSL 握手过程
- Request sent 是将数据发送出去的过程，这个过程很快
- TTFB 是从发出数据到接收到服务器第一个字节的过程，这是衡量服务器的响应速度的重要指标
- Content Download 是接受数据的过程，如果太慢可以考虑压缩资源大小

## 网络资源耗时
### 阻塞 DOM 解析

因为 JS 中可能会操作 DOM，所以遇到 `<script>` 会等 JS 加载、执行完毕后才会解析后续的 DOM。为了避免阻塞页面解析，所以我们一般将 `<script>` 放在最后。如果 JS 里面没有操作 DOM 的代码，也可以用 `<script async>` 或 `<script defer>`。async 会异步加载，一旦加载完成会立刻执行。defer 也是异步加载，会在 DOMContentLoaded 事件之前执行。

因为 JS 可以操作样式 `div1.style.color = 'red'`，所以说 JS 是依赖 CSS 的。所以只有 CSS 文件加载完成后，才会执行 JS，这样 JS 就会被 CSS 阻塞。

## CSR、SSR、同构

SSR好处：
- SEO
- 性能

BigPipe 是非常古老的技术，利用了 HTTP/1.1 支持分块传输的能力，在响应头中加上 `Transfer-Encoding: chunked` 就可以告知浏览器启用该能力。
