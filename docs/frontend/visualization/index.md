# 前端可视化

## 基础
### 可视化的三种方式
SVG 最容易使用，Canvas2D 和 WebGL 都是 Canvas 的一种上下文。

SVG 采用声明式绘图风格，易于使用；而且可以使用 DOM API (包括事件监听等)，很容易实现和用户的交互场景；但是 SVG 的性能不是很好。

Canvas2D 采用指令式绘图风格，相对来说不易使用；Canvas2D 需要自己实现鼠标键盘的交互，实现难度比较大；性能很好。

WebGL 是最难用的，使用的时候需要和底层硬件 (如GPU、渲染管线、着色器) 打交道；性能是三者中最好的。

在实际项目中，可以根据具体需求选择合适的技术。
- 数据量不大、交互多：使用 SVG
- 数据量大、交互少：使用 Canvas
- 数据量大、交互多：使用基于 Canvas 的第三方库
- WebGL 我就不介绍了，如果团队有能力使用 WebGL 那么相信有自己的判断

### Canvas 上下文
HTMLCanvasElement:
- 我们通过 DOM API 可以获取 HTML 中书写的 `<canvas>` 标签，对应的是一个 `HTMLCanvasElement` 实例
- 通过 `HTMLCanvasElement.getContext()` 可以获取到绘图上下文

绘图上下文分为3种。
- Canvas 2D
- WebGL 是 OpenGL ES 2.0 的 Web 端实现
- WebGL2 是 OpenGL ES 3.0 的 Web 端实现

下面这个例子中演示了如何获取绘图上下文。

::: details 通过getContext获取绘图上下文
<<< @/../src/visualization/canvas-get-context.html
:::

### 宽高、尺寸
`<canvas>` 的 `width` 和 `height` 属性决定了 Canvas 的坐标轴，我们称为「画布宽高」，而通过 CSS 样式设置的宽高称为「样式宽高」。在高清屏上，我们会将画布宽高设置为样式宽高的 n 倍，以免模糊。

SVG 也有与之对应的概念，`<svg width="50px" height="75px" viewBox="0 0 100 150">` 中，`viewBox` 指定「画布宽高」，`width` 和 `height` 指定「样式宽高」。

在 SVG 中如果「画布宽高比例」和「样式宽高比」不一致的话，可以用 `preserveAspectRatio` 指定 3 种不同的策略：
1. 等比缩小，这样就不会充满容器，左右或上下会有留白
2. 等比放大，这样可以充满容器，但会导致图片被裁减
3. 伸缩图像，这样会导致图像变形失真

## 编码风格：指令式、声明式
### Canvas 指令式风格
::: details 在画布中央绘制红色正方形
<<< @/../src/visualization/canvas-rect-center.html
:::

### SVG 声明式风格
::: details SVG 可以通过 XML 编写
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="orange" />
</svg>
```
:::

::: details 在中心绘制红色正方形
<<< @/../src/visualization/svg-rect-center.html
:::
