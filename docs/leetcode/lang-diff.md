# 语言差异

## 运算

### 浮点除和整除

Python3中`1/2`答案是`0.5`，`1//2`答案是`0`。

Python2中`1/2`答案是`0`。

### 比较运算

在Python中`4 > 3 > 1`返回的是`True`，所以Python可以写出`0 <= i < N`的代码。

### 负数求模

考虑`-1 % 5`，不同语言的行为不一致，Python中结果是4，C++中结果是一个负数。

### 右移运算
左移运算低位一定会补0，但是右移运算高位补0还是补1是有差异的。

在算数右移中，无符号数高位补0、有符号数高位补1，这样右移1位就相当于除2的效果。

在逻辑右移中，最高位补0。

在C++中，对于无符号数采用逻辑右移、对于有符号数采用算数右移。如果要对有符号数使用逻辑右移，可以通过类型转换实现`(unsigned)a >> 1`。

在Java中没有无符号数的概念，所以一律采用算术右移。如果想用逻辑右移，则需要通过3个大于号来实现：`a >>> 1`。

Python没有逻辑右移的运算，遇到位运算的题目要注意。

## 数据类型

### 真值和假值

Python3中`not []`返回`True`。

## 数据结构

### 字典

字典有两种实现：Hash Map、Tree Map。

前者是用Hash表实现的，优点是O(1)时间复杂度。后者是用二叉搜索树实现的，优点是有序。

Python中只有hashmap：`m = {key: value}`

Java有`HashMap`和`TreeMap`两个类。

C++中有`std::unordered_map`和`std::map`两个类。

C#中有`Dictionary<TKey, TValue>`、`HashTable`、`StringDictionary`、`SortedDictionary`

### 集合

集合有两种实现：Hash Set、Tree Set。同字典。

Python中只有hashset：`m = {1, 2, 3}`

Java有`HashSet和`TreeSet`两个类。

C++中有`std::unordered_set`和`std::set`两个类。

C#中有`HashSet`和`SortedSet`两个类。