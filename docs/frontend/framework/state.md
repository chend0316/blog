# 状态管理框架
![](./img/store.png)

## 前端开发所面临的挑战
随着 JavaScript 单页应用开发日趋复杂，组件的状态变得越来越复杂。

Flux, CQRS, Event Sourcing, Redux, Vuex 这些状态管理框架做的事情就是让状态改变（state mutations）变得**可预测**。

同时这些框架对 state 的操作做了限制，有些限制很严格而且反常识，但遵循这些限制会带来如下开发体验的改进：
- 时间旅行（time travel）：可以回到过去的某个状态进行调试
- 状态快照导入导出
- 状态回放
- 等等

## Redux

![](./img/redux-arch.png)

Redux 借鉴了 Flux，2015年由 [Dan Abramov](https://github.com/gaearon) 提出。二者很像，但在具体细节上有很大区别。后来 Dan 加入了 Facebook，Redux 也就成了 Facebook 官方提供的状态管理框架。

Redux 的三大原则：
- 单一数据源（Single source of truth），所有状态都要集中放在 State 对象里面
- State 是只读的（State is read-only），组件不能直接修改 State，而是通过 dispatch action 的方式表明自己想修改 State 的意图，由 Redux 集中处理这些修改意图
- Reducer 必须是纯函数（Changes are made with pure functions），dispatch 发送出去的 action 会被送给 Reducer 处理，Reducer 是唯一能“修改” State 的地方，而 Reducer 必须为纯函数

备注：
- 纯函数就是其返回值只依赖入参，不依赖全局变量/资源的函数
- 连 Reducer 都不能直接修改 State，而是返回一份新的 State，实现上需要深拷贝一份然后进行修改

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

## 框架的思考

Redux 规定 Reducer 不能就地修改 state，这点非常反人类，稍微有点编程经验的人都会知道这样会使用更多的内存，加重垃圾回收器的负担。针对这点 [Dan 做出了回应](https://github.com/reduxjs/redux/issues/328)，他认为并不会影响性能。

## 参考资料

- https://redux.js.org/introduction/motivation
- https://redux.js.org/introduction/three-principles
