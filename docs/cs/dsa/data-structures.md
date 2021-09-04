# 数据结构

## 线性结构: 队列、栈、链表
- 队列 (Queue)
- 栈 (Stack)
- 链表 (List)

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

::: details lc-206 反转链表
[练习地址](https://leetcode-cn.com/problems/reverse-linked-list/)
:::

## 哈希表
哈希表 (Hash Table)
  - 英文语境也会叫做: map、dict、kv-pair
  - 中文语境也会叫做: 映射、字典、键值对

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

当需要删除元素的时候，开放寻址法不能直接删除元素，而是要做特殊处理 (标记为已删除，而不是真正删除元素)。

### 扩容
当装载因子接近 1 的时候，开放寻址法速度降低。当装载因子远大于 1 时，拉链法会退化成为链表。扩容可以降低装载因子，但扩容后大量数据需要移动，这会导致分布式缓存场景下大量节点出现缓存击穿，[一致性哈希](https://en.wikipedia.org/wiki/Consistent_hashing)算法可以缓解这个问题。

### 编程语言内置的哈希表
[java.util.Map](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html) 是 Java 内置的一个接口，最常见的实现是：`HashMap`、`TreeMap`。在 Java 中，每个对象都有 hashCode() 方法。

JavaScript 的对象本身就可以当做哈希表使用：`var hash = {};`，ES6 新增了一个专门做哈希表的类：`var hash = new Map();`

Python 的 `dict` 就是哈希表。
- 初始化: `hash = dict()`
- 使用字面量初始化: `hash = {}`
- 添加元素: `hash['a'] = 123`
- 删除元素: `del hash['a']`
- 判断 key 是否存在: `'a' in hash`
- 获取哈希表的大小: `len(hash)`

## 半线性结构: 二叉树
二叉树一般用链式存储法来存储，每个节点有 left、right 两个指针。完全二叉树可以用顺序存储法来存储，常用于二叉堆的场景。

### 二叉搜索树
在讨论二叉搜索树时，通常是指没有重复节点的情况。删除节点操作中，如果待删节点有两个子节点就会比较复杂。还有一种取巧的删除方法，就是将节点标记为已删除，而不是真正去删除这个节点。

如果要支持重复数据的二叉搜索树。一种偷懒的方法是将每个节点换成链表。另一种更正经的方法不好描述，我这边先不写了。

### 平衡二叉搜索树

## 非线性结构: 图
