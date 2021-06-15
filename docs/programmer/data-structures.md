# 数据结构

## 哈希
应用场景：
- 加密
- 索引
- 缓存

解决哈希冲突:
- 开放寻址法: 线性探测法、二次探测法、再散列法
- 拉链法

哈希函数的实现:
- 工业界著名的: MD5、SHA、CRC
- 直接定址法
- 除留余数法，要选一个较大的素数作为除数
- 一致性哈希，可以避免扩容时产生大量数据搬移
- 如果自己设计哈希算法，原则就是要尽可能随机且均匀

当装载因子接近 1 的时候，开放寻址法速度降低。当装载因子远大于 1 时，拉链法会退化成为链表。扩容可以降低装载因子，扩容后数据的散列值都变了需要大面积移动数据，此时一些系统无法工作，一致性哈希算法可以缓解这个问题。

当需要删除元素的时候，开放寻址法不能直接删除元素，而是要做特殊处理 (例如放置一个删除的标记)。

### 语言内置的哈希表
哈希表常用操作：
- `set(k, v)`
- `get(k)`
- `delete(k)`
- `size()`
- 检查 key 是否存在
- `keys()` 获取所有 key
- `values()` 获取所有 value
- `entries()` 获取所有键值对

[java.util.Map](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html) 是 Java 内置的一个接口，最常见的实现是：`HashMap`、`TreeMap`。在 Java 中，每个对象都有 hashCode() 方法，自定义的数据类型可以根据业务特点重写 `Object.hashCode()` 方法。

JavaScript 的对象本身就可以当做哈希表使用：`var hash = {};`，ES6 新增了一个专门做哈希表的类：`var hash = new Map();`

Python 自带的 `dict` 就是哈希表。
- 初始化: `hash = dict()`
- 使用字面量初始化: `hash = {}`
- 添加元素: `hash['a'] = 123`
- 删除元素: `del hash['a']`
- 判断 key 是否存在: `'a' in hash`
- 获取哈希表的大小: `len(hash)`

### 练习题
利用内置的哈希表实现缓存：
- [力扣 1. 两数之和](https://leetcode-cn.com/problems/two-sum/)
