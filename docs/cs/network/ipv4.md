# IPv4 地址
## Classful network：分类网络
IPv4 长度为 32 位，出于管理、技术原因，我们会将地址拆为网络号和主机号两个部分。

A、B、C 三类 IP 地址是在 rfc791 定义的，0 开头的地址是 A 类地址，10 开头是 B 类地址，110 开头是 C 类地址。这 3 类地址已经占了 7/8，剩余 1/8 的地址一定是以 111 开头的，这些剩余地址是为日后保留的。

[rfc791](https://tools.ietf.org/html/rfc791) 定义 A、B、C 三类地址的原文如下：
> Addresses are fixed length of four octets (32 bits).  An address begins with a network number, followed by local address (called the "rest" field).  There are three formats or classes of internet addresses:  in class a, the high order bit is zero, the next 7 bits are the network, and the last 24 bits are the local address; in class b, the high order two bits are one-zero, the next 14 bits are the network and the last 16 bits are the local address; in class c, the high order three bits are one-one-zero, the next 21 bits are the network and the last 8 bits are the local address.

我从[网上](https://networkustad.com/2019/07/18/ipv4-classful-and-classless-addressing/) COPY 了下面这张图，可以当做 Cheat Sheet 查阅。谷歌用「Classful network」关键字搜图片可以搜到类似的图。或者维基「Classful network」词条，里面也有类似的表格。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0f6c1d132f24ee88e5a066d7f841ab3~tplv-k3u1fbpfcp-watermark.image)

## CIDR：无分类网络
CIDR (Classless Inter-Domain Routing) 中文翻译为：无类别域间路由。CIDR 是在 [RFC 1518](https://tools.ietf.org/html/rfc1518) 和 [RFC 1519](https://tools.ietf.org/html/rfc1519) 规定的，这两个 RFC 内容有点多，我没阅读，就不贴原文上来了。

诞生的背景是因为 Classful network 太浪费了，C 类地址只有 256 个主机地址企业不够用，B 类地址多达 65536 个主机地址企业用不完，根本原因就是划分粒度不够细。CIDR 支持更细粒度的划分，同时诞生的相关概念：子网掩码 (mask)、斜线记法 (notation)、广播地址。

CIDR 很直观，这里举个例子：192.168.0.1/24，前 24 位是网络号，后 8 位是主机号。如果主机号全为 1，那么就是广播地址，例如 192.168.0.255/24 会发给 192.168.0 网段下的所有主机。

在大学考试中，如果子网掩码长度不是 8/16/24，那么题目会有点难。例如求 16.158.165.91/22 对应网段下所有 IP 地址的范围，需要将 165 转成二进制，然后将前 6 位和后 2 位拆开。
