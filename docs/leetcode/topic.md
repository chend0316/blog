# 专题总结
## 二叉树遍历
[先序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)由于是尾递归，所以很容易改成迭代。
[中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)改迭代比较难，主要方法有颜色标记法、左臂下探法。
[后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)改迭代更难。

二叉树遍历改迭代感觉没啥意义，有精力还不如先练其它题目。

## 层次遍历

传统的层次遍历不能将不同层的节点“分隔”开来，代码上可以用一个小技巧“分隔”。

层次遍历分隔不同层的小技巧见[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，这个技巧掌握后是非常实用的。

## 丑数

这题练习的重点在于：用堆解法后如何分析出时空复杂度？

## TopK问题

找TopK的方法如下。

- 最正统的方法是用堆
- 也可以用sort偷懒解决
- 甚至可以用快排的思想，适合练手帮助理解快排，实际意义不大，见[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)的题解

K是什么？

- K可以是整数，这最简单了，见[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)
- K可以是出现的频率，见[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)、[692. 前K个高频单词](https://leetcode-cn.com/problems/top-k-frequent-words/)，可以构造`(freq, num)`的复合结构进行堆排序，这就需要内置的堆支持传入比较器了（各个语言有各自的办法）

- K可以是其它东西，见[658. 找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/)、[973. 最接近原点的 K 个点](https://leetcode-cn.com/problems/k-closest-points-to-origin/)

### K是整数

又分为大顶堆、小顶堆来解决，可以直接用内置的堆/优先级队列。

像Python不支持大顶堆怎么办呢？

方法一：取负数把大顶堆问题变小顶堆问题（妙啊！开拓思维）

方法二：建立小顶堆后弹出N - K个元素，剩下K个就是了（妙啊！开拓思维）

方法三：谷歌搜「Python max heap」，其实Python也有办法支持大顶堆的

### K是自定义结构

对于系统不认识的类型，还想要调用系统自带的函数，API风格有：

- Python要传入key函数用于提取出可比较的key
- Java要传入Comparator用于比较两个元素的大小

Python代码示例：

```python
from heapq import nlargest
arr = [(1, 'aa'), (5, 'bb'), (2, 'cc')]
tmp = nlargest(2, arr, key=operator.itemgetter(0))
sorted_arr = [word for _, word in tmp]  # ['bb', 'cc']
```

Java代码示例：略。

对比来说，Python这种风格看起来很优雅，但适用面不广，比如[658. 找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/)这题Python用堆来做就很难提取出key。

## 二叉树最近公共祖先

注意[这题](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)节点只有left、right指针，没有parent指针。

题目特性：

- 根节点一定是解，但不是最优解
- 最优解存在且唯一
- 必须掌握左右孩子信息后才能对当前节点做出决策，因此要用后序遍历

### 后序遍历

采用后序遍历会先遇到最优解，后遇到次优解，所以找到第一个解就可以停下来了。递归（不像迭代）是停不下来的，因此我们要避免次优解覆盖最优解的可能。

递归程序避免覆盖最优解的几个技巧：

- 代码逻辑本身保证不会覆盖，见官方题解
- 用全局变量保存解，判断是否已经被赋值了
- 递归中子函数通过返回值告知父函数是否已经找到解，若找到，父函数直接返回子函数的解即可，是一种将最优解层层上报的感觉

```python
class Solution:
    def lowestCommonAncestor(self, root, p, q):
        if not root or root == p or root == q: return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if not left:
            return right
        elif not right:
            return left
        else:
            return root
```

### 存储父节点信息

对于动态类型语言（如Python），可以直接在原来的结构上增加parent字段。对于静态类型语言（如C++、Java）可以单独开一个Map记录节点和其父节点的映射。

代码，略。

## 最优连续子串

这些题共同的解题思路：先用for(end)for(start)双循环枚举，然后可以启发出单循环算法（本质是一种动态规划）。注意一般我们会自然而然地写出for(start)for(end)的双循环形式，但这种形式很难启发出单循环算法。

单循环算法是在外层循环中提炼出足够多的“先验知识”，从而无需执行内层循环。“先验知识”可能是简单的number，也可能是复杂的数组、集合等等。

力扣题目（由易到难）：53、152、560、1371、32

### [力扣53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

### 力扣152. 乘积最大子数组

### 力扣560. 和为K的子数组

这题不是找最优子串，而是找出子串的数量，但思路是一样的，所以也归类在这边。
这题的“先验知识”比较复杂是：累和+字典计数。

### 力扣1371. 每个元音包含偶数次的最长子字符串

这题的“先验知识”用到了状态压缩的技巧，利用位运算将状态压缩到一个整数中。

### 力扣32. 最长有效括号
这题的“先验知识”是数组，而且每次遍历都需要对“先验知识”进行“统筹优化”，因此比较难。

## 二分法查找

二分法看似很简单，但实现上是有很多坑的，而且常集成在其它算法中，必须当作喝水一样熟练掌握。
在分类上，分为：精确查找、模糊查找、左开右闭、左闭右开。

### 力扣278. 第一个错误的版本

非常典型，同时涵盖了左闭右闭、左开右闭、左闭右开这3种情况。

### 力扣367. 有效的完全平方数

## 滑动窗口
滑动窗口和双指针一样，都是对暴力算法的优化，少枚举了很多区间。它在迭代的过程中维护L、R两个指针，每次迭代只会移动L或者R。

什么样的问题可以用滑动窗口来解决？

- 新问题可在原问题的基础上“增量”计算得到
- 可以根据当前问题的状态判断下一问题是移动L指针还是R指针（决策单调性）

为什么滑动窗口算法是正确的？对理论感兴趣的同学可以查阅「决策单调性」相关的资料。

### LeetCode 3. 无重复字符的最长子串
### LeetCode 76. 最小覆盖子串
### LeetCode 209. 长度最小的子数组
注意循环终止条件的设定，过早终止循环会漏解。
注意窗口区间语义约定，左闭右开or左闭右闭？虽然左闭右开有良好的语义（两数相减刚好为窗口长度），但左闭右开需要不断判断右边界是否越界常数时间更大。

### LeetCode 424. 替换后的最长重复字符
### LeetCode 438. 找到字符串中所有字母异位词
### LeetCode 567. 字符串的排列

## 分治法
### 84. 柱状图中最大的矩形
这题可以用分治法，但有更好的O(N)算法
