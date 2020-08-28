# DP 专题

DP 状态空间一般是一维数组、二维数组、三维数组。一般需要冗余空间，冗余的空间代表初始状态。可以在循环外填写初始状态，也可以在循环内填写初始状态。

不管是哪种方法，它们都是要填写第一行和第一列。
```
x x x x x x
x o o o o o
x o o o o o
x o o o o o
```

以[1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)为例，介绍两种填写初始状态的方法。

::: details 1143 循环外填写初始状态
```python
class Solution:
    def longestCommonSubsequence(self, a: str, b: str) -> int:
        if not a or not b: return 0
        n, m = len(a), len(b)
        dp = [[None]*(m+1) for _ in range(n+1)]
        for i in range(0, n+1): dp[i][0] = 0
        for j in range(0, m+1): dp[0][j] = 0
        for i in range(1, n+1):
            for j in range(1, m+1):
                if a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1] + 1
                else: dp[i][j] = max(dp[i][j-1], dp[i-1][j])
        return dp[n][m]
```
:::

::: details 1143 循环内填写初始状态
```python
class Solution:
    def longestCommonSubsequence(self, a: str, b: str) -> int:
        if not a or not b: return 0
        n, m = len(a), len(b)
        dp = [[None]*(m+1) for _ in range(n+1)]
        for i in range(0, n + 1):
            for j in range(0, m + 1):
                if i == 0 or j == 0: dp[i][j] = 0
                elif a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1] + 1
                else: dp[i][j] = max(dp[i][j-1], dp[i-1][j])
        return dp[n][m]
```
:::

有的题可以不需要冗余空间，但通常会导致代码很挫，还是以 1143 题为例。

::: details 1143 不开辟冗余空间
```python
class Solution:
    def longestCommonSubsequence(self, a: str, b: str) -> int:
        if not a or not b: return 0
        n, m = len(a), len(b)
        dp = [[0]*m for _ in range(n)]
        for i in range(n):
            for j in range(m):
                if i == 0 and j == 0: dp[i][j] = 1 if a[i] == b[j] else 0
                elif i == 0: dp[i][j] = 1 if a[i] == b[j] else dp[i][j-1]
                elif j == 0: dp[i][j] = 1 if a[i] == b[j] else dp[i-1][j]
                elif a[i] == b[j]: dp[i][j] = dp[i-1][j-1] + 1
                else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[n-1][m-1]
```
:::

Python 的下标可以为 `-1`，这就让 DP 的代码变得很优雅，DP 下标就不会错位了，我们以[115. 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)为例。

::: details 115 循环外初始化
```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        dp = [[0]*(m+1) for _ in range(n+1)]
        for j in range(-1, m): dp[-1][j] = 0
        for i in range(-1, n): dp[i][-1] = 1
        for i in range(n):
            for j in range(m):
                # s[i] t[j] dp[i][j] 不会错位
                if s[i] == t[j]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
                else: dp[i][j] = dp[i-1][j]
        return dp[n-1][m-1]
```
:::

::: details 115 循环内初始化
```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        dp = [[0]*(m+1) for _ in range(n+1)]
        for i in range(-1, n):
            for j in range(-1, m):
                if j == -1: dp[i][j] = 1
                elif i == -1: dp[i][j] = 0
                # s[i] t[j] dp[i][j] 不会错位
                elif s[i] == t[j]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
                else: dp[i][j] = dp[i-1][j]
        return dp[n-1][m-1]
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
