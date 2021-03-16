# 数据获取
## Ajax 远程数据获取
浏览器环境提供了 `XMLHttpRequest` 和 `fetch` 两个接口用于实现 Ajax。有一些库在此基础上做了二次封装，如：jQuery、Axios。

## 跨域问题
### 同源策略 (SOP)
同源的定义：协议、域名、端口，三者一致。如果不一致，就叫做跨域。

Web 是开放的，站点之间可以相互引用，所以我们能贴其它站点的图片、引用其它站点的 CSS/JS。所以我们说这几个是能跨域的：
- `<img>` 标签跨域引用图片
- `<link>` 标签跨域引用 CSS
- `<script>` 标签跨域引用 JS

但一些敏感操作 (如：Ajax 请求、POST 请求) 就会受到同源策略的约束，无法进行跨域。这是浏览器的一种安全机制，可以有效保护用户的安全。

### CORS 实现跨域通信
CORS 可以实现跨域 Ajax，但需要服务端支持。

::: details CORS 代码示例
客户端代码：

<<< @/../labs/web/cors/cors-client.html

服务器端代码：

<<< @/../labs/web/cors/cors-server.js
:::

### 其它技术实现跨域通信 (JSONP)
在 CORS 出现之前实现跨域 Ajax 比较麻烦，主要有两种技术：
- 使用 `<img src="...">` 或 `<link rel="stylesheet" href="...">` 发起 GET 请求
- 使用 JSONP，原理是浏览器的同源策略不会管 `<script src="...">`

使用 `<img>` 或 `<link>` 的缺点是：
- 只能发送 GET 请求
- 无法收到后端返回的数据
- 无法确定请求是否报错

使用 JSONP 的缺点是：
- 只能发送 GET 请求
- 无法确定请求是否报错

::: details JSONP 代码示例
客户端代码：

<<< @/../labs/web/cors/jsonp-client.html

服务器端代码：

<<< @/../labs/web/cors/jsonp-server.js
:::
