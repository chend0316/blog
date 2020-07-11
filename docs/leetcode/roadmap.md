# 刷题路线和指南
注意算法学习光看、光听是远远不够的。一定要花大量时间动手去练，练完之后还需要：
- 能够用笔在纸上手写
- 能够跟别人讲清楚自己的思路

许多人认为面试要求手写代码都是在耍流氓，这是一个非常大的误区。

这里列出的题目全是经典题，每一道都要反复刷。

## 算法知识点介绍

搜索分为DFS、BFS，这两个算法都是有模板的，一定要把模板背下来。DFS最自然的是用递归实现，DFS改为迭代实现的意义并不大，BFS天生就是迭代实现的。在实现上，DFS会借助递归实现，BFS会借助队列实现。

DFS需要开辟一个集合`visited = set()`记录访问过的节点，也可以将节点修改为特殊值表示访问过，BFS天生就没有重复访问的问题。

DFS每轮遍历都可以知道节点的层次信息，只需要将`level`作为递归参数传入。BFS算法经过改造也可以知道层次信息，见[力扣102](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)。

对于搜索问题，使用DFS是一种暴力算法，而剪枝是一种暴力优化。剪枝概念和代码模板都很简单，但剪枝的方法需要具体问题具体设计，深蓝下国际象棋就是将剪枝发挥到了极致。例如「N皇后问题」中，不同的剪枝策略在效率、代码优雅方面差别极大，好的剪枝策略很难被想出来。再比如「单词搜索」就需要借助Trie数据结构进行剪枝。剪枝算法的时间复杂度通常难以分析。

DP算法的代码模板固定，模板一定要背下来。解题分两步：定义状态空间、定义状态转移方程。只要状态空间定义的好，题目基本上就解决了一半。但状态空间往往不是那么容易想到。

二分查找法看似简单，但正确写出二分查找法是很不容易的。往往结合在各种问题中，如果基础不扎实，很容易写出死循环并阻碍解题思路。二分法虽然有模板，但不是很好用，因为二分法的模板不止一个，需要具体问题具体套用。有的题目要找具体的值，有的要[找模糊值](https://leetcode-cn.com/problems/sqrtx/)，有的要找2个值（求中位数），有的要找[命中的最左边的元素](https://leetcode-cn.com/problems/first-bad-version/)，也有[很难的综合题](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)。

## 经典题
### 链表
链表的题算法思路都比较简单，但代码实现上细节很容易出错，对代码功力的要求比较高。如果不能顺利写出来，一定要刻意练习，直到自己能在白板上手写。

- [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
- [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

### 栈、队列
栈和队列的题都很简单，只要掌握各个语言内置的栈、队列即可。

- [844. 比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)
- [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)
- [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

### 堆（优先级队列）
堆分为大顶堆、小顶堆，需要掌握各编程语言内置的堆。此外要小心Python只支持小顶堆不支持大顶堆。

- [703. 数据流中的第K大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)，
- [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)，这题除了用大顶堆，还有一个线性时间的算法；

### 树

- [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

### 贪心法
对于局部最优解能推导出全局最优解的问题，可以用贪心法。但这是一个非常强的条件，能用贪心法的题目非常少。

- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)，力扣上股票问题是一系列问题，这题的特殊性刚好能用贪心，否则通解是用DP

### DFS、BFS

- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，非常经典的面试题，除了用BFS竟然还能用DFS做
- [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
- [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)，看起来不像，但其实是DFS+剪枝
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)

### 剪枝、回溯

剪枝分为两种：
- 根据局部状态能确定答案就在某个分支，而剪去其它分支
- 根据局部状态只能确定答案最有可能在某个分支，优先遍历这个分支

题目：
- [51. N皇后](https://leetcode-cn.com/problems/n-queens/)，判断是否要剪枝的逻辑可以遍历棋盘判断，或通过行列的和/差判断
- [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/)
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)
- [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)
- [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)，利用Trie高效剪枝

### Trie
Trie是一种新型数据结构：
- 多数教材中都没有提到
- 各个编程语言中也没有内置Trie

由于Trie非常实用而且实现并不难，所以必须熟练到能在白板上手写这个数据结构。

- [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)
- [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)，官方题解中有基于Python字典迭代构造Trie的算法，然后用`$`字符表示单词末尾

### DP

- [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
- [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)
- [152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)
- [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)
- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)
- [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)
- [300. 最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
- [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)
- [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

### 并查集

经典并查集的实现不难，需要熟练到能在白板上手写。
同二叉树很像，并查集的深度决定其优劣，所以并查集有2种优化办法：rank优化、路径压缩。

- [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
- [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)

### 其它

- [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)，
- [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
- [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)
- [15. 三数之和](https://leetcode-cn.com/problems/3sum/submissions/)，这题考虑到最优复杂度比较大，所以可以先排序，然后是一道双指针的题目。
