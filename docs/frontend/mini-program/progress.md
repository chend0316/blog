# 进度条
微信小程序官方提供了[进度条组件](https://developers.weixin.qq.com/miniprogram/dev/component/progress.html)。

::: details progress 基本用法
``` xml
<view>
  <progress show-info percent="{{ percentValue }}"></progress>
</view>
```

``` javascript
Page({
  data: {
    percentValue: 0,
  },
  onTapReloadBtn() {
    this.setData({ percentValue: 0 });
    const timerId = setInterval(() => {
      if (this.data.percentValue >= 100) {
        clearInterval(timerId);
        return;
      }
      this.setData({ percentValue: this.data.percentValue + 5 });
    }, 100);
  },
})
```
:::

## 环形进度条
微信官方没有提供环形进度条组件，所以只能自己实现一个。这里给一个基于 Canvas 实现的思路。
