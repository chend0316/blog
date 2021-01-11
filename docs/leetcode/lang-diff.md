# 语言差异 (坑)

## 运算

### 算术运算：浮点除和整除

Python3中`1/2`答案是`0.5`，`1//2`答案是`0`。

Python2中`1/2`答案是`0`。

### 算术运算：负数求模

考虑`-1 % 5`，不同语言的行为不一致，Python中结果是4，C++中结果是一个负数。


### 逻辑运算：比较运算

在Python中`4 > 3 > 1`返回的是`True`，所以Python可以写出`0 <= i < N`的代码。

### 位运算：算数右移和逻辑右移
算数右移高位补0或1，逻辑右移最高位补0。

C++对无符号数采用逻辑右移、对有符号数采用算数右移。

Java没有无符号数用于区分，所以用`a >> 1`表示算术右移、`a >>> 1`表示逻辑右移。

Python是无限范围的大数，所以没有逻辑右移。

### 赋值运算
我们希望将一个链表的元素移到另一个链表的末尾：`tail.next = p; tail = tail.next;`

【错误示范】很自然地使用 Python 的连续赋值：`tail = tail.next = p`

【正确示范】C/C++ 连续赋值：`tail = tail->next = p;`

这个差异的原因在于：
- Python 是赋值语句 (statements)
- C/C++ 是赋值表达式 (expressions)

## 数据类型

### 真值和假值

Python3将空数组当做假值，所以`not []`返回`True`。利用这点，可以很方便地判断入参。

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

Java有`HashSet`和`TreeSet`两个类。

C++中有`std::unordered_set`和`std::set`两个类。

C#中有`HashSet`和`SortedSet`两个类。
