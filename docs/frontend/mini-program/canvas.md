# Canvas 画布
按照传统 Web 开发，首先在 HTML 中编写 `<canvas>`，然后通过 `document.querySelector()` 之类的方法取到 HTMLCanvasElement 实例。

小程序中是类似的流程，但有些区别：
- HTML -> WXML
- querySelector -> [SelectorQuery](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.html)

