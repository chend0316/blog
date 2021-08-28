# 技巧性算法 (练)

## 双指针法
按照使用频率排序：
- 从两端向中间
- 快慢指针
- 从中间向两端

[剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/) 这题给的数组是排好序的，采用「两端向中间」的双指针即可，算法正确性我还不知道如何证明。

[剑指 Offer 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/) 这题控制双指针间隔为k。

## 调整数组顺序

[剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

## 值也是下标

这些题取值范围刚好会落在数组长度内。

[剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/) 

## 双参递归

[101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/) 

## 数组计数

[696. 计数二进制子串](https://leetcode-cn.com/problems/count-binary-substrings/)
::: details 连续值计数技巧
```python
class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        res = 0
        cnts = []
        pre = '#'
        for c in s:
            if c == pre: cnts[-1] += 1
            else: cnts.append(1)
            pre = c
        for i in range(1, len(cnts)):
            res += min(cnts[i-1], cnts[i])
        return res
```
:::

## 其它

- [15. 三数之和](https://leetcode-cn.com/problems/3sum/submissions/)，这题考虑到最优复杂度比较大，所以可以先排序，然后是一道双指针的题目。这题虽然没用到高深的算法，但很难写，对算法基本功要求很高。
