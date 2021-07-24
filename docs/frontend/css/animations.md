# CSS 动画

[通过 transitionend 和 animationend 事件判断动画是否结束](https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/)

## 经典案例
### Loading 动画

- gif 格式不支持透明度通道
- png 格式不支持动画

### 抛物线、自由落体

抛物线是物体在垂直方向做匀加速运动、水平方向做匀速运动形成的运动轨迹。
- 匀速运动可以: `transition-timing-function: linear;`
- 加速运动可以调一个先慢后快的贝塞尔曲线实现: `transition-timing-function: cubic-bezier(.55,0,.85,.36);`
- 不知道匀加速运动能不能通过贝塞尔曲线实现呢？

如果要实现抛物线可以看看[这篇博文](https://www.zhangxinxu.com/wordpress/2018/08/css-css3-%E6%8A%9B%E7%89%A9%E7%BA%BF%E5%8A%A8%E7%94%BB/)

《CSS 揭秘》给出了一个小球垂直落地并弹跳的 CSS 动画实现，使用 `animation` 配合 `@keyframes` 来实现了小球多段运动。尽管书上调了贝塞尔曲线，但最后的效果还是很不真实，代码如下：

::: details 代码
```html
<div class="ball"></div>
<style>
  .ball {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: orange;
    animation: bounce 3s forwards cubic-bezier(0.1, 0.25, 1, 0.25);
  }

  @keyframes bounce {
    60%,
    80%,
    to {
      transform: translateY(400px);
      animation-timing-function: ease;
    }
    70% {
      transform: translateY(300px);
    }
    90% {
      transform: translateY(360px);
    }
  }
</style>
```
:::

