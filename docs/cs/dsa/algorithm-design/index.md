# 算法

教材分先后顺序：
1. 《Algorithm Design》建议读英文版
2. 《算法导论》

## 时间复杂度
[big O cheat sheet](https://www.bigocheatsheet.com/)

## Network Flow
在 Graph 上进行贪心无法得到正确答案，但在 Residual Graph 上进行贪心可以，这就是 Ford-Fulkerson 算法的思想。

[Ford–Fulkerson 算法](https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm) 没有规定寻找 augmenting path 的具体方法，所以只是一个算法思想。选取 augmenting path 的方法有很多：
- Ford–Fulkerson 算法，随便选一个 augmenting path
- Edmonds-Karp 算法，EK 算法用 BFS 优先选一条最短的 augmenting path
- 《Algorithm Design》介绍了一种约束 bottleneck 的算法
- Dinic 算法
- MPM 算法

More Topics
- 二分图匹配问题
- 最小费用流
