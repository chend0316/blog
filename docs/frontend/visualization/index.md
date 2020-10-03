# 前端可视化

## Canvas 是什么？
HTMLCanvasElement:
- 我们通过 DOM API 可以获取 HTML 中书写的 `<canvas>` 标签，对应的是一个 `HTMLCanvasElement` 实例
- 通过 `HTMLCanvasElement.getContext()` 可以获取到绘图上下文

绘图上下文分为3种。
- Canvas 2D
- WebGL 是 OpenGL ES 2.0 的 Web 端实现
- WebGL2 是 OpenGL ES 3.0 的 Web 端实现

在 HTML 中，Canvas 标签的 `width` 和 `height` 属性决定了 Canvas 的坐标轴，我们称为「画布宽高」，而通过 CSS 样式设置的宽高称为「样式宽高」。

下面这个例子中演示了如何获取绘图上下文。

::: details 通过getContext获取绘图上下文
<<< @/../src/visualization/canvas-get-context.html
:::

## 熟悉一下 Canvas 指令式风格
::: details 熟悉指令式API风格
<<< @/../src/visualization/canvas-helloworld.html
:::

::: details 在画布中央绘制红色正方形
<<< @/../src/visualization/canvas-rect-center.html
:::
