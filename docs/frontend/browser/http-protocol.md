# HTTP协议

HTTP标准由IETF组织制定，跟它相关的标准主要有两份：

1. HTTP1.1 https://tools.ietf.org/html/rfc2616
2. HTTP1.1 https://tools.ietf.org/html/rfc7234

HTTP协议是基于TCP协议出现的，对TCP协议来说，TCP协议是一条双向的通讯通道，HTTP在TCP的基础上，规定了Request-Response的模式。这个模式决定了通讯必定是由浏览器端首先发起的。

浏览器的实现只需要用一个TCP库就可以搞定和服务器通讯。HTTP是一个应用层的协议，规定了如何使用TCP来传输纯文本。

## 实验：使用TCP客户端实现HTTP

我们的实验需要使用telnet客户端，这是一个纯粹的TCP连接工具。

首先我们运行telnet，连接到极客时间主机，在命令行里输入以下内容：

```
telnet time.geekbang.org 80
```

这个时候，TCP连接已经建立，我们输入以下字符作为请求：

```
GET / HTTP/1.1
Host: time.geekbang.org
```

按下两次回车，我们收到了服务端的回复：

```
HTTP/1.1 301 Moved Permanently
Date: Fri, 25 Jan 2019 13:28:12 GMT
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Location: https://time.geekbang.org/
Strict-Transport-Security: max-age=15768000

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

这就是一次完整的HTTP请求的过程了，我们可以看到，在TCP通道中传输的，完全是文本。

在请求部分，第一行是 request line，第二行是 request header。

在响应部分，第一行被称作 response line，第二行开始是 response header，从空行开始是 response body。

## HTTP Method

浏览器通过地址栏访问页面都是GET方法。表单提交用POST方法。

HEAD则是跟GET类似，只返回请求头，多数由JavaScript发起。

PUT和DELETE分别表示添加资源和删除资源，但是实际上这只是语义上的一种约定，并没有强约束。

CONNECT现在多用于HTTPS和WebSocket。

OPTIONS和TRACE一般用于调试，多数线上服务都不支持。

## HTTP Status code

HTTP 状态码网上一搜就有，这里讲几个前端开发常见的。

403表示无权限，404表示表示请求的页面不存在。

304表示客户端本地已经有缓存的版本，并且在Request中告诉了服务端，当服务端通过时间或者tag，发现没有更新的时候，就会返回一个不含body的304状态。

## HTTP Header

HTTP头可以看作一个键值对，我们可以自由定义HTTP Header。不过在HTTP规范中，规定了一些特殊的HTTP Header，这里我们挑几个重点的说一下：

我们先来看看Request Header。

![img](https://static001.geekbang.org/resource/image/2b/a2/2be3e2457f08bdf624837dfaee01e4a2.png)

接下来看一下Response Header。

![img](https://static001.geekbang.org/resource/image/ef/c9/efdeadf27313e08bf0789a3b5480f7c9.png)



## HTTP Request Body

HTTP请求的body主要用于提交表单场景。实际上，http请求的body是比较自由的，只要浏览器端发送的body服务端认可就可以了。一些常见的body格式是：

- application/json
- application/x-www-form-urlencoded
- multipart/form-data
- text/xml

我们使用html的form标签提交产生的html请求，默认会产生 application/x-www-form-urlencoded 的数据格式，当有文件上传时，则会使用multipart/form-data。

## 其它协议

- HTTPS：https://tools.ietf.org/html/rfc2818
- HTTP2：https://tools.ietf.org/html/rfc7540


