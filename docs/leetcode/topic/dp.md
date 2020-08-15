# DP 专题

DP 初始状态有两种做法：数组空间多开一个、循环内单独判断。不同场合下代码简洁度不一样，例如[1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)在循环内单独判断就很挫。

::: details 1143 循环内单独判断
```python
class Solution:
    def longestCommonSubsequence(self, a: str, b: str) -> int:
        if not a or not b: return 0
        N, M = len(a), len(b)
        dp = [[0]*M for _ in range(N)]
        for i in range(N):
            for j in range(M):
                if i == 0 and j == 0: dp[i][j] = 1 if a[i] == b[j] else 0
                elif i == 0: dp[i][j] = 1 if a[i] == b[j] else dp[i][j-1]
                elif j == 0: dp[i][j] = 1 if a[i] == b[j] else dp[i-1][j]
                elif a[i] == b[j]: dp[i][j] = dp[i-1][j-1] + 1
                else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[N-1][M-1]
```
:::

::: details 1143 数组空间多开一个
```python
class Solution:
    def longestCommonSubsequence(self, a: str, b: str) -> int:
        if not a or not b: return 0
        n, m = len(a), len(b)
        dp = [[0]*(m+1) for _ in range(n+1)]
        for i in range(0, n):
            for j in range(0, m):
                if a[i] == b[j]: dp[i + 1][j + 1] = dp[i][j] + 1
                else: dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1])
        return dp[n][m]
```
:::

## 更多习题

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
