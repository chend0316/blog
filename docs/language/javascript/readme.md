# JavaScript

## null和undefined的区别
null是JS的保留字，而undefined不是（这是JS的一个坑）。因此undefined可能会被覆盖，为了获取真正的undefined，我们可以用`void 0`表达式（这是在填坑）。为了彻底解决这个坑，ES5规定不能覆盖undefined，可惜浏览器不一定会遵循这个规定。

二者在语义上有区别，undefined表示这个变量没有定义，null表示这个变量有定义但是值为空。在TS中这个语义区别更加明显，见下面这段代码。
```ts
function add(a: number, b = 2, c: number, d = 4) {
    return a + b + c + d;
}

console.log(add(1, undefined, 3))  // 使用undefined来填充默认参数，而不是用null
```
