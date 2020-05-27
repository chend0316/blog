## 浏览器的发展
1989年，Berners-Lee发明了万维网（World Wide Web）；在1990年，他写出了第一个浏览器（Nexus），但是这个浏览器不能显示图片。

1993年，NSCA研发了第一个能看图的浏览器（Mosaic）。

1994年，[吉姆·克拉克](https://en.wikipedia.org/wiki/James_H._Clark)和[马克·安德森](https://en.wikipedia.org/wiki/Marc_Andreessen)一起创建了网景公司，后者正是Mosaic的核心成员。

网景公司一开始叫做Mozilla，直至今天它的`UserAgent`使用的仍然是Mozilla而不是Netscape。Mozilla浏览器迅速占领市场，以至于各个服务器都会去判断`User-Agent: Mozilla`，有趣的是其它厂商也把UA设置为Mozilla，以便能被服务器识别。

1995年，布兰登·艾克加入网景，他只用10天时间就创造了JavaScript的原型，这也是为啥在今天看来JavaScript有不少缺陷。

1998年，Netscape被微软的IE击败，公司决定将代码开源，命名为Mozilla，见纪录片[《代码奔腾》](https://www.bilibili.com/video/av15989846/)。

2002年，在Netscape源码的基础上派生了火狐，火狐在安全、插件、开发调试方面都有巨大的贡献。

2008年，Chrome浏览器诞生，引入了多线程和V8引擎。Chrome也有一份开源项目Chromium。

2009年，Ryan Dahl基于V8引擎，将非阻塞式IO和JS整合，发明了Node.js。

## Electron的发展历史
2008年Chrome和Chromium诞生，2009年Node.js诞生。

2011年，英特尔工程师王文睿写了第一版node-webkit，当时是个默默无闻的项目。NW是基于Node和Chromium实现的。

2012年，王文睿招了实习生赵成。赵成几乎重写了NW，将其做到了GitHub C++热度前5。

2012年底，赵成加入GitHub的Atom项目组，一开始使用NW开发，但发现问题太多。2013年，赵成放弃NW决定开发Atom Shell，后来改名为Electron。

## JavaScript的发展历史
网景首先开发了JavaScript，紧接着微软也做了JScript，二者并不兼容。后来才有了ECMAScript，试图建立语言标准。

所有浏览器都完全支持ECMAScript 3。

所有现代浏览器都完全支持ECMAScript 5。

要小心你的用户浏览器可能不支持ES6，最致命的是有些特性不能被Polyfill实现。
