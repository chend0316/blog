# 前端基础功

## 使用 JavaScript 编程
JavaScript 语言我认为是基础中的基础，所以移动到[程序员基本功-编程语言](/programmer/language/javascript)里面了。

有许多 JavaScript 语言扩展，最成功的自然是 [JSX](./jsx)、TypeScript，还有一些如 CoffeeScript 早已被淘汰。

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

## CSS
### 盒模型

### 布局/排版
CSS 2.1 第九章和第十章介绍了视觉格式化模型 (Visual formatting model)。9.2 节介绍了如何产生 block container box、Block-level box、Inline-level box。

[有些情况](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)会创建 BFC，BFC 减轻了排版引擎的负担，因为 BFC 内部的排版逻辑可以独立计算，相当于一个独立的小世界，不受其它元素影响:
- 同一个 BFC 内会有外边距折叠，BFC 之间不会有外边距折叠
- BFC 内的 Line Box 不会受到其它 BFC 内的 Float 元素的影响

以上排版计算完成后，CSS Transforms Module Level 1 规定的平移、旋转、缩放还能进一步改变元素在坐标系中的位置。

CSSOM View 中定义的 `getClientRects()` 和 `getBoundingClientRect()` 可以用于获取元素排版之后的尺寸和位置信息。
