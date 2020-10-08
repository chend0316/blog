# ES6

## 填坑式特性
因为 ES5 的一些特性不符合直觉、不符合其它语言的习惯，开发者经常写出 BUG。

### 箭头函数
ES5 函数的 `this` 指针指向共有 4 种情形，让开发者很迷惑。ES6 引入的箭头函数采用词法作用域来决定 `this` 指向。

### let const
`var` 的声明提升和函数作用域这两个特性和其它语言差异大，迷惑了许多开发者。ES6 的 `let` 和 `const` 解决了这个问题。

## 程序控制流
### Promise
一个最基本的 Promise 用法如下。

::: details Promise 封装 Ajax 请求
<<< @/../src/es6/promise-ajax.js
:::

Promise 基础用法：
- `Promise.prototype.then()`
- `Promise.prototype.catch()`
- `Promise.prototype.finally()`

::: details .then() 的用法
<<< @/../src/es6/promise-then.js
:::

::: details .catch() 的用法
`.catch(foo)` 相当于 `.then(null, foo)` 或 `.then(undefined, foo)`
:::

多个 Promise 之间的关系：
- `Promise.all()`
- `Promise.race()`
- `Promise.any()`

::: details Promise.all()
<<< @/../src/es6/promise-all.js
:::

::: details resolve 另一个 Promise
<<< @/../src/es6/promise-resolve.js
:::

::: details Promise + setTimeout 面试题
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3');
  })
  .then(() => {
    console.log('4');
  });

console.log('5');
```
:::

### Generator
Generator 的基本用法如下。

::: details 使用 Generator 封装 Flat 操作
<<< @/../src/es6/generator-flat.js
:::

也可以用 Generator 生成 Iterator。

::: details Generator 和 Iterator 的关系
<<< @/../src/es6/generator-iterator.js
:::

### Iterator

## 面向对象
ES5 基于原型链也能写出面向对象程序，只是语法和其它语言差异大。ES6 引入了一些 Class 语法，其实只是语法糖，本质上还是原型链。

## 元编程
### Proxy
### Reflection
