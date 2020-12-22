# IPv4 地址
## Classful network：分类网络
IPv4 长度为 32 位，出于管理、技术原因，我们会将地址拆为网络号和主机号两个部分。

A、B、C 三类 IP 地址是在 rfc791 定义的，0 开头的地址是 A 类地址，10 开头是 B 类地址，110 开头是 C 类地址。这 3 类地址已经占了 7/8，剩余 1/8 的地址一定是以 111 开头的，这些剩余地址是为日后保留的。

[rfc791](https://tools.ietf.org/html/rfc791) 定义 A、B、C 三类地址的原文如下：
> Addresses are fixed length of four octets (32 bits).  An address begins with a network number, followed by local address (called the "rest" field).  There are three formats or classes of internet addresses:  in class a, the high order bit is zero, the next 7 bits are the network, and the last 24 bits are the local address; in class b, the high order two bits are one-zero, the next 14 bits are the network and the last 16 bits are the local address; in class c, the high order three bits are one-one-zero, the next 21 bits are the network and the last 8 bits are the local address.

我从[网上](https://networkustad.com/2019/07/18/ipv4-classful-and-classless-addressing/) COPY 了下面这张图，可以当做 Cheat Sheet 查阅。谷歌用「Classful network」关键字搜图片可以搜到类似的图。或者维基「Classful network」词条，里面也有类似的表格。

![](./img/Classful-IPv4-Addressing-Information-Table.png)

## CIDR：无分类网络
CIDR (Classless Inter-Domain Routing) 中文翻译为：无类别域间路由。CIDR 是在 [RFC 1518](https://tools.ietf.org/html/rfc1518) 和 [RFC 1519](https://tools.ietf.org/html/rfc1519) 规定的，这两个 RFC 内容有点多，我没阅读，就不贴原文上来了。

诞生的背景是因为 Classful network 太浪费了，C 类地址只有 256 个主机地址企业不够用，B 类地址多达 65536 个主机地址企业用不完，根本原因就是划分粒度不够细。CIDR 支持更细粒度的划分，同时诞生的相关概念：子网掩码 (mask)、斜线记法 (notation)、广播地址。

CIDR 很直观，这里举个例子：192.168.0.1/24，前 24 位是网络号，后 8 位是主机号。如果主机号全为 1，那么就是广播地址，例如 192.168.0.255/24 会发给 192.168.0 网段下的所有主机。

在大学考试中，如果子网掩码长度不是 8/16/24，那么题目会有点难。例如求 16.158.165.91/22 对应网段下所有 IP 地址的范围，需要将 165 转成二进制，然后将前 6 位和后 2 位拆开。

## Linux 系统下配置 IP 地址
在 Linux 系统下有 net-tools 和 iproute2 这两个网络工具，iproute2 的目的是为了取代 net-tools，但这么多年过去了，仍然没有完全取代，所以两个都要学。

使用 net-tools 配置 IP 地址的命令：
```
$ sudo ifconfig eth1 10.0.0.1/24
$ sudo ifconfig eth1 up
```

使用 iproute2 配置 IP 地址的命令：
```
$ sudo ip addr add 10.0.0.1/24 dev eth1
$ sudo ip link set up eth1
```

## MAC 地址
每个网卡出厂的时候都会带有 MAC 地址，MAC 地址是全球唯一的。MAC 地址是扁平的，IP 地址是有网络号+主机号分级的。MAC 地址类似身份证，IP 地址类似家庭住址。

我们直接使用 MAC 地址通信不行吗？答案是不行！MAC 地址是扁平的，我们无法在一个路由器里面维护全球 MAC 地址组成的路由表。
