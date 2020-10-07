# VirtualDOM
VirtualDOM 是由 React 发扬光大的，后来 Vue 2.x 也引入了并获得非常大的性能提升。

## VDOM Diff 算法
因为 DOM 操作是比较耗时的，所以VDOM 发生变化后，需要根据两棵 VDOM 树之间的差异来计算：如何用**最少的步骤**更新 DOM 节点。

React 将这个算法叫做 Diffing，Vue 将这个算法叫做 path。但这两个算法其实是一样的。

## React：O(N^3)到O(N)的优化
树的最小编辑距离（Tree Edit Distance）算法需要 O(N^3) 的时间复杂度，而[React官方文档](https://zh-hans.reactjs.org/docs/reconciliation.html)介绍了 React 如何根据 DOM 场景特点将该算法优化成 O(N) 的复杂度。具体来说 React 对DOM场景做了两个假设：
- React 希望类型相同的兄弟节点拥有 key 信息，这就要求业务配合传入 key。这样 Diffing 算法只需根据节点的 key 信息判断是否是同一个节点，不需要遍历子孙节点
- React 假设 DOM 节点更多的是同节点下移动，很少发生跨节点移动。有了这个假设，原本树的编辑距离问题就变成了数组的编辑距离问题

这两个假设，意味着 React 求的是该问题的次优解而不是最优解，这是一种权衡。

[王沛](https://github.com/supnate)做了一个[在线Demo](https://supnate.github.io/react-dom-diff/index.html)，可以在 console log 直观看到 React 在不同情况下节点创建（created）、销毁（unmount）的情况。

## Vue：数组的编辑距离问题求解
这个问题要求使用最少操作将旧数组变为新数组，可以进行的操作有：
- 创建节点
- 删除节点
- 移动节点

一般人可能就会遍历一遍旧节点用哈希表存起来，再遍历一遍新节点判断是否已经存在哈希表中。这样做的时间复杂度是没问题的，但是空间复杂度达到了 O(N)。

Vue 中实现的算法虽然最坏情况下也达到了 O(N) 的空间复杂度，但 Vue 针对 DOM 场景做了一些优化，让算法在大多情况下都能达到 O(1) 的空间复杂度。如果感兴趣可以阅读以下材料：
- [剖析 Vue.js 内部运行机制](https://juejin.im/book/5a36661851882538e2259c0f)
- Vue 源码中 `patch.js` 文件的 `updateChildren()` 函数
