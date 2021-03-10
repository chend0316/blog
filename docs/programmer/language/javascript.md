# JavaScript

因为 JS 看起来和其它语言很像，所以初学者总是误以为 JS 不难学。然而这是一个陷阱，JavaScript中的一些概念和其它语言完全不同。
- 函数是一等公民
- 闭包
- 函数作用域、块级作用域
- 基于原型的面向对象
- 函数、数组也是对象

## 编码、运行
### 运行时环境
JavaScript 语言一直在发展，但 JS 引擎的支持往往没那么快，可以在 [https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/) 查看 JS 特性的支持情况。对于不支持的特性可以使用 [Babel](https://babeljs.io/) 或 Traceur 转换。

JavaScript 可以运行在各种环境中，但最常见的还是运行在浏览器和 Node 上。在现实世界中浏览器并不能完美实现 Web 标准，这就引入了 Polyfill/Shim 的概念。Babel 也提供了 Polyfill 的 runetime。

## 编译
### 作用域
`var` 的声明提升和函数作用域这两个特性和其它语言差异大，迷惑了许多开发者。ES6 的 `let` 和 `const` 解决了这个问题，采用了块级作用域、没有声明提升的特性。

### 类型
JS 有 7 种类型：Undefined、Null、Boolean、String、Number、Symbol、Object。Symbol 是 ES6 新增的。

和多数动态类型语言一样，JS 需要一个运算符来判断变量的类型，这个运算符是：`typeof`。JS 的 `typeof` 是有很多缺陷的，其中最臭名昭著的就是 `typeof null === 'object'`，所以写代码的时候有必要自己封装一个函数来判断类型。

通过 `==` 运算判断变量是否相等时会涉及到隐式类型转换，然而 JS 有一套相当复杂的转换规则，所以最佳实践是使用 `===` 运算。

## 函数
精通 JavaScript 的一个秘诀是要明白 JS 函数和其它语言存在巨大差异：
- 在 JS 中函数也是对象，对于函数 `function foo()` 我们可以 `foo.xxx = 1` 从而实现一些高级的需求
- 函数会有 2 个隐含参数：`this`、`arguments`

精通 JavaScript 的另一个秘诀是要将它视作一门函数式语言，这本身是个大话题，可以阅读[《JavaScript函数式编程指南》](https://book.douban.com/subject/30283769/)。这里简单列几个术语吧：
- 柯里化
- TODO：这本书我自己也没看，等看过再说

### 函数表达式和函数声明
函数表达式可以立即调用 (IIFE)，但函数声明不可以。为了让 JS 引擎能在语法上区分二者，我们有几种办法：
- 加括号：`(function(){ ... })(a, b)`
- 加括号：`(function(){ ... }(a, b))`
- 在前面加任意一元操作符：`+function(){ ... }(a, b)`
- 这样写会识别为函数声明，导致报错：`function(){ ... }(a, b)`

[IIFE](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE) 是非常基础的技巧，需要熟练掌握。

### this
在其它语言中，`this` 的指向取决于函数定义的位置。但 JavaScript 把 `this` 看做是一种入参，所以 `this` 的指向取决于函数被调用的位置。共有这几种情况：
- 作为函数 (function) 直接调用，这时候指向 window 对象，但开启 `'use strict'` 之后指向 undefined
- 作为对象的方法 (method) 调用，指向相应的对象
- 作为构造器，通过 `new` 调用，指向 `new` 创建出来的新对象
- 通过 `apply()` 或者 `call()` 调用可以指定 `this` 的指向
- 通过 `bind()` 创建函数是一种柯里化技术，它会提前传入 `this` 参数
- 特殊：ES6 的箭头函数中 `this` 指的是一个变量，而不是一个入参，所以会按照词法作用域的规则来确定其指向

::: details bind 的实现原理
```javascript
Function.prototype.mybind = function () {
  var args = Array.prototype.slice.call(arguments);
  var that = args.shift();
  var func = this;
  return function () {
    func.apply(that, args);
  }
}

function foo(a, b) { console.log(this, a, b); }
var foo2 = foo.mybind({a: 1}, 1, 2);
foo2()
foo2.call({a: 2})  // 无效
```
:::

## 原型 & 面向对象
JS 是基于原型的语言，也可以实现封装、继承、多态，因此也算作一种面向对象语言。

基于原型的语言在语法上和传统 OOP 有很大不同，为了让它看起来像传统 OOP，JS 引入了下面这些东西：
- 每个函数都有 `prototype` 属性指向一个原型，这个原型的 `constructor` 指回了这个函数
- 在函数前加上 `new` 意思是实例化这个类
- `instanceof` 用于判断对象是否是某个类
- 原型的 `__proto__` 属性指向另一个原型，这叫做原型链，用于实现继承

ES6 引入了新的 Class 语法，让代码写法和传统 OOP 完全一致，但它只是语法糖，底层还是基于原型的。

### ES5：基于原型的面向对象
JS 当初为了模仿 Java 引入了 `new` 关键字，同时为函数引入了 `prototype` 属性，引入了 `instanceof` 运算符。

用 `prototype` 可以定义一个类，用 `new` 可以创建这个类的对象。

```javascript
function Shape(x, y) {
  this.x = x;
  this.y = y;
}
Shape.prototype = {
  __proto__: Object.prototype,
  constructor: Shape,
  getLocation: function () {
    return '(' + this.x + ', ' + this.y + ')';
  }
};

function Rectangle(x, y, width, height) {
  Shape.call(this, x, y);
  this.width = width;
  this.height = height;
}
Rectangle.prototype = {
  __proto__: Shape.prototype,
  constructor: Rectangle,
  getArea: function () {
    return this.width * this.height;
  }
};

var rect = new Rectangle(1, 1, 3, 4);
console.log(rect.getLocation());
console.log(rect.getArea());
```

### ES6：面向对象

```javascript
class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getLocation() {
    return `(${this.x}, ${this.y})`;
  }
}

class Rectangle extends Shape {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

var rect = new Rectangle(1, 1, 3, 4);
console.log(rect.getLocation());
console.log(rect.getArea());
```

### 原型链
原型链在 JS 语言规范里面叫做 `[[Prototype]]`，规范并没有要求实现这个字段。但实际上所有浏览器，甚至连 Node 服务端都实现了，而且都叫做 `__proto__`。

“读”操作会顺着原型链一直找，“写”操作只会写当前对象不会覆盖原型链上的对象。

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
