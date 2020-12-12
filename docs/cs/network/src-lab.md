# 编程实验
## 实验：自制系列
### 基于类库实现 HTTP Server/Client
::: details Node.js 基于 http 库实现 HTTP Server
<<< @/../src/http/http-server-via-http.js
:::

::: details Node.js 基于 tcp 库实现 HTTP Server
<<< @/../src/http/http-server-via-tcp.js
:::

::: details 在浏览器端通过 XHR 实现 HTTP Client
<<< @/../src/http/http-client-xhr.js
:::

::: details Node.js 基于 http 库实现 HTTP Client
<<< @/../src/http/http-client-via-http.js
:::

::: details Node.js 基于 tcp 库实现 HTTP Client
<<< @/../src/http/http-client-via-tcp.js
:::

::: details Java 基于 tcp 库实现 HTTP Client
<<< @/../src/http/HttpClientViaTcp.java
:::

### 自己动手实现 HTTP Client
这里我们基于 TCP，实现一个简单的 HTTP 客户端。

::: details my http client
<<< @/../src/http/my-http-client.js
:::

## 实验：调包侠系列
### DNS 解析
- 命令行
- Node.js
- 通过 Java 的 `InetAddress.getAllByName()`