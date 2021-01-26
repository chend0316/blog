# Web 全栈开发基础

## 前后端通信
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
### TypeScript
Vue 对 TS 的支持很差，就算是 Vue 3，对组件入参、返回值的类型检查/类型推断都很不好。
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
