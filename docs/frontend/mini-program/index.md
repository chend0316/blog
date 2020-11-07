# 微信小程序

## 快速开发指引
### 组件
容器组件用来容纳其它组件，容器组件本身可以嵌套，主要功能是布局。

`movable-area` 和 `movable-view` 配合使用可以实现一些移动动画，甚至封装了惯性、阻尼系数、摩擦系数等选项。movable-area 是 movable-view 的父容器，父容器比子容器大或小则会产生两种不同的效果。

### 事件
事件绑定可以用 `bindxxx` 也可以用 `catchxxx`，区别是 `catchxxx` 会阻止冒泡。

### 样式
[WXSS](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html) 相比 CSS，尺寸单位上增加了 `rpx`，任何设备的宽度都映射为 750rpx，选择器删了很多，只保留了小程序必要的几个。

`hover-class` 用于实现点击态，只有少部分组件 (view、button、navigator) 支持这个属性，这个属性还可以配合 `hover-stop-propagation`、`hover-start-time`、`hover-stay-time` 使用。

### 必备的传统 Web 知识
传统 Web 开发中要考虑兼容性，有时不能随便用 Flex 布局，但在微信小程序中可以放心大胆的用。

## 常见交互设计
### 按钮点击态
使用小程序的 `hover-class` 属性为 `<button>` 添加点击态的样式。

对于矩形按钮，点击的时候让按钮向右下角移动，实现下沉的感觉：
```css
.btn-rect-hover {
  position: relative;
  top: 3rpx; left: 3rpx;
  box-shadow: 0px 0px 8px rgba(175, 175, 175, .3) inset;
}
```

对于圆形按钮，点击的时候让按钮有一个缩小的效果：
```css
.btn-circle-hover {
  transform: scale(.95, .95);
  opacity: .8;
}
```

### 列表左滑删除
可以利用可移动视图容器实现：
- 将 `movable-area` 设置为屏幕宽度，`movable-view` 的宽度设置为比 `movable-area` 大
- 大出来的区域放置左滑后出现的按钮
- 将 `direction` 属性设置为 `horizontal`

但是上面这种实现体验不太好，缺少一种惯性和回弹的触感。对此我们可以使用一些第三方库。

首先推荐使用的是官方 WeUI 组件库的 [Slideview](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/slideview.html)。其它如 miniprogram-slide-view 不推荐但为了讲述完整性也列在这里。

## 使用第三方库
小程序是可以[使用 NPM](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)来使用第三方库。

官方也提供了一些[扩展能力](https://developers.weixin.qq.com/miniprogram/dev/extended/)。WeUI 可以通过 `useExtendedLib` 的方式引入，不会占用小程序 12MB 大小限制。扩展组件通过 npm 使用，会占用 12MB 大小限制。
