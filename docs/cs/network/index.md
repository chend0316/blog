# 计算机网络
## 基本常识
计算机网络体系结构
- OSI 七层模型，没人用
- 五层模型，只是教学上用
- TCP/IP，现实世界

![copy from 谢希仁](./img/network-architecture.png)

Node.js 中通过 `require('net')` 访问 TCP。

C++ 中通过 `libnet/libpcap` 访问 IP。

HTTP = TCP + Request/Response模式

Node.js 中通过 `require('http')` 访问 HTTP。

## 基于类库实现 HTTP Server/Client

::: details Node.js 基于 http 库实现 HTTP Server
<<< @/src/http/http-server-via-http.js
:::

::: details Node.js 基于 tcp 库实现 HTTP Server
<<< @/src/http/http-server-via-tcp.js
:::

::: details 在浏览器端通过 XHR 实现 HTTP Client
<<< @/src/http/http-client-xhr.js
:::

::: details Node.js 基于 http 库实现 HTTP Client
<<< @/src/http/http-client-via-http.js
:::

::: details Node.js 基于 tcp 库实现 HTTP Client
<<< @/src/http/http-client-via-tcp.js
:::

::: details Java 基于 tcp 库实现 HTTP Client
<<< @/src/http/HttpClientViaTcp.java
:::

## 自己动手实现 HTTP Client
这里我们基于 TCP，实现一个简单的 HTTP 客户端。

::: details my http client
<<< @/src/http/my-http-client.js
:::

## DNS 解析
- 命令行
- Node.js
- 通过 Java 的 `InetAddress.getAllByName()`
