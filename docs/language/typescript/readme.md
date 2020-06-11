# TypeScript
## 从JS到TS
### 类型注解
TS中类型注解以冒号的形式放在变量或函数定义的后面，会对编译阶段产生影响。

TS的类型检查并不是万能的，对于这种情况就无法检查（为什么呢）：
```ts
let tuple: [number, string] = [0, '1']
tuple.push(2)  // 使用push可以绕开TS的类型检查，实际开发中不建议这样用
```

### 类型推断
有些地方就算不显式类型注解，TS也能对类型进行推断。

### 接口
类型、类型、类型。。。如果同样的类型注解反复出现，那么就抽象成一个接口，这是一种代码复用。

TS接口通过[鸭式辩型法]()来判断类型，动态类型语言（Python, Perl, Ruby, PHP, Javascript）中这是常见的方案。

但对于字面量，TS不会采用鸭式辩型法：
```ts
interface Person {
    name: string;
    age: number;
}
let p: Person
let p2 = {
    name: 'li',
    age: 19,
    addr: 'shanghai'
}
p = p2  // 成功
p = {
    name: 'li',
    age: 19,
    addr: 'shanghai'  // 失败
}
```

## 函数重载（overload）
函数重载指的是：在同一个作用域、函数名一样、函数签名不同。

在静态类型语言中，函数重载会对应多个函数实现。而动态类型语言有本质的不同，只有一个函数实现。

TS需要先声明多个签名不同的函数，最后实现一个最宽泛的版本。
```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    if (typeof a === 'string') {
        return a + ' ' + b;
    } else {
        return a + b;
    }
}
```

TS的函数重载有可能会失去类型检查的功能：
```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    if (typeof a === 'string') {
        return 1;  // TS无法检查出这种错误
    } else {
        return a + b;
    }
}
```

TS会按顺序去匹配函数签名，如果不小心将更宽泛的定义写在前面，可能会导致TS失去类型检查的功能：
```ts
function add(a: any, b: any): any;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    if (typeof a === 'string') {
        return a + ' ' + b;
    } else {
        return a + b;
    }
}
let n: number
n = add('a', 'b')  // 这里不会报错
```

## 面向对象：类

ES6已经引入了面向对象的语法，TS的类总体上是ES6的超集。

在ES6/TS中，类属性是实例属性而不是原型属性，类方法是实例方法而不是原型方法。

TS增加的特性：

- 成员修饰符：private、protected、public、static
- 可以给构造函数使用成员修饰符，使用protected实现虚基类
- 可以直接对构造函数的参数使用成员修饰符，省去了在类中的定义
- 支持抽象类

## 对类型进行抽象
泛型可以让类型当做参数一样传递。

ts-transformer-keys甚至可以遍历类型。
