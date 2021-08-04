# 编程

## 编程基础

### Hello World
编译型：C、Java

解释型：Python、JavaScript

### 命令行程序
- 命令行参数
- 退出码
- pid
- main 函数

编译型语言一般用 main 函数的参数代表命令行参数，用 main 函数的返回值表示进程退出码。
::: details 例如 C 语言
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

::: tip
在 macOS/Linux 下可以通过 `echo $?` 命令查看上一个进程的退出码，约定退出码为 0 表示程序正常退出。
:::

### 进程退出
- 借助 Ctrl-C 讲解信号
- 异常退出，coredump 文件

### GUI 程序（略）
2021 年了，基础阶段不用学了。本科主要借助 GUI 来讲：面向对象、事件驱动。这两个知识点我们通过别的场景来教学。

### 变量、类型
### 运算
- 加减乘除、取余
- 整除: Python2、C/C++、Java
- 自然除: Python3、JavaScript

::: details lc-9: while-loop, floor-division
[练习地址](https://leetcode-cn.com/problems/palindrome-number)，这题考察: 整除、取余。
:::

### 程序控制流：顺序、分支、循环、递归

::: details lc-1-暴力 两数之和: for-loop, nested-loop
[练习地址](https://leetcode-cn.com/problems/two-sum/)

输入是一维数组，使用暴力法找两个下标，难点：
- 二重循环
- 需要暴力枚举出所有下标组合情况，而非排列情况
- 因为是组合而非排列，所以要想清楚内层循环的控制变量从多少开始

<<< @/../leetcode/lc-1-force.py
:::

::: details 三数之和

使用暴力法找三个下标，难点：
- 二重循环
- 需要暴力枚举出所有下标组合情况，而非排列情况
- 因为是组合而非排列，所以要想清楚内层循环的控制变量从多少开始
:::

::: details todo 找一个暴力枚举排列的题目
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


::: details lc-70-暴力: fibonacci, recursion
<<< @/../leetcode/lc-70-force.py
:::

::: details lc-70-记忆化: dynamic-array, loop
<<< @/../leetcode/lc-70-memorize.py
:::

### 数组、字符串、哈希表
- 数组
- 字符串、正则
- 哈希表
  - 一般语言喜欢叫做 map，中文翻译为「映射」
  - Python 语言叫做 dict，中文翻译为「字典」
  - 不管叫做什么，说的都是同一种东西
- 集合
  - 所有语言都把它叫做 set

::: details lc-27 移除元素: array
[练习地址](https://leetcode-cn.com/problems/remove-element/)

数组的题，这题用 C/Java 来刷。
:::

::: details lc-26 删除有序数组中的重复项: array
[练习地址](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

数组的题，这题用 C/Java 来刷。
:::

::: details 删除无序数组中的重复项: set
请完成下面的函数，实现去重的功能。思路是把 arr 转成 set，然后再转回 arr。

```javascript
function solution(arr) {
    return Array.from(new Set(arr));
}
```
:::

::: details lc-1-最优解 两数之和: hash-table
[练习地址](https://leetcode-cn.com/problems/two-sum/)

<<< @/../leetcode/lc-1-best.py
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

## 基本数据结构

### 栈
::: details lc-20 有效的括号
[练习地址](https://leetcode-cn.com/problems/valid-parentheses/)

```python
```
:::

## 外部系统
### 命令行输入、输出、错误流
### 环境变量
### 系统调用
### 文件 I/O
### 网络 I/O
