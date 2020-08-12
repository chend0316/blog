# 数据结构 (练)

## 链表
链表的题算法思路都比较简单，但代码实现上细节很容易出错，对代码功力的要求比较高。如果不能顺利写出来，一定要刻意练习，直到自己能在白板上手写。

- [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
- [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

## 堆（优先级队列）
堆分为大顶堆、小顶堆，需要掌握各编程语言内置的堆。此外要小心Python只支持小顶堆不支持大顶堆。

- [703. 数据流中的第K大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)，
- [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)，这题除了用大顶堆，还有一个线性时间的算法；

## 栈、队列
栈和队列的题都很简单，只要掌握各个语言内置的栈、队列即可。

- [844. 比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)
- [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)
- [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

## 树

- [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

### 二叉树遍历
[先序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)由于是尾递归，所以很容易改成迭代。
[中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)改迭代比较难，主要方法有颜色标记法、左臂下探法。
[后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)改迭代更难，我没研究。

二叉树遍历改迭代感觉没啥意义，有精力还不如先练其它题目。

## Trie
Trie是一种新型数据结构：
- 多数教材中都没有提到
- 各个编程语言中也没有内置Trie

由于Trie非常实用而且实现并不难，所以必须熟练到能在白板上手写这个数据结构。

- [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)
- [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)，官方题解中有基于Python字典迭代构造Trie的算法，然后用`$`字符表示单词末尾

## 并查集
并查集也是一种新型数据结构，教材中很少提，各语言也没有内置。

经典并查集的实现不难，需要熟练到能在白板上手写。并查集的深度决定其优劣，所以并查集有2种优化办法：rank优化、路径压缩。

- [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
- [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)

## 有序哈希表
[剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)
