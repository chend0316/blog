# DP 专题

## 解题核心三要素
明确一道题要用 DP 解决之后，代码实现还需要三个关键点：
1. 定义「状态空间」，需要花费大量的脑力
2. 定义「状态转移方程」，需要花费少量脑力，第1步完成后这一步通常可以顺利写出
3. 初始化「base case」，需要花费少量脑力，第2步完成之后这一步通常可以顺利写出

### 状态空间
标准的状态空间一般是一维数组、二维数组、三维数组，但也可能是其它结构。

一般需要冗余空间表示「base case」。以二维数组为例，我们用第一行和第一列来存放 base case。
```
x x x x x x
x o o o o o
x o o o o o
x o o o o o
```

不同题的状态空间定义不一样，这就需要有大量的刷题经验，有时还要一些灵感。所以只能靠大家多练，这里没有太多东西可以介绍。

### base case 初始化
可以在循环外初始化 base case，也可以在循环内初始化 base case。

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

### 状态转移方程
这其实很像数学归纳法。这里总结了多种形式的状态转移方程：
- `DP[i - 1] -> DP[i]` 根据上一个状态推导当前状态
- `DP[i - 1], DP[i - 2] -> DP[i]` 根据上两个状态推导当前状态
- `DP[0...i - 1] -> DP[i]` 根据历史状态推导当前状态
- `DP[i] -> DP[i...N]` 根据当前状态推导未来状态

[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)可以根据历史推当前，也可以根据当前推未来。

::: details 322 根据历史推当前
```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        n = amount
        dp = [math.inf]*(n+1)
        dp[0] = 0
        for i in range(1, n+1):
            for coin in coins:
                if i - coin >= 0:
                    dp[i] = min(dp[i], dp[i-coin] + 1)
        return dp[n] if dp[n] != math.inf else -1
```
:::

::: details 322 根据当前推未来
```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        n = amount
        dp = [math.inf]*(n+1)
        dp[0] = 0
        for i in range(n+1):
            for coin in coins:
                if i + coin <= n:
                    dp[i+coin] = min(dp[i+coin], dp[i] + 1)
        return dp[n] if dp[n] != math.inf else -1
```
:::

## 代码技巧
### 真的需要冗余空间吗
有的题可以不需要冗余空间，但通常会导致代码很挫，以 1143 题为例。

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

### Python DP 下标技巧
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

- [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)
- [152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)
- [300. 最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

爬楼梯、硬币兑换系列：
- [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)，最简单的 DP 问题
- [746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)
- [面试题 08.01. 三步问题](https://leetcode-cn.com/problems/three-steps-problem-lcci/)
- [403. 青蛙过河](https://leetcode-cn.com/problems/frog-jump/)，这题状态空间不是数组，转移方程也不是标准 DP，所以这是道难题
- 变形：可跨越步数由数组传入
- 变形：三步问题 + 相邻步数不能相同
- 变形：可跨越步数由数组传入 + 相邻步数不能相同

股票买卖系列，这个系列都是很规整的 DP：
- [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)
- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)
- [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

字符串相关，这个系列的 DP 很不规整，导致题目很难做需要灵感：
- [91. 解码方法](https://leetcode-cn.com/problems/decode-ways/)
- [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)
- [115. 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)

正则系列：
- [44. 通配符匹配](https://leetcode-cn.com/problems/wildcard-matching/)
- [10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)

回文串系列：
- [647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)
