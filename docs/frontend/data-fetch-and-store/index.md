# 数据获取和存储
## Ajax 远程数据获取
浏览器环境提供了 `XMLHttpRequest` 和 `fetch` 两个接口用于实现 Ajax。有一些库在此基础上做了二次封装，如：jQuery、Axios。

## 跨域问题

### 同源策略 (SOP)
同源的定义：协议、域名、端口，三者一致。同源策略是浏览器的一个安全机制，目的是为了保护用户的安全。

如果浏览器没有同源策略，会导致什么样的安全问题呢？TODO：这里我会准备几个攻防实验。

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
- 使用 `<img>` 发起 GET 请求
- 使用 JSONP

::: details JSONP 代码示例
客户端代码：

<<< @/../labs/web/cors/jsonp-client.html

服务器端代码：

<<< @/../labs/web/cors/jsonp-server.js
:::

## 数据存储
知识点罗列：
- Cookie
- H5 新增的 Web Storage：localStorage、sessionStorage
- IndexedDB

Cookie 本是用来和服务端通信的，在 H5 出现以前勉强能用作数据存储。后来 H5 新增了 Web Storage 专门做存储。Cookie 会随着每个网络请求发送出去，所以不能存太大的内容，否则浪费流量。
