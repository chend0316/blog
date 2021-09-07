# 算法

textbook
1. 《Algorithm Design》建议读英文版
2. 《算法导论》

教程推荐学堂在线的「算法设计与分析」，这门课
- 思路十分清晰
- 没有半句废话，视频很快就可以看完
- 和《Algorithm Design》内容一致，配合使用效果绝佳

## 时间复杂度
[big O cheat sheet](https://www.bigocheatsheet.com/)

## Graphs

图是由 node (节点) 和 edge (边) 组成的集合，一般记作 G=(V,E)。
- V = nodes
- E = edges
- 一般用 n 表示节点个数，m 表示边的个数，即: $n=|V|, m=|E|$

图的表示: Adjacency Matrix (邻接矩阵)、Adjancency List (邻接表)。一般而言前者适合稠密图，后者适合稀疏图。

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
