# 前端开发工程师

## 技术发展
### 模块化发展
[Common Module Definition 草案](https://github.com/cmdjs/specification/blob/master/draft/module.md)

### 开源库、框架
- 手工耕作：HTML、CSS、JavaScript
- jQuery、jQuery-ui、ExtJS、Bootstrap
- 工具：PostCSS、Babel
- 工程化：Gulp、Rollup、Webpack
- 解释型 MV* 框架：Backbone、React、Vue、Angular
- 编译型 MV* 框架：Svelte
- 新的语言：SASS、TypeScript、Dart
- 领域特定语言：JSX、Vue Template

### 跨平台技术发展
根据技术方案的不同，业内常见的观点是将主流的跨平台方案划分为三个时代。
- Web 容器时代：基于 Web 相关技术通过浏览器组件来实现界面及功能，典型的框架包括 Cordova、Ionic 和微信小程序。
- 泛 Web 容器时代：采用类 Web 标准进行开发，但在运行时把绘制和渲染交由原生系统接管的技术，代表框架有 React Native、Weex 和快应用。
- 自绘引擎时代：自带渲染引擎，客户端仅提供一块画布即可获得从业务逻辑到功能呈现的多端高度一致的渲染体验。如 Flutter。

### 工程化发展
出现了大量工具解决前端开发难题。早期这些工具使用 Ruby、Python 之类的语言实现，Node.js 问世后，大家都用 JS 实现。

由于工具越来越多，已经不能简单用一个 shell 脚本将工具串联起来，用 GNU Make 的门槛也比较高。所以诞生了一些自动化系统，大体上有两种思路。一种是 Task Runner，例如：Gulp、Grunt。另一种是 Module Bundler，如：Webpack、Rollup。

这些工具的配置、组合也十分繁重，往往需要资深工程师才能用好。为了降低门槛，诞生了一些开箱即用的脚手架工具，如: vue-cli、create-react-app。

为了简化命令行工具的开发，也诞生了一些开源库：
- Gulp 使用的 [js-liftoff](https://github.com/js-cli/js-liftoff)
- TJ 大神开发的 commander
- 其它小工具: chalk 用于在控制台输出带颜色的文字

## 浏览器
### 浏览器的工作原理
发起 HTTP 请求后，收到 HTML、CSS 之后如何渲染呢？
- 将 HTML 解析成 DOM 树
- 在解析 DOM 树的同时，将 CSS 的样式信息挂到 DOM 树上
- 根据 DOM 结构和样式属性进行绘制、排版
- 将上一步的结果渲染到位图上，会借助 Skia、GDI 来实现图形绘制，会借助 Freetype 来实现字体渲染

如何实现一个玩具浏览器：
- 用户在地址栏输入网址后敲回车，通过 DNS 查询 IP 地址，和 80 端口建立 TCP 连接，DNS、TCP 都可以调用操作系统提供的 API；
- 构造并发起 HTTP 请求，处理收到的 HTTP 响应，注意它是流式数据，需要边收边处理；这一步需要大量参考 RFC；要支持 GET/POST 等 Method；要支持 302 重定向之类的状态码；还要支持其它功能，例如 Cookie、缓存等等；
- 根据 HTTP 响应的 MIME 判断如果是网页，那么就要解析 HTML 内容并生成 DOM 树；涉及到编译原理，还要考虑浏览器内用什么数据结构表示 DOM；
- 在生成 DOM 树的过程中，可以顺便把样式属性挂到 DOM 树上面；考虑到 CSS 不一定写在 HTML 的头部，所以收到后面的 CSS 会需要重新计算之前的样式；
- 根据 DOM 树结构和样式属性进行排版、绘制、渲染，最终得到的是位图；位图的渲染很麻烦，可以借助 Skia、GDI 这样的开源库；字体的渲染也很麻烦，可以借助 Freetype 开源库；
- 排版需要支持盒模型、正常流、Flex；要支持 display 为 inline 和 block；在正常流的基础上还要支持 float、绝对定位；
- 如果 HTTP 响应的 MIME 是其它内容则相应处理；CSS 前面讲了；
- JS 相关的工作有很多要做；需要运行 JS 脚本；还需要暴露一些宿主 API，如 DOM API、CSSOM API；

实现玩具浏览器的过程中肯定会遇到大量困难：
- HTML 需要通过词法分析、语法分析，生成 DOM 树，可以参考：编译原理教材、Vue 的源码实现
- CSS 解析同样需要编译原理，还需要通过 CSSOM API 暴露给 JS

### 浏览器的发展

1989年，Berners-Lee发明了万维网 (World Wide Web) ; 在1990年，他写出了第一个浏览器 (Nexus)，但是这个浏览器不能显示图片。

1993年，NSCA研发了第一个能看图的浏览器 (Mosaic)。

1994年，[吉姆·克拉克](https://en.wikipedia.org/wiki/James_H._Clark)和[马克·安德森](https://en.wikipedia.org/wiki/Marc_Andreessen)一起创建了网景公司，后者正是Mosaic的核心成员。

网景公司一开始叫做Mozilla，直至今天它的 `UserAgent` 使用的仍然是 Mozilla 而不是 Netscape。Mozilla 浏览器迅速占领市场，以至于各个服务器解析到 `User-Agent: Mozilla` 就会做专门处理提供更好的服务，以至于后来其它厂商都把 User-Agent 设置为 Mozilla 来欺骗服务器。

1995年，布兰登·艾克 (Brendan Eich) 加入网景，他只用10天时间就创造了 JavaScript 的原型。他本来只是想做一个带有 prototype 的 schema 语言，但老板要求蹭 Java 的热度，所以 JS 强行加入了 `new` 、 `this` 的语法。这让 JS 变得很怪异，因此今天看来 JavaScript 有不少缺陷。

1998年，Netscape 被微软的 IE 击败，公司决定将代码开源，命名为 Mozilla，见纪录片[代码奔腾](https://www.bilibili.com/video/av15989846/)。

2002年，在 Netscape 源码的基础上派生了火狐，火狐在安全、插件、开发调试方面都有巨大的贡献。

2008年，Chrome 浏览器诞生，引入了多线程和V8引擎。Chrome 也有一份开源项目 Chromium。

2009年，Ryan Dahl 基于 V8 引擎，将非阻塞式 IO 和 JS 整合，发明了 Node.js。

### 浏览器内核的发展

1998年11月，KDE社区开发了 KHTML，它是从 khtmlw 的基础上 fork 出来的，做了一些小重构、支持 Unicode、支持 Qt。

1999年5月~10月，Mozilla 的开源给了 KHTML 很大的压力，KHTML 不得不进行改进。8月16日，KHTML 实现了 W3C DOM 规范，这改变了内部的 document 表示方式，KHTML 几乎整个被重写。10月，KHTML 整合了 KJS (KDE开发的 JavaScript 引擎)。

2000年3月，KHTML 基本完成了对 CSS 的支持。

2001年6月，苹果公司开始开发 Webkit，它 fork 自 KHTML 项目和 KJS 项目，并分别改名为 WebCore 和 JavaScriptCore。由于两个项目的开发目的不同 (Webkit是为苹果的产品服务的)，二者代码相互合并的工作越来越困难，而且两边开发人员的关系也闹过矛盾，最终两个项目独立了。

2005年，苹果开源Webkit。除了苹果自己的 Safari 在用 Webkit，谷歌的 Chrome 也使用了 Webkit。但谷歌只用到了其中的 WebCore 部分，JS 部分是用谷歌自己的 V8 引擎，此外谷歌还有自己的多进程系统。

2013年4月，谷歌宣布从 Webkit 的 WebCore 组件 fork 出了一个项目，叫做 Blink。

## Electron的发展历史
2008年 Chrome 和 Chromium 诞生，2009 年 Node.js 诞生。

2011年，英特尔工程师王文睿写了第一版 node-webkit，当时是个默默无闻的项目。NW 是基于 Node 和 Chromium 实现的。

2012年，王文睿招了实习生赵成。赵成几乎重写了 NW，将其做到了 GitHub C++ 热度前5。

2012年底，赵成加入 GitHub 的 Atom 项目组，一开始使用NW开发，但发现问题太多。2013年，赵成放弃 NW 决定开发 Atom Shell，后来改名为 Electron。

## JavaScript的发展历史
网景首先开发了JavaScript，紧接着微软也做了JScript，二者并不兼容。后来才有了[ECMAScript 标准](https://www.ecma-international.org/ecma-262/)，建立了JS语言标准。

所有浏览器都完全支持ECMAScript 3。所有现代浏览器都完全支持ECMAScript 5。

Babel工具可以将高版本的ES代码编译为低版本的ES，但有些特性不能通过Polyfill实现。
