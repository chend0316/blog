# JavaScript

JavaScript 中的一些概念和其它语言完全不同。
- 函数式：函数是一等公民、高阶函数、闭包
- 函数作用域、块级作用域
- 基于原型的面向对象
- 函数、数组也是对象

## 编码、运行
### 运行时环境
JavaScript 语言一直在发展，但 JS 引擎的支持往往没那么快，可以在 [https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/) 查看 JS 特性的支持情况。对于不支持的特性可以使用 [Babel](https://babeljs.io/) 或 Traceur 转换。

JavaScript 可以运行在各种环境中，但最常见的还是运行在浏览器和 Node 上。在现实世界中浏览器并不能完美实现 Web 标准，这就引入了 Polyfill/Shim 的概念。Babel 也提供了 Polyfill 的 runetime。

浏览器和 Node 是不同的宿主环境，一些项目用 Node.js 模拟了一套浏览器环境。

## 编译
### 作用域
`var` 的声明提升和函数作用域这两个特性和其它语言差异大，迷惑了许多开发者。ES6 的 `let` 和 `const` 解决了这个问题，采用了块级作用域、没有声明提升的特性。

### 类型
JS 有 7 种类型：Undefined、Null、Boolean、String、Number、Symbol、Object。Symbol 是 ES6 新增的。整数和浮点数都是 Number。函数、数组的本质都是 Object。

typeof 用于判断类型。
- `typeof null === 'object'` 是一个坑
- `typeof [] === 'object'` 因为数组本质是对象
- `typeof foo === 'function'` 函数虽然本质也是对象，但 typeof 返回的是 function

### 类型转换
`==` 运算涉及隐式类型转换，JS 有一套相当复杂难懂的转换规则。此外 `if`、逻辑运算、`+` 也会涉及到隐式类型转换。

### 装箱、拆箱
Number、String 都是值类型，但有了自动装箱机制，我们可以：
- `(3.5).toFixed()`
- `"hello".substring(1)`

同样的自动拆箱机制：
- `(new Number(0.1)) + 0.2`

## 函数
精通 JavaScript 的一个秘诀是要明白 JS 函数和其它语言存在巨大差异：
- 函数也是对象，`foo instanceof Function` 可以证明这点，也有人用 `foo.xxx = 1` 实现一些高级的需求
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
- ES6 箭头函数中 `this` 指的是一个变量，而不是一个入参，所以会按照词法作用域的规则来确定其指向

::: details 手写 bind
```javascript
Function.prototype.mybind = function () {
  var args = Array.prototype.slice.call(arguments);
  var that = args.shift();
  var func = this;
  return function () {
    func.apply(that, args);
  }
}
```
:::

::: details 手写 new
```javascript
Function.prototype.new = function () {
  var obj = Object.create(this.prototype);
  var ret = this.apply(obj, arguments);
  return ret || obj;
}
var arr = Array.new(3);
```
:::

## 原型 & 面向对象
JS 是基于原型的语言，但可以实现面向对象的三大特性：
- 封装
- 使用原型链可以实现继承
- 动态语言的鸭式辨形法天然支持多态

基于原型的语言在使用上和传统 OOP 有很大不同，为了让它看起来像传统 OOP，JS 引入了下面这些东西：
- 函数的 `prototype` 属性指向一个原型，这个原型的 `constructor` 指回了这个函数；因此我们一定有 `func.prototype.constructor === func`，除非你想实现一些鬼才操作
- `new` 和 `instanceof` 都是语法糖

ES6 引入的 Class 语法，也是语法糖。

### 原型链
原型链在 JS 语言规范里面叫做 `[[Prototype]]`，规范并没有要求实现这个字段。但实际上所有浏览器、Node.js 都实现了，而且都叫做 `__proto__`。

“读”操作会顺着原型链一直找，“写”操作只会写当前对象不会覆盖原型链上的对象。

### ES5：基于原型的面向对象

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

## 程序控制流
### Promise

### Generator

::: details 使用 Generator 封装 Flat 操作
<<< @/../src/es6/generator-flat.js
:::

也可以用 Generator 生成 Iterator。

::: details Generator 和 Iterator 的关系
<<< @/../src/es6/generator-iterator.js
:::

### Iterator
