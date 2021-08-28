# 编程语言

## 变量 (Variable)、数据类型 (Data Types)

基本类型 (Primary Data Types)，有的语言叫做值类型 (Value Types)。引用类型 (Reference Types)，有的语言叫做对象类型 (Object Types)。

阅读材料：
- [Java 的 8 种基本数据类型](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [JavaScript 基本数据类型](http://262.ecma-international.org/5.1/#sec-8)
- Python 实现了“一切皆对象”所以并没有 Primary Types 的概念

类型转换:
- 隐式类型转换
- 强制类型转换

剧透一下，在编译 (Compile) 的时候，我们会介绍:
- 变量作用域 (Scope)
- 变量生命周期 (Lifetime)
- Scope 和 Lifetime 一定相等吗？

## 字面量 (Literals)
问大家一个问题：读大学需要多久？
- 四年？
- 三秒？

自然语言有二义性，编程语言需要消除歧义。

```c
// 字符串字面量一定要引号包裹
int zhangsan = 1;
char *name = "zhangsan";

// 变量名不能用数字开头，否则编译器分不清: 是变量名？还是整数字面量？
char *1name = "zhang";
char *1e10 = "zhang";
char *1f = "zhang";
int a = 1e10;
float b = 1f;
```

```javascript
// JavaScript 中，对象字面量
const key = 'age', value = 18;
const obj = { key: value, [key]: value }
```

### 基本类型字面量
- Integral Literals
- Floating-Point Literals
- Char Literals
- String Literals
- Boolean Literals
- Null Literals

一些上层语言 (Python、JavaScript) 将 Char 和 String 统一了，所以没有 Char Literals。

少数上层语言 (JavaScript) 将 Integer 和 Float 统一为 Number，所以只有 Number Literals。

### 复杂类型字面量
数组的字面量多数语言都有:
- List/Array Literals

下面这几个字面量，上层语言会有，底层语言没有:
- Tuple Literals
- Dict/Map Literals
- Set Literals

### 阅读材料
英文阅读材料：
- [Java 中的字面量](https://www.geeksforgeeks.org/literals-in-java/)，这篇文章漏说了 Java 的 Null Literals
- [Python 中的字面量](https://www.geeksforgeeks.org/literals-in-python/)

## 表达式 (Expresion)
运算符一定是写在表达式里面的，因此所有运算符都会产生 value，务必搞清楚产生的 value type 是什么。

## 运算符 (Operator)

分类:
- 按照运算数分: 单目运算符 (unary operator), 双目运算符 (binary operator), 三目运算符 (ternary operator)
- 按照功能分: Arithmetic Operators, Relational Operators, Logical Operators, Bitwise Operators, Assignment Operators

### 优先级 (Precedence)、结合性 (Associativity)

英文阅读材料:
- [C++ 运算符优先级、结合性](https://docs.microsoft.com/en-us/cpp/cpp/cpp-built-in-operators-precedence-and-associativity)

### 赋值运算符 (Assignment Operators)

### 算术运算符 (Arithmetic Operators)
- 加减乘除、取余
- 整除: Python2、C/C++、Java
- 自然除: Python3、JavaScript

::: details 算法练习 lc-9: floor-division
[练习地址](https://leetcode-cn.com/problems/palindrome-number)，这题考察: 整除、取余。
:::

### 逻辑运算符 (Logical Operators)
- `&&` 和 `||` 的优先级需要背一下，经常用到
- Python 中采用关键字 (Keywords) 作为运算符，例如: `and`、`or`
- 布尔短路

布尔短路在不同语言表现差异很大，一些现代化语言都玩出花来了，重点讲解。

### 位运算符 (Bitwise Operators)
- 算术右移、逻辑右移

C++ 对于无符号数采用逻辑右移、有符号数采用算术右移。Java 语言没有无符号数，因此一律为算术右移，为了表示逻辑右移，Java 引入了一个 `>>>` 的运算符。

### 条件运算符
这是唯一一个三目运算符 (ternary operator)

## 语句 (Statement)
剧透一下：语句 (Statement) 和表达式 (Expression) 的区别是很重要的知识点，以后会讲

### 条件语句
- if 语句
- if-else 语句
- if-elseif-else 语句

### 循环语句
- while 语句
- for 语句

## 函数 (Function)
- 函数定义
- 函数调用

## 数组 (Array)
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

## 程序控制流：异常处理

## 字符串
- 字符串 (String) 的表示
- 常用方法: 字符串拼接 (strcat)、提取子串 (substr)、去除首尾空格 (trim)
- 正则
- Unicode
