# React 中后台系统：技术选型
## 状态管理
恒定不变的数据 (例如中国城市数据)，可以缓存到 LocalStorage。

简单的全局数据可以使用 Context API 存储。

复杂的全局数据可以用 Redux 存储。

### 使用全局变量
这显然不是一个好的方法，使用全局变量有以下缺点：
- 数据变化缺少响应式更新机制
- 难以跟踪、调试、维护
- 可测试性差

### Context API
传统 React 应用中，数据通过 props 属性进行传递。但遇到一些需要大范围共用的属性时，需要通过 props 层层传递，这是极其繁琐的。Context 的出现就是为了解决这个问题。

::: details Context API 示例代码
```javascript
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <ThemedButton />
        <ThemedButton2 />
      </ThemeContext.Provider>
    );
  }
}

// Class.contextType 风格
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// HOC 风格
function ThemedButton2() {
  return (
    <ThemeContext.Consumer>
      {(value) => <ThemedButton theme={value} />}
    </ThemeContext.Consumer>
  );
}
```
:::

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

