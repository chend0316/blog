# 算法 (Algorithm) 入门
## 时间复杂度
[big O cheat sheet](https://www.bigocheatsheet.com/)

## 循环
知识点:
- 从头到尾循环
- 从尾到头循环
- 从中间向两边循环
- 从两边向中间循环
- 多重循环优化，通常是考虑省去内层循环，在外层循环的时候“记忆”必要信息

::: details lc-1 两数之和: for-loop, nested-loop
[练习地址](https://leetcode-cn.com/problems/two-sum/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

输入是一维数组，使用暴力法找两个不同下标，难点：
- 二重循环
- 需要暴力枚举出所有下标组合情况，而非排列情况
- 因为是组合而非排列，所以要想清楚内层循环的控制变量从多少开始
- 为了优化多重循环，我们想办法删掉内层循环

<<< @/../leetcode/lc-1-force.py

<<< @/../leetcode/lc-1.py
:::

::: details 两数之差
[力扣原题](https://leetcode-cn.com/problems/two-sum/)的改造，将原题两数之和改为两数之差即可。

使用暴力法找两个不同下标，改造点在于：
- 原题使用暴力找两个下标的组合
- 改后使用暴力找两个下标的排列

```python
def solution(nums, target):
    for i in range(0, len(nums)):
        for j in range(0, len(nums)):
            if i == j: continue
            if nums[i] + nums[j] == target:
                return [i, j]
```
:::

::: details lc-5 最长回文子串
[练习地址](https://leetcode-cn.com/problems/longest-palindromic-substring/)

输入是字符串，即一维数组。这题需要从中间向两边遍历。

<<< @/../leetcode/lc-5.py
:::

::: details lc-11 盛最多水的容器
[练习地址](https://leetcode-cn.com/problems/container-with-most-water/)

输入是一维数组。这题需要从中间向两边遍历。难点：
- 循环迭代的动作二选一: i++、j--
- 需要在循环体内决定选哪个动作

<<< @/../leetcode/lc-11.java

<<< @/../leetcode/lc-11.js

<<< @/../leetcode/lc-11.py
:::

::: details lc-42 接雨水
[练习地址](https://leetcode-cn.com/problems/trapping-rain-water/)

暴力做法，考虑每一根柱子能接的雨水量，外层循环遍历所有柱子，内层需要两个循环（一个向左、一个向右）。
- 二重循环，内层有 2 个循环
- 多重循环优化: 将内层循环移出去，形成 3 个并列的循环

<<< @/../leetcode/lc-42.java
:::

::: details lc-14 最长公共前缀: two-dimensional-arrays
[练习地址](https://leetcode-cn.com/problems/longest-common-prefix/)，这题比较烦。

题目给的是字符串数组，因为字符串本身也是数组，所以这题是一个二维数组，需要用二重循环来处理。难点在于：
- 外层循环遍历数组的第二个维度、内层循环遍历数组的第一个维度，和以往相反
- 外层循环退出的时机由循环体内运行结果决定
- break 退出的条件
- 这题需要纵向遍历二维数组

<<< @/../leetcode/lc-14.py
:::

::: details lc-15 三数之和: for-loop, nested-loop
[练习地址](https://leetcode-cn.com/problems/3sum)，这题很难。

先给数组排序，然后使用找三个不同下标，难点：
- 二重循环
- 内层循环顺序: 从两边向中间遍历
- 结果去重的方法有点超纲，比较难

:::

## 递归

::: details lc-100 相同的树
<<< @/../leetcode/lc-100.java
:::

::: details lc-98 验证二叉搜索树
<<< @/../leetcode/lc-98.java
:::

::: details lc-70-暴力: fibonacci, recursion
<<< @/../leetcode/lc-70-force.py
:::

::: details lc-70-记忆化: dynamic-array, loop
<<< @/../leetcode/lc-70-memorize.py
:::

## 数据结构: 树
树的算法题都是递归来做。

::: details lc-226 翻转二叉树
[练习地址](https://leetcode-cn.com/problems/invert-binary-tree/)
:::

## 数组操作
- 数组 (Array)

::: details lc-27 移除元素: array
[练习地址](https://leetcode-cn.com/problems/remove-element/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

数组的题，这题用 C/Java 来刷。需要删除匹配的元素，逆向思维就是要保留不匹配的元素。

<<< @/../leetcode/lc-27.c
:::

::: details lc-26 删除有序数组中的重复项: array
[练习地址](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)，[在线视频](https://www.bilibili.com/video/BV1Ty4y1L7qP)

数组的题，这题用 C/Java 来刷。逆向思维就是要保留不重复的元素。

<<< @/../leetcode/lc-26.c
:::

::: details 删除无序数组中的重复项: set
请完成下面的函数，实现去重的功能。思路是把 arr 转成 set，然后再转回 arr。

```javascript
function solution(arr) {
    return Array.from(new Set(arr));
}
```
:::

## 指针、链表
::: details lc-21 合并两个有序链表
[练习地址](https://leetcode-cn.com/problems/merge-two-sorted-lists)
:::

::: details lc-206 反转链表
[练习地址](https://leetcode-cn.com/problems/reverse-linked-list/)
:::
