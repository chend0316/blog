# 算法

教材分先后顺序：
1. 《Algorithm Design》建议读英文版
2. 《算法导论》

## 时间复杂度
[big O cheat sheet](https://www.bigocheatsheet.com/)

## Network Flow
在 Graph 上进行贪心无法得到正确答案，但在 Residual Graph 上进行贪心可以，这就是 Ford-Fulkerson 算法的思想。

Ford-Fulkerson 是一个算法思想，因为它没有规定我们如何选择 Augmenting Path。所以人们开始研究如何选取 Augmenting Path 呢？人们发现了几种方法：
- 基本 Ford-Fulkerson 算法，会随便选一个 Augmenting Path
- 《算法导论》介绍了 Edmonds-Karp 算法，会优先选最短的 Augmenting Path
- 《Algorithm Design》介绍了基于 bottleneck 的一个算法

