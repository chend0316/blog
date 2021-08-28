
# 编译 (Compile) 入门
## 词法分析器 (Tokenizer、Lexial Parser)
对于分词有歧义的情况，现在的编译器都采用“贪心”的策略。

```c
int a = 1;
int b = a+++a;  // 请问 b 的值是多少？
int b = a ++ + a;  // 会解析成这种
int b = a + ++ a;  // 不会解析成这种
```

::: tip
工作中别写 `a+++a` 这样的代码，会被同事打噢！
:::

## 语法分析器 (Syntax Parser)

## 常量 (const)、左值 (left value)、右值 (right value)
左值相当于写操作，会改变变量的值，右值不会改变变量的值。不确切的讲：变量如果放在赋值运算符左边就是 left value，放在右边就是 right value。

编译器如果发现程序员把 const 放在 left value 的位置，就会直接编译报错，这样可以减少程序员犯错的概率。

::: tip
一些运算 (如自增运算) 让左右值的判断变得比较复杂。Python 语言没有自增运算，其实给程序员减负了。
``` c
int a = 1;
int b = a++;  // a++ 即是读又是写，所以说不清到底算左值还是右值
```
:::

## getter/setter
如果有定义 getter/setter 函数的话，编译器会把 left value 替换为 setter()，把 right value 替换为 getter 函数。所以：
- 理解 left/right value 是理解 getter/setter 的基础
- 前面说了由于 `++` 运算符的存在，left/right value 的概念不好理解
- 所以 getter/setter 也不太好掌握

getter/setter 挺好用的，C++、JavaScript 都有这个特性。Java 为了降低使用门槛，把这个特性删了实在可惜。

Python 也号称使用门槛低，为啥它就支持 getter/setter 呢？因为 Python 直接把 `++` 运算符给删了啊。妙啊，Java 应该学着点。

::: details 给大家演示一些代码
todo: 演示 C++、JavaScript、Python
:::

## 声明 (declare)、定义 (define)、声明提升 (declare hoisting)
C/C++ 的声明和定义可以分开。后来 Java、Python、JavaScript 的语法把声明和定义合二为一了，这样可以降低编程门槛。

JavaScript 的 `var` 有 declare hoisting 的特性，许多初学者都被它坑惨了，业界毒瘤。

## 作用域 (Scope)、生命周期 (lifetime)
[英文阅读材料](https://en.wikipedia.org/wiki/Scope_(computer_science)#Levels_of_scope)

JavaScript 的 `var` 采用的是 Function Scope，许多初学者都被它坑惨了，业界毒瘤。后来引入了 `let`、`const` 是 Block Scope。

## 装箱 (autoboxing)、拆箱 (unboxing)
- 自动装箱 (autoboxing): 编译器在某些情况下会偷偷把 primary type 转为 object
- 自动拆箱 (unboxing): 与之相反
- 这是 Compiler 做的工作，所以 Interpreted Language 没有这个特性

### 比较大小
C/C++ 语言指针可以进行大小比较，这是没有意义的。后来一众编程语言语法上直接禁止 Pointer/Reference 进行大小比较。

那么请问两个 Integer Object 如何进行大小比较呢？
- C++、Python 可以使用运算符重载
- Java、JavaScript 可以使用 unboxing

那么 C++、Python 语言是否存在装箱机制呢？

### 访问 method
::: details JavaScript 中的自动装箱
[英文阅读材料](https://stackoverflow.com/questions/17216847/does-javascript-autobox)

```javascript
// 123 是 Primary Type，肯定没有成员函数的，但为啥我们能调用它的 toString 方法呢？
(123).toString();
```
:::

## 函数签名、函数重载
使用英文教材的同学可以区分一下这几个区别: overload、overwrite、override。

由于很难翻译成中文，在中文语境一般不区分三者。

## 运算符重载
C++ 支持，用多了会让代码难以理解，使用门槛比较高。Java 为了降低门槛，不支持运算符重载。但是 Python 支持运算符重载。

## sizeof 是函数吗？

## typedef

## 语法糖 (Syntax Sugar)

::: details JavaScript Object Shorthand
```js
let a = 1, b = 2;
const obj = { a, b };
const Myth = {
  random() { return 42; }
};
```
:::

async/await 是语法糖吗？
