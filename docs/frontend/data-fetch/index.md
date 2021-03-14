# 远程数据获取
知识点罗列：
- Ajax 技术：XMLHttpRequest、fetch、jQuery.ajax、Axios
- 跨域：同源策略 (SOP)、CORS、JSONP

## Ajax
浏览器环境提供了 `XMLHttpRequest` 和 `fetch` 两个接口用于实现 Ajax。有一些库在此基础上做了二次封装，如：jQuery、Axios。

## 跨域

### 同源策略 (SOP)
同源的定义：协议、域名、端口，三者一致。同源策略是浏览器的一个安全机制，目的是为了保护用户的安全。

如果浏览器没有同源策略，会导致什么样的安全问题呢？TODO：这里我会准备几个攻防实验。

### 跨域通信的实现
CORS 可以实现跨域 Ajax，但需要服务端支持。

在 CORS 出现之前实现跨域 Ajax 比较麻烦，有两种技术：
- 使用 `<img>` 发起 GET 请求
- 使用 JSONP

::: details JSONP 代码示例
客户端代码：

<<< @/../labs/web/cors/jsonp-client.html

服务器端代码：

<<< @/../labs/web/cors/jsonp-server.js
:::

::: details CORS 代码示例
客户端代码：

<<< @/../labs/web/cors/cors-client.html

服务器端代码：

<<< @/../labs/web/cors/cors-server.js
:::
