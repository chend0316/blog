# JavaScript

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
