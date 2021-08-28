# 难题
[410. 分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)，由于两个条件：数组元素非负、连续子数组，所以具有贪心性质，可以配合二分法解决。

875 比 410 简单很多，不需要判断题目具有贪心性质。

[1402. 做菜顺序](https://leetcode-cn.com/problems/reducing-dishes/) 这题可以按照「任意顺序」安排做菜所以可以用贪心，并不是难题。把任意顺序的条件去掉，就变成 DP 了。

[765. 情侣牵手](https://leetcode-cn.com/problems/couples-holding-hands/) 这题不管两个椅子的距离有多远，交换位置的代价都是固定的。否则如果换位的代价取决于椅子距离远近，题目会更难。
