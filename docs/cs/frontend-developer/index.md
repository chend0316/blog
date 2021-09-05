# Web 前端开发入门
## web.dev
[web.dev](https://web.dev/) 网站上虽然是全英文的，但依然是首选学习资料。入门阶段先看 [CSS](https://web.dev/learn/css/)，其它的以后再看。

## JavaScript

### Babel
Babel is a JavaScript compiler.

Babel 7 开始使用了 Monorepo，所以 NPM 包会有 `@babel` 前缀。常用的包如下:
- `npm i @babel/core` 必装
- `npm i @babel/cli` 如果想在命令行敲 `babel` 命令，需要装
- 如果想配合 Webpack 使用，需要装 `npm i babel-loader`

### 语言
this 指向:
- function
- `Function.prototype.call`、`Function.prototype.apply`
- Object Method
- `Function.prototype.bind`，[本质是函数柯里化 (Function Currying)](https://medium.com/@allansendagi/javascript-fundamentals-bind-and-currying-c851902c40ae)
- arrow function

闭包 (Clousure)

### 模式
事件代理/委托。
