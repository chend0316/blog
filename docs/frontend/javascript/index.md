# JavaScript 概述

因为 JS 看起来和其它语言很像，所以初学者总是误以为 JS 不难学。然而这是一个陷阱，JavaScript中的一些概念和其它语言完全不同。
- 函数是一等公民
- 闭包
- 作用域
- 基于原型的面向对象
- 函数也是对象

## 类型
JS 有 7 种类型：Undefined、Null、Boolean、String、Number、Symbol、Object。Symbol 是 ES6 新增的。

和多数动态类型语言一样，JS 需要一个运算符来判断变量的类型，这个运算符是：`typeof`。JS 的 `typeof` 是有很多缺陷的，其中最臭名昭著的就是 `typeof null === 'object'`，所以写代码的时候有必要自己封装一个函数来判断类型。

通过 `==` 运算判断变量是否相等时会涉及到隐式类型转换，然而 JS 有一套相当复杂的转换规则，所以最佳实践是使用 `===` 运算。

## JS 代码的运行
JavaScript 语言一直在发展，但 JS 引擎的支持往往没那么快，可以在 [https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/) 查看 JS 特性的支持情况。对于不支持的特性可以使用 [Babel](https://babeljs.io/) 或 Traceur 转换。

JavaScript 可以运行在各种环境中，但最常见的还是运行在浏览器和 Node 上。在现实世界中浏览器并不能完美实现 Web 标准，这就引入了 [Polyfill/Shim]() 的概念。Babel 也提供了 Polyfill 的 runetime。

## 事件
不管是浏览器还是 Node 环境，都采用了单线程的执行模型（未来 JS 可能会有多线程，但不是现在），因此引入了事件队列/事件循环的概念。和多线程模型不同，在 JS 中如果某段代码执行时间过长是会阻塞线程的，在浏览器端体现为用户卡顿，在 Node 端体现为吞吐量低。

### 浏览器中的事件
最早是网景和微软在浏览器端实现了事件，但 API 互不相同，直到 DOM2 开始标准化 DOM 事件 API。现在的浏览器都是按照 [DOM2 Event](https://www.w3.org/TR/DOM-Level-2-Events/events.html) 实现的，标准规定了事件流分为三个阶段：捕获、到达、冒泡。

事件有很多，按照触发源划分可以分为：浏览器事件、网络事件、用户事件、计时器事件。

一些用户事件会被高频率触发（如 mousemove），这样事件处理函数也会被高频调用，非常耗费性能和资源，这就引入了[节流/防抖]()的概念。

## 函数
精通 JavaScript 的一个秘诀是要明白 JS 函数和其它语言存在巨大差异：
- 在 JS 中函数也是对象，对于函数 `function foo()` 我们可以 `foo.xxx = 1` 从而实现一些高级的需求
- 函数会有 2 个隐含参数：`this`、`arguments`

精通 JavaScript 的另一个秘诀是要将它视作一门函数式语言，这本身是个大话题，可以阅读[《JavaScript函数式编程指南》](https://book.douban.com/subject/30283769/)。这里简单列几个术语吧：
- Memorization
- 柯里化
