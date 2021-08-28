# 数据结构

链表题本身不难，但在代码实现上细节很容易出错，一定要刻意练习。

栈、队列、堆都是非常常用的数据结构，要熟练使用各语言内置的库。堆还分为大顶堆、小顶堆、自定义元素类型堆。

Trie 和并查集都是新型数据结构，各语言没有内置，需要自己实现。并查集有 rank、路径压缩两种优化办法，路径压缩不需要引入额外的数组，比较常用。

## 习题
### 链表

- [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
- [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)，难题。有递归、非递归解法。如果最后一组数量小于 K 个，则不能翻转，对此可以先计算链表总长度然后决定是否翻转最后一组，也可以翻转最后一组后再翻转回去。由于链表题本来就是为了锻炼编码能力，这几种方法都需要练习。也不要灰心，因为本题是链表操作题中最难的题。
- [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
- 检测环
- 找倒数第 N 个节点
- 求链表中间节点

### 堆（优先级队列）

- [703. 数据流中的第K大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)，
- [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)，这题除了用大顶堆，还有一个线性时间的算法；

### 栈、队列

- [844. 比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)
- [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)
- [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
- 表达式求值

### 树

- [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

#### 二叉树遍历

[先序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)由于是尾递归，所以很容易改成迭代。
[中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)改迭代比较难，主要方法有颜色标记法、左臂下探法。
[后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)改迭代更难，我没研究。

二叉树遍历改迭代感觉没啥意义，有精力还不如先练其它题目。

#### 二叉搜索树
二叉搜索树有非常强的递归性质，做这类题更多的是练习递归思维，也是很有意义的。 

- [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

搜索树和链表相互转换的题目，这类题目要求对递归、链表有扎实基础，刚开始做会有点难，但非常有训练意义：
- [897. 递增顺序查找树](https://leetcode-cn.com/problems/increasing-order-search-tree/)、[面试题 17.12. BiNode](https://leetcode-cn.com/problems/binode-lcci/)，这两题完全一样

### Trie

- [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)，用来背代码模板
- [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)，Trie、矩阵搜索有机结合，虽然这题可以不用 Trie
- [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)，Trie + 剪枝

### 并查集

- [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
- [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)

### 哈希表

- [30. 串联所有单词的子串](https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/)，这题是难题，中译版少了输入规模的限制，建议阅读英文版题目描述，可以发现规模是 10^4，所以 O(N^2) 算法也是可行的
- [剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)，有序哈希表

### 树状数组

- [1409. 查询带键的排列](https://leetcode-cn.com/problems/queries-on-a-permutation-with-key/)
