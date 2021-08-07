# 编程

## 编程基础

### Hello World
编译型语言 (compiler language): C/C++

解释型语言 (interpreter language): Python

但现代编程语言很多都分不清是编译型还是解释型: Java、JavaScript

二者区别: [英文阅读材料](https://www.geeksforgeeks.org/difference-between-compiled-and-interpreted-language/)

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

### 变量、类型
变量 (Variable)、数据类型 (Data Types) 大家自学。

基本类型 (Primary Data Types)，有的语言叫做值类型 (Value Types)。引用类型 (Reference Types)，有的语言叫做对象类型 (Object Types)。

阅读材料：
- [Java 基本数据类型](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
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

// 变量名不能用数字开头，否则编译器分不清: 是变量？还是字面量？
char *1name = "zhang";
char *1e10 = "zhang";
char *1f = "zhang";
int a = 1e10;
float b = 1f;
```

### 运算
- 加减乘除、取余
- 整除: Python2、C/C++、Java
- 自然除: Python3、JavaScript

::: details lc-9: while-loop, floor-division
[练习地址](https://leetcode-cn.com/problems/palindrome-number)，这题考察: 整除、取余。
:::

### 程序控制流：顺序、分支、循环、递归

#### 循环
::: details lc-1-暴力 两数之和: for-loop, nested-loop
[练习地址](https://leetcode-cn.com/problems/two-sum/)

输入是一维数组，使用暴力法找两个不同下标，难点：
- 二重循环
- 需要暴力枚举出所有下标组合情况，而非排列情况
- 因为是组合而非排列，所以要想清楚内层循环的控制变量从多少开始

<<< @/../leetcode/lc-1-force.py
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
[力扣原题](https://leetcode-cn.com/problems/longest-palindromic-substring/)

输入是字符串，即一维数组。这题需要从中间向两边遍历。

<<< @/../leetcode/lc-5.py
:::

::: details lc-14 最长公共前缀: two-dimensional-arrays
[练习地址](https://leetcode-cn.com/problems/longest-common-prefix/)，这题比较难。

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

#### 递归

::: details lc-70-暴力: fibonacci, recursion
<<< @/../leetcode/lc-70-force.py
:::

::: details lc-70-记忆化: dynamic-array, loop
<<< @/../leetcode/lc-70-memorize.py
:::

### 数组、字符串
- 数组 (Array)
- 字符串 (String)、正则

::: details lc-27 移除元素: array
[练习地址](https://leetcode-cn.com/problems/remove-element/)

数组的题，这题用 C/Java 来刷。需要删除匹配的元素，逆向思维就是要保留不匹配的元素。

<<< @/../leetcode/lc-27.c
:::

::: details lc-26 删除有序数组中的重复项: array
[练习地址](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

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

### 时间复杂度
[big O cheat sheet](https://www.bigocheatsheet.com/)

### 基本数据结构: 数组、队列、栈、哈希表
- 队列 (Queue)
- 栈 (Stack)
- 哈希表 (Hash Table)
  - 英文语境也会叫做: map、dict、kv-pair
  - 中文语境也会叫做: 映射、字典、键值对
- 集合 (Set)
  - 所有语言都把它叫做 set

::: details lc-1-最优解 两数之和: hash-table
[练习地址](https://leetcode-cn.com/problems/two-sum/)

之前我们使用了暴力法来做这题，现在使用哈希表，效率更高。

<<< @/../leetcode/lc-1-best.py
:::

::: details lc-20 有效的括号: stack
[练习地址](https://leetcode-cn.com/problems/valid-parentheses/)

<<< @/../leetcode/lc-20.py

<<< @/../leetcode/lc-20.js
:::


### 数据编码：整数、浮点数、字符串

### 指针、链表
::: details lc-21 合并两个有序链表
[练习地址](https://leetcode-cn.com/problems/merge-two-sorted-lists)
:::

### 程序控制流：异常处理

## 编程模式

### 事件循环、事件驱动

### 异步回调

## 编译基础
### 常量、左值、右值
### 装箱、拆箱
### 函数签名、函数重载
使用英文教材的同学可以区分一下这几个区别: overload、overwrite、override。

由于很难翻译成中文，在中文语境一般不区分三者。

### 运算符重载

### getter/setter

### 


## 外部系统
### 命令行输入、输出、错误流
### 环境变量
### 系统调用
### 文件 I/O
### 网络 I/O
