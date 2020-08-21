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

## 实现 HTTP Server/Client

::: details Node.js 实现 HTTP Server
<<< @/src/http/http-server-node.js
:::

::: details XHR 实现 HTTP Client
<<< @/src/http/http-client-xhr.js
:::

::: details Node.js 实现 HTTP Client
<<< @/src/http/http-client-node.js
:::