# 二分查找专题

千万不要小瞧二分查找，面试前重点准备，二分查找和链表都很容易丢分。二分查找有各种变形，以至于没有统一的二分模板。

## 基础
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

## 变形1：左右区间是否包含 mid 呢？
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
::: details 367题 Python
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
:::

「右包含mid」的题目有：[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)等等。
::: details 69题 Python
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
:::

「左包含mid」的题目有：[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)等等。
::: details 278题 Python
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
:::

## 变形2：搜索区间多小的时候退出循环呢？
有3种情况：
- `while lo <= hi`，区间「长度为0」的时候退出
- `while lo < hi`，区间「长度为1」的时候退出
- `while lo < hi - 1`，区间「长度为2」的时候退出

区间「长度为0」的代码，用于可能无解的题型，循环退出后就返回无解。这是最经典最简单的题型。todo：也找个例题吧？

区间「长度为1」的代码用于一定有解的题型，当区间长度为1的时候，解已经明确了，就可以停止循环了。
如果你不退出循环，轻则逻辑混乱，重则死循环，请看[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)的一个反面教材。
::: details 278题 反面教材
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
:::

区间「长度为2」的代码用于保证区间长度不小于3，避免「全包含mid」出现死循环。有没有这种题目呢？todo: 应该是有的，我找到了会贴在这边。

## 变形3：如何根据 mid 信息缩小搜索区间呢？
这种变形就很灵活了，需要具体题目具体分析，没有一个通用的模板。

## 例题
### [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
这题在二分的过程中不断更新答案：
::: details Python代码
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
:::

## 更多习题
二分查找变种：旋转排序数组。如果有重复元素，那么会难很多。
- [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)
- [81. 搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)
- [153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)
- [154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

二分查找变种：搜索二维矩阵。这题可以不用二分，把矩阵当成搜索树从右上角开始搜，代码会超级简单。但出于练习目的，建议用二分来刷。
- [74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/)，
- [240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)，二分不是这题的最优解
