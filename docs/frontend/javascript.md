# JavaScript
## 常用操作
### 节流 (throttle)、防抖 (debounce)
节流就是避免单位时间内触发太多次，防抖就是等事件最终稳定下来之后才触发。在实现上节流比防抖更加复杂。

防抖实现的关键是内部维护一个 `timeout` 定时器句柄，每次先取消定时器，然后重新倒计时。定时器到期就调用原函数，注意要把 `this` 也带过去。

::: details ES5 实现防抖
```javascript
function debounce(fn, wait) {
  var timeout = null;
  return function () {
    var args = arguments;
    var that = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(that, args);
    }, wait);
  }
}
```
:::

::: details ES6 实现防抖
```javascript
function debounce(fn, wait) {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this, ...args);
    }, wait);
  }
}
```
:::

节流是用定时器 + 时间戳实现的，比较好实现可以传入选项控制头尾事件是否触发。啰嗦一句，`new Date()` 返回的是当前时间戳，相减得到的时间差单位是毫秒。

::: details 时间戳实现头触发的节流
```javascript
// 这种实现会把最后一个事件 (尾事件) 给弄丢
function throttle(fn, wait) {
  let pre = 0; // 确保头事件不会弄丢
  return function (...args) {
    let cur = new Date();
    if (cur - pre >= wait) {
      fn.call(this, ...args);
      pre = cur;
    }
  }
}
```
:::

::: details 定时器 + 时间戳实现头尾触发的节流
代码 TODO
:::

## ES6
### Promise
一个最基本的 Promise 用法如下。

::: details Promise 封装 Ajax 请求
<<< @/src/es6/promise-ajax.js
:::

Promise 基础用法：
- `Promise.prototype.then()`
- `Promise.prototype.catch()`
- `Promise.prototype.finally()`

::: details .then() 的用法
<<< @/src/es6/promise-then.js
:::

::: details .catch() 的用法
`.catch(foo)` 相当于 `.then(null, foo)` 或 `.then(undefined, foo)`
:::

多个 Promise 之间的关系：
- `Promise.all()`
- `Promise.race()`
- `Promise.any()`

::: details Promise.all()
<<< @/src/es6/promise-all.js
:::

::: details resolve 另一个 Promise
<<< @/src/es6/promise-resolve.js
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
<<< @/src/es6/generator-flat.js
:::

也可以用 Generator 生成 Iterator。

::: details Generator 和 Iterator 的关系
<<< @/src/es6/generator-iterator.js
:::

### Iterator

## 鬼才操作

::: details 实现 (3).add(2).add(1) === 6
```javascript
Number.prototype.add = function (a) {
  return this + a;
}
console.log((3).add(2).add(1)) // 6
```
:::

::: details 实现 cnt()(2)(1)() === 3
```javascript
function cnt() {
  let _cnt = 0;
  return function foo(a) {
    if (a === undefined) return _cnt;
    _cnt += a;
    return foo;
  }
}
cnt()(2)(1)(); // 3
```
:::

## JS 语言原理
### 实现 new 操作

### instanceof 的原理
`a instanceof A` 就会遍历 `a.__proto__`，判断是否等于 `A.prototype`。

### Promise 的原理
