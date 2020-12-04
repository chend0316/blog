# 刷题日记

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
