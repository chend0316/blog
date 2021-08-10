# 编程

## 编程语言
### 变量、类型
变量 (Variable)、数据类型 (Data Types)
- 隐式类型转换、强制类型转换

基本类型 (Primary Data Types)，有的语言叫做值类型 (Value Types)。引用类型 (Reference Types)，有的语言叫做对象类型 (Object Types)。

阅读材料：
- [Java 的 8 种基本数据类型](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [JavaScript 基本数据类型](http://262.ecma-international.org/5.1/#sec-8)
- Python 实现了“一切皆对象”所以并没有 Primary Types 的概念

### 字面量 (Literals)
问大家一个问题：读大学需要多久？
- 四年？
- 三秒？

自然语言有二义性，编程语言需要消除歧义。

```c
// 字符串字面量一定要双引号包裹
int zhangsan = 1;
char *name = "zhangsan";

// 变量名不能用数字开头，否则编译器分不清: 是变量名？还是整数字面量？
char *1name = "zhang";
char *1e10 = "zhang";
char *1f = "zhang";
int a = 1e10;
float b = 1f;
```

### 运算 (Operation)
#### 算术运算
- 加减乘除、取余
- 整除: Python2、C/C++、Java
- 自然除: Python3、JavaScript

::: details lc-9: while-loop, floor-division
[练习地址](https://leetcode-cn.com/problems/palindrome-number)，这题考察: 整除、取余。
:::

#### 逻辑运算
- 布尔短路

#### 位运算
- 算术右移、逻辑右移

C++ 对于无符号数采用逻辑右移、有符号数采用算术右移。Java 语言没有无符号数，因此一律为算术右移，为了表示逻辑右移，Java 引入了一个 `>>>` 的运算符。

### 语句 (Statement)
剧透一下：语句 (Statement) 和表达式 (Expression) 的区别是很重要的知识点，以后会讲

#### 条件语句
- if 语句
- if-else 语句
- if-elseif-else 语句

#### 循环语句
- while 语句
- for 语句

### 函数 (Function)
- 函数定义
- 函数调用

### 数组 (Array)
知识点:
- 数组字面量 (Array Literal)
- 数组初始化 (Array Initialize)

Python:
- 数组字面量: `[1, 2, 3]`、`[i * 2 for i in range(3)]`
- 批量初始化: `[0]*3`
- 多维数组字面量: 
- [英文阅读材料](https://www.askpython.com/python/array/initialize-a-python-array)

Java:
- 数组字面量: `{"a", "b", "c"}`、`new String[]{"a", "b", "c"}`
- 多维数组字面量: 
- [英文阅读材料](https://stackoverflow.com/questions/1200621/how-do-i-declare-and-initialize-an-array-in-java)

JavaScript:
- 数组字面量: `['a', 'b', 'c']`

### 程序控制流：异常处理

### 字符串
- 字符串 (String) 的表示
- 常用方法: 字符串拼接 (strcat)、提取子串 (substr)、去除首尾空格 (trim)
- 正则
- Unicode

## 编译基础 (Compile)
### 词法分析器 (Tokenizer、Lexial Parser)
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

### 语法分析器 (Syntax Parser)

### 常量 (const)、左值 (left value)、右值 (right value)
左值相当于写操作，会改变变量的值，右值不会改变变量的值。不确切的讲：变量如果放在赋值运算符左边就是 left value，放在右边就是 right value。

编译器如果发现程序员把 const 放在 left value 的位置，就会直接编译报错，这样可以减少程序员犯错的概率。

::: tip
一些运算 (如自增运算) 让左右值的判断变得比较复杂。Python 语言没有自增运算，其实给程序员减负了。
``` c
int a = 1;
int b = a++;  // a++ 即是读又是写，所以说不清到底算左值还是右值
```
:::

### getter/setter
如果有定义 getter/setter 函数的话，编译器会把 left value 替换为 setter()，把 right value 替换为 getter 函数。所以：
- 理解 left/right value 是理解 getter/setter 的基础
- 前面说了由于 `++` 运算符的存在，left/right value 的概念不好理解
- 所以 getter/setter 也不太好掌握

getter/setter 挺好用的，C++、JavaScript 都有这个特性。Java 为了降低使用门槛，把这个特性删了实在可惜。

Python 也号称使用门槛低，为啥它就支持 getter/setter 呢？因为 Python 直接把 `++` 运算符给删了啊。妙啊，Java 应该学着点。

::: details 给大家演示一些代码
todo: 演示 C++、JavaScript、Python
:::

### 声明 (declare)、定义 (define)、声明提升 (declare hoisting)
C/C++ 的声明和定义可以分开。后来 Java、Python、JavaScript 的语法把声明和定义合二为一了，这样可以降低编程门槛。

JavaScript 的 `var` 有 declare hoisting 的特性，许多初学者都被它坑惨了，业界毒瘤。

### 作用域 (Scope)、生命周期 (lifetime)
[英文阅读材料](https://en.wikipedia.org/wiki/Scope_(computer_science)#Levels_of_scope)

JavaScript 的 `var` 采用的是函数作用域，许多初学者都被它坑惨了，业界毒瘤。

### 装箱 (autoboxing)、拆箱 (unboxing)
- 自动装箱 (autoboxing): 编译器在某些情况下会偷偷把 primary type 转为 object
- 自动拆箱 (unboxing): 与之相反
- 这是 Compiler 做的工作，所以 Interpreted Language 没有这个特性

::: details JavaScript 中的自动装箱
[英文阅读材料](https://stackoverflow.com/questions/17216847/does-javascript-autobox)

```javascript
// 123 是 Primary Type，肯定没有成员函数的，但为啥我们能调用它的 toString 方法呢？
(123).toString();
```
:::

### 函数签名、函数重载
使用英文教材的同学可以区分一下这几个区别: overload、overwrite、override。

由于很难翻译成中文，在中文语境一般不区分三者。

### 运算符重载
C++ 支持，用多了会让代码难以理解，使用门槛比较高。Java 为了降低门槛，不支持运算符重载。但是 Python 支持运算符重载。

### sizeof 是函数吗？

### typedef

## 编程基础

### Hello World
编译型语言 (Compiled language): C/C++

解释型语言 (Interpreted Language): Python

但现代编程语言很多都分不清是编译型还是解释型: Java、JavaScript。Java 会先编译成字节码，然后用 Java 虚拟机解释执行。

二者区别: [英文阅读材料](https://www.geeksforgeeks.org/difference-between-compiled-and-interpreted-language/)

有同学可能会用是否存在 [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) 来区分二者，认为有 REPL 的语言是 Interpreted Language，这其实是一个误区。
- [Python 有 REPL](https://docs.python.org/3/tutorial/interpreter.html)，所以 Python 是 Interpreted Language
- C/C++ 没有 REPL，所以是 Compiled Language
- 这其实是误区，编译型语言也可以有 REPL

### 命令行程序
- 命令行参数 (command-line arguments)
- 进程退出码 (process exit code)
- 进程 ID (process id)
- main 函数

::: tip
在 macOS/Linux 下可以通过 `echo $?` 命令查看上一个进程的退出码，约定退出码为 0 表示程序正常退出。
:::

编译型语言一般用 main 函数的参数代表命令行参数，用 main 函数的返回值表示进程退出码。
::: details 例如 C 语言
[英文阅读材料](https://www.geeksforgeeks.org/command-line-arguments-in-c-cpp/)

```c
#include <stdio.h>

int main(int argc, char **argv) {
  // argc 表示命令行参数的个数，argv 表示命令行参数

  for (int i = 0; i < argc; i++) {
    printf("%s\n", argv[i]);
  }

  return 1; // 退出码是 1
}
```
:::

解释型语言也有各自的方法来表示命令行参数。
::: details 例如 Node.js
```javascript
for (const arg of process.argv) {
    console.log(arg);
}
process.exit(1); // 退出码是 1
```
:::

::: details 例如 Shell 脚本
```bash
#!/bin/bash
exit 1 # 退出码是 1
```
:::

::: details standard error codes
- 1 - Catchall for general errors
- 2 - Misuse of shell builtins (according to Bash documentation)
- 126 - Command invoked cannot execute
- 127 - “command not found”
- 128 - Invalid argument to exit
- 128+n - Fatal error signal “n”
- 130 - Script terminated by Control-C
- 255\* - Exit status out of range
:::

- [英文阅读材料](https://shapeshed.com/unix-exit-codes/)

### 进程退出
- 借助 Ctrl-C 讲解信号
- 异常退出，coredump 文件


## 算法基础 (Algorithm)
### 时间复杂度
[big O cheat sheet](https://www.bigocheatsheet.com/)

### 数据结构: 队列、栈、哈希表
- 队列 (Queue)
- 栈 (Stack)
- 哈希表 (Hash Table)
  - 英文语境也会叫做: map、dict、kv-pair
  - 中文语境也会叫做: 映射、字典、键值对
- 集合 (Set)
  - 所有语言都把它叫做 set

::: details lc-20 有效的括号: stack
[练习地址](https://leetcode-cn.com/problems/valid-parentheses/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

<<< @/../leetcode/lc-20.py

<<< @/../leetcode/lc-20.js
:::

### 循环
知识点:
- 从头到尾循环
- 从尾到头循环
- 从中间向两边循环
- 从两边向中间循环
- 多重循环优化，通常是考虑省去内层循环，在外层循环的时候“记忆”必要信息

::: details lc-1 两数之和: for-loop, nested-loop
[练习地址](https://leetcode-cn.com/problems/two-sum/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

输入是一维数组，使用暴力法找两个不同下标，难点：
- 二重循环
- 需要暴力枚举出所有下标组合情况，而非排列情况
- 因为是组合而非排列，所以要想清楚内层循环的控制变量从多少开始
- 为了优化多重循环，我们想办法删掉内层循环

<<< @/../leetcode/lc-1-force.py

<<< @/../leetcode/lc-1.py
:::

::: details 两数之差
[力扣原题](https://leetcode-cn.com/problems/two-sum/)的改造，将原题两数之和改为两数之差即可。

使用暴力法找两个不同下标，改造点在于：
- 原题使用暴力找两个下标的组合
- 改后使用暴力找两个下标的排列

```python
def solution(nums, target):
    for i in range(0, len(nums)):
        for j in range(0, len(nums)):
            if i == j: continue
            if nums[i] + nums[j] == target:
                return [i, j]
```
:::

::: details lc-5 最长回文子串
[练习地址](https://leetcode-cn.com/problems/longest-palindromic-substring/)

输入是字符串，即一维数组。这题需要从中间向两边遍历。

<<< @/../leetcode/lc-5.py
:::

::: details lc-11 盛最多水的容器
[练习地址](https://leetcode-cn.com/problems/container-with-most-water/)

输入是一维数组。这题需要从中间向两边遍历。难点：
- 循环迭代的动作二选一: i++、j--
- 需要在循环体内决定选哪个动作

<<< @/../leetcode/lc-11.java

<<< @/../leetcode/lc-11.js

<<< @/../leetcode/lc-11.py
:::

::: details lc-42 接雨水
[练习地址](https://leetcode-cn.com/problems/trapping-rain-water/)

暴力做法，考虑每一根柱子能接的雨水量，外层循环遍历所有柱子，内层需要两个循环（一个向左、一个向右）。
- 二重循环，内层有 2 个循环
- 多重循环优化: 将内层循环移出去，形成 3 个并列的循环

<<< @/../leetcode/lc-42.java
:::

::: details lc-14 最长公共前缀: two-dimensional-arrays
[练习地址](https://leetcode-cn.com/problems/longest-common-prefix/)，这题比较烦。

题目给的是字符串数组，因为字符串本身也是数组，所以这题是一个二维数组，需要用二重循环来处理。难点在于：
- 外层循环遍历数组的第二个维度、内层循环遍历数组的第一个维度，和以往相反
- 外层循环退出的时机由循环体内运行结果决定
- break 退出的条件
- 这题需要纵向遍历二维数组

<<< @/../leetcode/lc-14.py
:::

::: details lc-15 三数之和: for-loop, nested-loop
[练习地址](https://leetcode-cn.com/problems/3sum)，这题很难。

先给数组排序，然后使用找三个不同下标，难点：
- 二重循环
- 内层循环顺序: 从两边向中间遍历
- 结果去重的方法有点超纲，比较难

:::

### 递归

::: details lc-100 相同的树
<<< @/../leetcode/lc-100.java
:::

::: details lc-98 验证二叉搜索树
<<< @/../leetcode/lc-98.java
:::

::: details lc-70-暴力: fibonacci, recursion
<<< @/../leetcode/lc-70-force.py
:::

::: details lc-70-记忆化: dynamic-array, loop
<<< @/../leetcode/lc-70-memorize.py
:::

### 数据结构: 树

### 数组操作
- 数组 (Array)

::: details lc-27 移除元素: array
[练习地址](https://leetcode-cn.com/problems/remove-element/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

数组的题，这题用 C/Java 来刷。需要删除匹配的元素，逆向思维就是要保留不匹配的元素。

<<< @/../leetcode/lc-27.c
:::

::: details lc-26 删除有序数组中的重复项: array
[练习地址](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

数组的题，这题用 C/Java 来刷。逆向思维就是要保留不重复的元素。

<<< @/../leetcode/lc-26.c
:::

::: details 删除无序数组中的重复项: set
请完成下面的函数，实现去重的功能。思路是把 arr 转成 set，然后再转回 arr。

```javascript
function solution(arr) {
    return Array.from(new Set(arr));
}
```
:::

### 指针、链表
::: details lc-21 合并两个有序链表
[练习地址](https://leetcode-cn.com/problems/merge-two-sorted-lists)
:::

## 编程模式

### 事件循环、事件驱动

### 异步回调

### Promise: 用同步的思维写异步代码

## 外部系统
### 命令行输入、输出、错误流
### 环境变量
### 系统调用
### 文件 I/O
### 网络 I/O
