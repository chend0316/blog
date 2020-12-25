# React Redux
React Redux 是 React 和 Redux 的“中间层”，实现 React 和 Redux 的对接。这里介绍两种风格的 API，不做深入研究。

## 使用 Connect
使用 `connect()` 接口将 Redux 相关的逻辑分离出来，缺点是比较死板，还引入了展示型组件 (Presentational Components) 和容器组件 (Container Components) 这两个新概念加重开发人员的心智负担。[代码](https://codesandbox.io/s/react-redux-with-connect-sfl6c?file=/src/Counter.js)如下。

```javascript
import React from "react";
import { connect } from "react-redux";

// 展示型组件
function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <button onClick={onDecrement}>-</button>
      <span>{count}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

// 容器组件
const mapStateToProps = (state) => ({
  count: state
});

const mapDispatchToProps = {
  onIncrement: () => ({ type: "INCREMENT" }),
  onDecrement: () => ({ type: "DECREMENT" })
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;
```

## 使用 Hooks
Hooks 出现后 `connect()` 就被弃用了，同样能将 Redux 相关逻辑分离，而且还更灵活小巧。[代码](https://codesandbox.io/s/react-redux-with-hooks-yqupm?file=/src/Counter.js)如下。

```javascript
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  const onDecrement = () => dispatch({ type: "DECREMENT" });
  const onIncrement = () => dispatch({ type: "INCREMENT" });

  return (
    <div>
      <button onClick={onDecrement}>-</button>
      <span>{count}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

export default Counter;
```
