# 编程

## 编程基础

### Hello World
编译型：C

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
### 程序控制流：顺序、分支、循环

::: details lc-1 暴力: array, for-loop
[练习地址](https://leetcode-cn.com/problems/two-sum/)

```python
class Solution:
    def twoSum(self, nums, target):
        for i in range(0, len(nums)):
            for j in range(i, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
```
:::

lc-9: while-loop, floor-division

lc-70 暴力: fibonacci, recursion
lc-70 记忆化: dynamic-array, loop

### 数组、字符串、哈希表
- 数组
- 字符串、正则
- 哈希表

::: details lc-1 最优解法: hash-table
[练习地址](https://leetcode-cn.com/problems/two-sum/)

```python
class Solution:
    def twoSum(self, nums, target):
        hash = {}
        for i in range(len(nums)):
            need = target - nums[i]
            if need in hash:
                return [i, hash[need]]
            hash[nums[i]] = i
```
:::

### 数据编码：整数、浮点数、字符串

### 指针、链表

### 程序控制流：异常处理

## 编程模式

### 事件循环、事件驱动

### 异步回调

## 数据结构 & 算法

## 外部系统
### 命令行输入、输出、错误流
### 环境变量
### 系统调用
### 文件 I/O
### 网络 I/O
