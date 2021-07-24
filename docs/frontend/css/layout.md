# CSS 布局/排版

## 第一代: 正常流

### inline 元素 margin/padding 是否起作用？
左右 margin/padding 起作用，上下 margin/padding 只对替换型 inline 元素起作用。

## 第二代: Flex

## 第三代: Grid

## 居中

### 垂直居中

绝对定位 + margin: 将元素的左上角放置在中心，然后用负的 margin。缺点是要求元素宽高已知，因为 margin 的百分比数值是基于父元素尺寸计算的。

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3em;
  margin-left: -9em;
  width: 18em;
  height: 6em;
}
```

绝对定位 + transforma。

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

绝对定位会脱离文档流，如果不想这样，可以采用 `vh` 实现。

```css
main {
  width: 18em;
  padding: 1em 1.5em;
  margin: 50vh auto 0;
  transform: translateY(-50%);
}
```

不管是绝对定位还是 `vh`，都存在一个共同的问题：当元素高度超过 viewport 的时候，上半部分会被藏到屏幕外面。
