## 浏览器的发展
1989年，Berners-Lee发明了万维网（World Wide Web）；在1990年，他写出了第一个浏览器（Nexus），但是这个浏览器不能显示图片。

1993年，NSCA研发了第一个能看图的浏览器（Mosaic）。

1994年，[吉姆·克拉克](https://en.wikipedia.org/wiki/James_H._Clark)和[马克·安德森](https://en.wikipedia.org/wiki/Marc_Andreessen)一起创建了网景公司，后者正是Mosaic的核心成员。

网景公司一开始叫做Mozilla，直至今天它的`UserAgent`使用的仍然是Mozilla而不是Netscape。Mozilla浏览器迅速占领市场，以至于各个服务器都会去判断`User-Agent: Mozilla`，有趣的是其它厂商也把UA设置为Mozilla，以便能被服务器识别。

1995年，布兰登·艾克加入网景，他只用10天时间就创造了JavaScript的原型。他本来只是想做一个带有prototype的schema语言，但老板要求蹭Java的热度，所以JS强行加入了`new`、`this`的语法。这让JS变得很怪异，因此今天看来JavaScript有不少缺陷。

1998年，Netscape被微软的IE击败，公司决定将代码开源，命名为Mozilla，见纪录片[《代码奔腾》](https://www.bilibili.com/video/av15989846/)。

2002年，在Netscape源码的基础上派生了火狐，火狐在安全、插件、开发调试方面都有巨大的贡献。

2008年，Chrome浏览器诞生，引入了多线程和V8引擎。Chrome也有一份开源项目Chromium。

2009年，Ryan Dahl基于V8引擎，将非阻塞式IO和JS整合，发明了Node.js。

## 浏览器内核的发展
1998年11月，KDE社区开发了KHTML，它是从khtmlw的基础上fork出来的，做了一些小重构、支持Unicode、支持Qt。

1999年5月~10月，Mozilla的开源给了KHTML很大的压力，KHTML不得不进行改进。8月16日，KHTML实现了W3C DOM规范，这改变了内部的document表示方式，KHTML几乎整个被重写。10月，KHTML整合了KJS（KDE开发的JavaScript引擎）。

2000年3月，KHTML基本完成了对CSS的支持。

2001年6月，苹果公司开始开发Webkit，它fork自KHTML项目和KJS项目，并分别改名为WebCore和JavaScriptCore。由于两个项目的开发目的不同（Webkit是为苹果的产品服务的），二者代码相互合并的工作越来越困难，而且两边开发人员的关系也闹过矛盾，最终两个项目独立了。

2005年，苹果开源Webkit。除了苹果自己的Safari在用Webkit，谷歌的Chrome也使用了Webkit。但谷歌只用到了其中的WebCore部分，JS部分是用谷歌自己的V8引擎，此外谷歌还有自己的多进程系统。

2013年4月，谷歌宣布从Webkit的WebCore组件fork出了一个项目，叫做Blink。

## Electron的发展历史
2008年Chrome和Chromium诞生，2009年Node.js诞生。

2011年，英特尔工程师王文睿写了第一版node-webkit，当时是个默默无闻的项目。NW是基于Node和Chromium实现的。

2012年，王文睿招了实习生赵成。赵成几乎重写了NW，将其做到了GitHub C++热度前5。

2012年底，赵成加入GitHub的Atom项目组，一开始使用NW开发，但发现问题太多。2013年，赵成放弃NW决定开发Atom Shell，后来改名为Electron。

## JavaScript的发展历史
网景首先开发了JavaScript，紧接着微软也做了JScript，二者并不兼容。后来才有了[ECMAScript 标准](https://www.ecma-international.org/ecma-262/)，建立了JS语言标准。

所有浏览器都完全支持ECMAScript 3。所有现代浏览器都完全支持ECMAScript 5。要小心你的用户浏览器可能不支持ES6。

Babel工具可以将高版本的ES代码编译为低版本的ES，但有些特性不能通过Polyfill实现。
