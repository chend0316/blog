# CSS 概述
## 居中
### 水平居中
对于块级元素使用 `margin: 0 auto;`

对于行内元素，对其父元素使用 `text-align: center;`

### 垂直居中
绝对定位思路：相对父元素尺寸偏移 50%，然后相对自身尺寸偏移 -50%。

实现细节：
- CSS 大部分属性的百分比值是以父元素为基准的，只有少数 (如 transform) 是以自身为基准的
- `margin-top` 是以父元素的宽度为基准，而不是高度，很坑

```css
.center-xy {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
```
