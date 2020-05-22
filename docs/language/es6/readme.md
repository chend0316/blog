
## let和const
以前JS只有var，ES6引入了let和const。
let/const是块级作用域，var是函数作用域。
let/const不存在变量提升现象，var存在。

var的现象不符合程序员的直觉，常带来奇怪的BUG。

## 解构赋值
ES6带来了解构赋值，和解构相反的操作叫做展开。

解构赋值可以让程序员写更复杂的「左值」，从而节约代码空间。
左值可以是复杂的数组、对象、数组对象相互嵌套，甚至可以有默认值。

「左值」有两种情况：赋值号左边、函数的参数。

下面举几个例子，摘自[这里](https://es6.ruanyifeng.com/#docs/destructuring)。

```js
let [a, [b], d] = [1, [2, 3], 4];
let [x, y, z] = new Set(['a', 'b', 'c']);
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p, p: [x, { y }] } = obj;
```
