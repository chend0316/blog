# 刷题日记

## [18. 四数之和](https://leetcode-cn.com/problems/4sum/)
```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        nums = sorted(nums)
        # print(nums)
        res = []
        i = 0
        while i < n - 3:
            j = i + 1
            while j < n - 2:
                k, h = j + 1, n - 1
                while k < h:
                    s = nums[i] + nums[j] + nums[k] + nums[h]
                    # print(i, j, k, h, s)
                    if s < target: k += 1
                    elif s > target: h -= 1
                    else:
                        res.append([nums[i], nums[j], nums[k], nums[h]])
                        k += 1
                        while k < n and nums[k] == nums[k-1]: k += 1
                        h -= 1
                        while h >= 0 and nums[h] == nums[h+1]: h -= 1
                j += 1
                while j < n and nums[j] == nums[j-1]: j += 1
            i += 1
            while i < n and nums[i] == nums[i-1]: i += 1
        return res
```

## [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)
```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1]*(n) for _ in range(m)]
        
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
        
        return dp[m-1][n-1]
```

## [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/description/)
```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n < 3: return n
        pre, cur = 1, 2
        for i in range(n - 2):
            pre, cur = cur, pre + cur
        return cur
```

## [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)
```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        res = cnt = 0
        for num in nums:
            if cnt == 0:
                res, cnt = num, 1
            elif res == num:
                cnt += 1
            else:
                cnt -= 1
        return res
```

## [303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)
```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.nums = nums
        self.sums = []  # nums[0,i) 的和
        s = 0
        for num in nums:
            self.sums.append(s)
            s += num
        self.sums.append(s)

    def sumRange(self, i: int, j: int) -> int:
        return self.sums[j+1] - self.sums[i]
```

## [746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

```python
# 746
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        preCost = curCost = 0
        for i in range(n):
            preCost, curCost = curCost, min(preCost, curCost) + cost[i]
        return min(preCost, curCost)
```
