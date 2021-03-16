# 前端基础功

## 使用 JavaScript 编程
JavaScript 我认为是基础中的基础，所以移动到[程序员基本功-编程语言](/programmer/language/javascript)里面了。

[数据获取](./data-fetch)会介绍：Ajax/Fetch、跨域。

[数据存储](./data-store)会介绍：Cookie、Web Storage。

[程序控制流](./control-flow)会介绍：Promise、Observable (RxJS)。

[DOM 事件](./dom-event)会介绍：事件冒泡、节流、防抖、事件代理/委托等内容。

## Web 安全
会介绍 XSS、CSRF、Cookie 相关的网络安全攻防知识。

## 浏览器原理
[事件循环系统](./event-loop)必须要充分理解，这是异步编程的基石，它的本质就是个死循环，我甚至建议大家用 C 语言自己实现一个事件循环。基础打好之后才能理解单线程异步编程的一些奇怪的现象：
- setTimeout 为何不准？
- 为啥宏任务比微任务要慢？

理解 [V8 引擎](./v8-engine)对实际业务开发似乎确实没太大有帮助，但我还是觉得应该去了解了解。
