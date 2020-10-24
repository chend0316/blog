# JavaScript 概述

因为 JS 看起来和其它语言很像，所以初学者总是误以为 JS 不难学。然而这是一个陷阱，JavaScript中的一些概念和其它语言完全不同。
- 函数是一等公民
- 闭包
- 作用域
- 基于原型的面向对象
- 函数也是对象

## JS 代码的运行
JavaScript 语言一直在发展，但 JS 引擎的支持往往没那么快，可以在 [https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/) 查看 JS 特性的支持情况。对于不支持的特性可以使用 [Babel]() 或 Traceur 转换。

JavaScript 可以运行在各种环境中，但最常见的还是运行在浏览器和 Node 上。在现实世界中浏览器并不能完美实现 Web 标准，这就引入了 [Polyfill/Shim]() 的概念。Babel 也提供了 Polyfill 的 runetime。

## 事件
不管是浏览器还是 Node 环境，都采用了单线程的执行模型（未来 JS 可能会有多线程，但不是现在），因此引入了[事件队列/事件循环]()的概念。和多线程模型不同，在 JS 中如果某段代码执行时间过长是会阻塞用户 UI 操作，让用户感到卡顿。

事件有很多，按照触发源划分可以分为：浏览器事件、网络事件、用户事件、计时器事件。一些用户事件会被高频率触发（如 mousemove），这样事件处理函数也会被高频调用，非常耗费性能和资源，这就引入了[节流/防抖]()的概念。

## 函数
精通 JavaScript 的一个秘诀是要明白 JS 函数和其它语言存在巨大差异：
- 在 JS 中函数也是对象，对于函数 `function foo()` 我们可以 `foo.xxx = 1` 从而实现一些高级的需求
- 函数会有 2 个隐含参数：`this`、`arguments`

精通 JavaScript 的另一个秘诀是要将它视作一门函数式语言，这本身是个大话题，可以阅读[《JavaScript函数式编程指南》](https://book.douban.com/subject/30283769/)。这里简单列几个术语吧：
- Memorization
- 柯里化
