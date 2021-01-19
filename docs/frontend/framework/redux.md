# Redux
Redux 遵循了 Flux 的思想，2015年由 [Dan Abramov](https://github.com/gaearon) 提出。二者很像，但在具体细节上有很大区别。后来 Dan 加入了 Facebook，Redux 也就成了 Facebook 官方提供的状态管理框架。

![](./img/redux-arch.png)

## 基础概念

- Actions: 是一个 JS 对象，形如 `{ type: 'todos/add', payload: 'Buy milk' }`
- Action Creators: 返回 Action 的函数，形如 `(...) => action`
- Reducers: 是一个函数，形如 `(state, action) => newState`
- Immutability: Reducer 必须是纯函数，它返回的 newState 必须是 state 的深拷贝/浅拷贝，不能直接修改 state 对象本身
- Dispatch

备注：
- 纯函数就是其返回值只依赖入参，不依赖全局变量/资源的函数

### Action
Action 是个普通的对象，如下 `dispatch` 中的参数就是 Action：
```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```

### Reducer
Reducer 是纯函数，入参是 state 和 action，它需要返回一个新的 state。注意它不能直接修改 state 本身，哪怕只修改一个小字段也要构造并返回一个新的 state。一个简单的例子如下：
```js
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      // 注意不能就地修改state
      // 不能通过 state.push({ text: action.text, completed: false }) 来实现
      return [
        ...state,  // 必须拷贝一份新的
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}
```

## 学习建议
可以在 [Redux 英文官网](https://redux.js.org/) 学习 Redux，中文官网的文档落后很多，不建议阅读。重要的知识点有：
- 在 React 中使用 Redux
- 使用 Redux Toolkit 简化开发
- 使用中间件处理异步逻辑
- 使用 TypeScript

## 其它深入思考

Redux 规定 Reducer 不能就地修改 state，这有点反人类，会加重垃圾回收器的负担。针对这点 [Dan 在 issue 上做出了回应](https://github.com/reduxjs/redux/issues/328)，他认为不会影响性能。
