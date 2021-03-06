# 编程语言
## 代码的运行
### 程序的入口
C/C++/Java 程序的入口是 `main` 函数，函数的入参表示命令行参数，返回值表示程序退出码。

Golang 程序的入口是 `package main` 下面的 `main()` 函数，`main()` 函数没有入参和返回值。通过 `os.Args` 获取命令行参数，通过 `os.Exit()` 指定程序的返回值。

### 程序的退出
程序可以自己主动退出

在多线程环境下
- 一个线程可以被其它线程要求退出 (interrupt)
- 一个线程被其它线程强制退出

## 基本数据类型
### 基本类型
### 类型转换
#### 隐式类型转换、显式类型转换

#### 业务类型转换
- 整数和字符串之间，按照不同进制相互转换

#### 装箱、拆箱

### 数组 (Array)
大多编程语言的数组下标从 0 开始，Matlab、Lua 是从 1 开始的，Python 下标还能为负数。

数组字面量：C、C++ 用 `{1, 2, 3}` 表示数组，其它语言基本都用 `[1, 2, 3]`。

C、C++ 对数组越界不做检查，Java 会做检查。

除了 C 语言，其它语言都有容器类，除了封装数组基本操作以外还实现了动态扩容等策略。

## 复杂数据类型
### 时间

## 语言内置数据结构、算法
哈希表、有序哈希表
栈、队列、双端队列
排列组合
矩阵、矩阵运算

## 函数

## 程序控制流
### 顺序、分支、循环
### 异常处理

## 编码规范
### Golang
