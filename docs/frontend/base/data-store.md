# 数据存储
IndexedDB 这里不讲。

## Cookie
Cookie 本是用来和服务端通信的，在 H5 出现以前勉强能用作数据存储。后来 H5 新增了 Web Storage 专门做存储。Cookie 会随着每个网络请求发送出去，所以不能存太大的内容，否则浪费流量。

后端发给浏览器的 HTTP Response 中会带有 `Set-Cookie` 的头，形如：`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`，浏览器收到后就会把这个 Cookie 保存起来，分号后面的是这条 Cookie 的属性。

Cookie 属性：
- 生命周期由 `Max-Age` 和 `Expires` 属性指定，如果没有这两个属性，则是会话期 Cookie (Session Cookies)
- `Domain` 和 `Path` 属性指定了 Cookie 的作用域
- `HttpOnly` 和 XSS 攻击有关
- `SameSite` 和 CSRF 攻击有关
- `Secure` 和中间人窃听攻击有关

详细内容参考 [MDN 的文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)。

## Web Storage
实际开发中，[sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 比较少用，[localStroage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 比较常用。

## 生命周期
localStorage 会长久存储，而 sessionStorage 和 Session Cookies 的生命周期区别如下：

|              | sessionStorage | Session Cookies |
| ------------ | -------------- | --------------- |
| 刷新页面     | 保留           | 保留            |
| 打开新标签页 | 丢失           | 保留            |
| 关闭标签页   | 丢失           | 保留            |
| 关闭浏览器   | 丢失           | 丢失            |
