# 正统算法 (练)
## 树和图的遍历
### DFS、BFS
DFS 和 BFS 的区别：

|            | DFS深度优先                      | BFS广度优先                    |
| ---------- | -------------------------------- | ------------------------------ |
| 时间复杂度 |                                  | 在最短路问题中有极大的优势     |
| 空间复杂度 | 取决于树的高度、图的最长环路长度 | 取决于树的“宽度”、图里面不好说 |
| 实现方式   | 一般是递归，很少用迭代，实现容易 | 迭代，实现难一点点             |

- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，除了用BFS竟然还能用DFS做
- [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
- [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)，看起来不像，但其实是DFS+剪枝
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)

###  BFS (层次遍历)

层次遍历的基础题见[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，有多种实现技巧。我了解的有两种，我给他们起名字为：队列计数法、新旧队列法。

::: details 102题「队列计数法」代码
```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = collections.deque()
        if root: queue.append(root)
        while queue:
            res.append([])
            n = len(queue)  # 技巧
            while n:  # 技巧
                n -= 1  # 技巧
                node = queue.popleft()
                res[-1].append(node.val)
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
        return res
```
:::

::: details 102题「新旧队列法」代码
```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = []
        if root: queue.append(root)
        while queue:
            res.append([])
            newQueue = []  # 技巧
            for node in queue:
                res[-1].append(node.val)
                if node.left: newQueue.append(node.left)  # 技巧
                if node.right: newQueue.append(node.right)  # 技巧
            queue = newQueue  # 技巧
        return res
```
:::

层次遍历是一个代码技巧，熟悉其思想可以写出其它变种。例如双向 BFS 就将层次遍历运用到了出神入化的地步，它是在「新旧队列法」的基础上使用哈希表来代替队列。

### 双向 BFS
[126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/)在国际站上有[一个绝妙的双向 BFS 解法](https://leetcode.com/problems/word-ladder-ii/discuss/40482/Python-simple-BFS-layer-by-layer)，代码如下。

::: details 126题双向DFS代码
```python
class Solution(object):
    def findLadders(self, beginWord, endWord, wordList):
        wordList = set(wordList)
        res = []
        layer = {}
        layer[beginWord] = [[beginWord]]

        while layer:
            newlayer = collections.defaultdict(list)  # 用哈希表而不是队列
            for w in layer:
                if w == endWord: 
                    res.extend(k for k in layer[w])
                else:
                    for i in range(len(w)):
                        for c in 'abcdefghijklmnopqrstuvwxyz':
                            neww = w[:i]+c+w[i+1:]
                            if neww in wordList:
                                newlayer[neww]+=[j+[neww] for j in layer[w]]

            wordList -= set(newlayer.keys())
            layer = newlayer  # 这是用「新旧队列」法实现的层次遍历，不过这里用哈希表取代队列

        return res
```
:::

### 暴力DFS
[543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)除了暴力 DFS 还有更好的解法。

[437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)有更好的解法，这里我们给出的是暴力 DFS 的代码：
::: details 437题暴力DFS代码
```java
public class Solution {
    public int pathSum(TreeNode root, int sum) {
        if (root == null) return 0;
        return pathSumFrom(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    }

    private int pathSumFrom(TreeNode node, int sum) {
        if (node == null) return 0;
        int ret = 0;
        if (node.val == sum) ret++;
        return ret + pathSumFrom(node.left, sum - node.val) + pathSumFrom(node.right, sum - node.val);
    }
}
```
:::

[1367. 二叉树中的列表](https://leetcode-cn.com/problems/linked-list-in-binary-tree/)也能用[DP来解](https://leetcode.com/problems/linked-list-in-binary-tree/discuss/524881/Python-Recursive-Solution-O(N)-Time)，这里我们给出的是暴力 DFS 的代码：

::: details 1367题暴力DFS代码
```python
def isSubPath(self, head, root):
    def dfs(head, root):
        if not head: return True
        if not root: return False
        if root.val != head.val: return False
        return dfs(head.next, root.left) or dfs(head.next, root.right)
    if not head: return True
    if not root: return False
    # 重点学习下面这行
    return dfs(head, root) or self.isSubPath(head, root.left) or self.isSubPath(head, root.right)
```
:::

## 剪枝、回溯

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

## DP

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

## TopK问题

找TopK的方法如下。

- 最正统的方法是用堆
- 也可以用sort偷懒解决
- 甚至可以用快排的思想，适合练手帮助理解快排，实际意义不大，见[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)的题解

K是什么？

- K可以是整数，这最简单了，见[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)
- K可以是出现的频率，见[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)、[692. 前K个高频单词](https://leetcode-cn.com/problems/top-k-frequent-words/)，可以构造`(freq, num)`的复合结构进行堆排序，这就需要内置的堆支持传入比较器了（各个语言有各自的办法）
- K可以是其它东西，见[658. 找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/)、[973. 最接近原点的 K 个点](https://leetcode-cn.com/problems/k-closest-points-to-origin/)

### 如果K是整数

又分为大顶堆、小顶堆来解决，可以直接用内置的堆/优先级队列。

像Python不支持大顶堆怎么办呢？

方法一：取负数把大顶堆问题变小顶堆问题（妙啊！开拓思维）

方法二：建立小顶堆后弹出N - K个元素，剩下K个就是了（妙啊！开拓思维）

方法三：谷歌搜「Python max heap」，其实Python也有办法支持大顶堆的

### 如果K是自定义结构

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

## 二分查找

千万不要小瞧二分查找，面试前重点准备，二分查找和链表都很容易丢分。二分查找有各种变形，以至于没有统一的二分模板。

为了后续介绍的统一，这里规定一些背景知识，高亮的部分都可能是二分算法的“变形点”：
- 代码变量命名为：lo、hi、mid，三个变量都是代表数组下标
- 在 \[lo, ..., hi\] 闭区间内搜索，这个区间统一叫做搜索区间
- 根据 `mid 信息`将搜索区间缩小为`左子区间`或`右子区间`
- 如果`搜索区间太小了`就退出循环
- `一定能找到目标吗`

最传统的二分代码模板如下，大家先对传统模板有个共识，熟悉了传统模板之后我们来讲二分的各种变种。
```python
def binSearch(nums, target):
    lo, hi = 0, N - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] < target: lo = mid + 1
        elif nums[mid] > target: hi = mid - 1
        else: return mid  # 找到了
    return -1  # 没找到
```

### 变形1：左右区间是否包含 mid 呢？
「不包含mid (经典)」如果左右子区间都不包含 mid，代码为：
- `mid = (lo + hi) // 2` 可以用下取整
- `mid = (lo + hi + 1) // 2` 也可以用上取整
- `lo = mid + 1`
- `hi = mid - 1`

「右包含mid (变种)」如果右子区间包含 mid，代码为：
- `mid = (lo + hi) // 2` 不可以用下取整，会死循环
- `mid = (lo + hi + 1) // 2` 可以用上取整
- `lo = mid`
- `hi = mid - 1`

「左包含mid (变种)」如果左子区间包含 mid，代码为：
- `mid = (lo + hi) // 2` 可以用下取整
- `mid = (lo + hi + 1) // 2` 不可以用上取整，会死循环
- `lo = mid + 1`
- `hi = mid`

「全包含mid (变种)」左右子区间都可能包含 mid，无解，一定会死循环。需要借助「变形2」的知识点避免死循环：
- `mid = (lo + hi) // 2` 不可以，会死循环
- `mid = (lo + hi + 1) // 2` 不可以，会死循环
- `lo = mid + 1`
- `hi = mid - 1`

为什么会死循环呢？下面代码演示的是「右包含mid」的一个错误例子，对应题目是[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)。如果 mid 采用下取整则可能和 lo 重合，反之采用上取整可能和 hi 重合。
```python
class Solution:
    def mySqrt(self, x: int) -> int:
        lo, hi = 0, x
        while lo < hi:  # 当 lo == 2 而且 hi == 3 的时候
            mid = (lo + hi) // 2  # mid 向下取整，mid == 2
            if mid * mid < x: lo = mid  # 这时候 lo 又回到 2！死循环！
            elif mid * mid > x: hi = mid - 1
            else: return mid
        return lo
```

「不包含mid」的题目有：[367. 有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)等等。
367题的代码如下。
```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num < 1: return False
        lo, hi = 1, num
        while lo <= hi:
            mid = (lo + hi) // 2
            if mid * mid < num: lo = mid + 1  # mid 打入冷宫
            elif mid * mid > num: hi = mid - 1  # mid 打入冷宫
            else: return True
        return False
```

「右包含mid」的题目有：[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)等等。
69题的代码如下：
```python
class Solution:
    def mySqrt(self, x: int) -> int:
        lo, hi = 0, x
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if mid * mid < x: lo = mid  # 再给 mid 一个机会吧！
            elif mid * mid > x: hi = mid - 1
            else: return mid
        return lo
```

「左包含mid」的题目有：[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)等等。
278题的代码如下：
```python
class Solution:
    def firstBadVersion(self, n):
        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if isBadVersion(mid): hi = mid  # 再给 mid 一个机会吧！
            else: lo = mid + 1
        return lo
```

### 变形2：搜索区间多小的时候退出循环呢？
有3种情况：
- `while lo <= hi`，区间「长度为0」的时候退出
- `while lo < hi`，区间「长度为1」的时候退出
- `while lo < hi - 1`，区间「长度为2」的时候退出

区间「长度为0」的代码，用于可能无解的题型，循环退出后就返回无解。这是最经典最简单的题型。todo：也找个例题吧？

区间「长度为1」的代码用于一定有解的题型，当区间长度为1的时候，解已经明确了，就可以停止循环了。
如果你不退出循环，轻则逻辑混乱，重则死循环，请看[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)的一个反面教材：
```python
# 这种题为啥会死循环
# 因为这题 while 内不能写 return 语句
class Solution:
    def firstBadVersion(self, n):
        lo, hi = 1, n
        while lo <= hi:  # 用 <= 会引起死循环，需要改为 <
            mid = (lo + hi) // 2
            if isBadVersion(mid): hi = mid
            else: lo = mid + 1
        return lo
```

区间「长度为2」的代码用于保证区间长度不小于3，避免「全包含mid」出现死循环。有没有这种题目呢？todo: 应该是有的，我找到了会贴在这边。

### 变形3：如何根据 mid 信息缩小搜索区间呢？
这种变形就很灵活了，需要具体题目具体分析，没有一个通用的模板。

二分查找变种：旋转排序数组。如果有重复元素，那么会难很多。
- [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)
- [81. 搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)
- [153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)
- [154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

二分查找变种：搜索二维矩阵。这题可以不用二分，把矩阵当成搜索树从右上角开始搜，代码会超级简单。但出于练习目的，建议用二分来刷。
- [74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/)，
- [240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)，二分不是这题的最优解

### 更多二分习题

[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)这题在二分的过程中不断更新答案：
```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        lo, hi = 0, len(nums) - 1
        first = -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if target > nums[mid]: lo = mid + 1
            elif target < nums[mid]: hi = mid - 1
            else:
                first = mid  #
                hi = mid - 1  #
        
        lo, hi = 0, len(nums) - 1
        last = -1
        while lo <= hi:
            mid = (lo + hi + 1) // 2
            if target > nums[mid]: lo = mid + 1
            elif target < nums[mid]: hi = mid - 1
            else:
                last = mid  #
                lo = mid + 1  #

        return [first, last]
```

## 贪心法
对于局部最优解能推导出全局最优解的问题，可以用贪心法。但这是一个非常强的条件，能用贪心法的题目非常少。

- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)，力扣上股票问题是一系列问题，这题的特殊性刚好能用贪心，否则通解是用DP
- [860. 柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/)
