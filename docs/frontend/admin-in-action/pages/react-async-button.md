# React 实现异步按钮

AsyncButton 组件实现思路：
- 如果 onClick 事件是异步的 (返回 Promise)，就需要 Loading 状态
- 除了要处理 resolve 还别忘了处理 reject

## 例子：业务自行维护 Loading 状态

<<< @/../labs/react/async-button/src/Old.js

## 例子：封装 AsyncButton 组件

<<< @/../labs/react/async-button/src/AsyncButton.js

## 例子：在列表页中使用 AsyncButton

<<< @/../labs/react/async-button/src/ListDemo.js
