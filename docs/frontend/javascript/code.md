# JavaScript 常用代码片段
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

## 编程范式
::: details Memorization
```javascript
// 实现了对外无感知的缓存功能，但是缓存的逻辑和业务逻辑混合起来了不太好
function isPrime(value) {
  if (!isPrime.cache) {
    isPrime.cache = {};
  }

  if (isPrime.cache[value] !== undefined) {
    return isPrime.cache[value];
  }

  var prime = value !== 1;

  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      prime = false;
      break;
    }
  }

  return isPrime.cache[value] = prime;
}
```
:::

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
