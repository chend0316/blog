# React 中后台系统：技术选型
## 状态管理
恒定不变的数据 (例如中国城市数据)，可以缓存到 LocalStorage。

简单的全局数据可以使用 Context API 存储。

复杂的全局数据可以用 Redux 存储。

### Context API

### 使用 Redux
概念和术语：
- Actions: 是一个 JS 对象，形如 `{ type: 'todos/add', payload: 'Buy milk' }`
- Action Creators: 返回 Action 的函数，形如 `(...) => action`
- Reducers: 是一个函数，形如 `(state, action) => newState`
- Immutability: Reducer 必须是纯函数，它返回的 newState 必须是 state 的深拷贝/浅拷贝，不能直接修改 state 对象本身
- Dispatch

可以在 [Redux 英文官网](https://redux.js.org/) 学习 Redux，中文官网的文档落后很多，不建议阅读。重要的知识点有：
- 在 React 中使用 Redux
- 使用 Redux Toolkit 简化开发
- 使用中间件处理异步逻辑
- 使用 TypeScript

## 开发环境搭建
Chrome、Firefox 插件：
- React DevTools
- Redux Devtools

## 单元测试

## 代码风格

## 组件库

