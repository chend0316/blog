# Web 架构师

## 前后端通信
### HTTP 协议
302 状态码表示**重定向**，Servlet 里还有**请求转发**的概念。要注意二者不同，前者涉及 HTTP 协议需要浏览器配合，后者是服务端内部的行为。

HTTP 是无状态协议，服务器无法维持多个 HTTP 请求之间的业务关联性。为了解决这个问题，我们有一些办法：
- 使用 Cookie (RFC 2109)，它会将所有信息存放在浏览器端，对网络传输负担比较重
- 使用 Session，它将 Session ID 通过 Cookie 存放在浏览器端，ID 对应的信息存放在后端，对后端内存/磁盘负担重

源码实现：
- [Servlet 实现重定向](https://www.runoob.com/servlet/servlet-page-redirect.html)、[Servlet 实现请求转发](https://www.javatpoint.com/requestdispatcher-in-servlet)
- [Express 实现重定向](https://www.expressjs.com.cn/4x/api.html#res.redirect)
- [Servlet 中使用 Cookie](https://www.runoob.com/servlet/servlet-cookies-handling.html)。
- [Servlet 中使用 Session](https://www.runoob.com/servlet/servlet-session-tracking.html)。

### C/S 通信模型
C/S 是客户端/服务器的简写。

有三种通信模型：
- 客户端拉数据 (Pull)
- 客户端轮询 (Poll)
- 服务端推送 (Push)

如果事件触发源在客户端 (如用户点击按钮)，那么采用 Pull 模型即可。如果事件触发源在服务端 (如即时消息)，那么需要采用 Poll 或 Push 模型。

Push 模型的实现：
- 基于 HTTP/1.1 长连接实现 Comet 模型，这是一个半残废的 Push 模型，可以理解为“假Push”或“长轮询”
- 基于 HTTP/2.0 实现
- 基于 Websocket 实现
- WebRTC
- [Server-Sent Events](https://www.html5rocks.com/en/tutorials/eventsource/basics/)

### RESTful vs. GraphQL
GraphQL 的优点：
- 符合开发人员的心智模型（图模型而不是关系模型）
- 类型系统

GraphQL 定义了三种通信模型：
- 读 (query)
- 写 (mutation)
- 订阅 (subscription)

### 浏览器安全策略
跨域 (CORS) 问题导致的开发工作：
- 因为前端不能跨域访问资源，所以后端需要做一个 API 网关
- 前端人员本地开发要想办法绕过 (例如开网络代理)

## 前端开发
### Vue 的罪过
Vue 对 TS 的支持很差，就算是 Vue 3，对组件入参、返回值的类型检查/类型推断的支持都很不好。
::: details Vue 对 TS 的支持很差
```vue
<template>
  <user-select @click="handleSelect"></user-select>
</template>
<script lang="ts">
export default {
  setup() {
    const handleSelect(user: any) { // user 参数丢失了类型推断
      // ...
    }

    return {
      handleSelect
    }
  }
}
</script>
```
:::

### CSS 的罪过
现在有一个卡片，卡片边框有阴影、圆角，卡片内有标题、分割线等等。封装的 CSS 如下，看起来很不错：
```scss
.card {
  padding: 15px;
  border-radius: $--border-radius-base;
  background: $oc-white;
  box-shadow: $--box-shadow-base;

  h4 {
    font-weight: 500;
    color: $--color-text-regular;
    line-height: 20px;
    height: 20px;
    font-size: $--font-size-base;
  }
}
```

问题一：业务不知道 `.card` 里面封装了 `h4`，所以业务可能会这样写：
```html
<div class="card">
  <h3>Title</h3>
</div>
```

问题二：以后样式封装变动了，那业务代码怎么办呢？

解决的办法之一是使用 React + TypeScript 做组件的强类型封装，实现对业务代码的强约束，如下所示。
::: details React + TypeScript 组件强类型封装
```tsx
import React from 'react'

const Title = (props: { children: any }) => {
  return <h4>
    {props.children}
  </h4>
}

const SplitHorizontal = (props: {}) => {
  return <div
    style={{
      height: '1px',
      width: 'calc(100% + 15px + 15px)', // Card 内边距是 15px
      position: 'relative',
      left: '-15px',
      borderTop: '1px solid #ebedf0'
    }}></div>
}

type CardChild = (
  ReturnType<typeof Title> |
  ReturnType<typeof SplitHorizontal>
)

const Card = (props: { children?: CardChild | CardChild[] }) => {
  return <div
    style={{
      minHeight: '100px',
      minWidth: '50px',
      padding: '15px',
      borderRadius: '4px',
      boxShadow: '0 4px 8px 0 rgb(57 63 73 / 10%)'
    }}
  >
    {props.children}
  </div>
}

Card.Title = Title
Card.SplitHorizontal = SplitHorizontal

export default Card
```
:::
