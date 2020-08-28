# TopK 专题

找TopK的方法如下。

- 最正统的方法是用堆
- 也可以用sort偷懒解决
- 甚至可以用快排的思想，适合练手帮助理解快排，实际意义不大，见[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)的题解

K是什么？

- K可以是整数，这最简单了，见[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)
- K可以是出现的频率，见[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)、[692. 前K个高频单词](https://leetcode-cn.com/problems/top-k-frequent-words/)，可以构造`(freq, num)`的复合结构进行堆排序，这就需要内置的堆支持传入比较器了（各个语言有各自的办法）
- K可以是其它东西，见[658. 找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/)、[973. 最接近原点的 K 个点](https://leetcode-cn.com/problems/k-closest-points-to-origin/)

## 如果K是整数

又分为大顶堆、小顶堆来解决，可以直接用内置的堆/优先级队列。

像Python不支持大顶堆怎么办呢？

方法一：取负数把大顶堆问题变小顶堆问题（妙啊！开拓思维）

方法二：建立小顶堆后弹出N - K个元素，剩下K个就是了（妙啊！开拓思维）

## 如果K是自定义结构

对于系统不认识的类型，还想要调用系统自带的函数，API风格有：

- Python要传入key函数用于提取出可比较的key
- Java要传入Comparator用于比较两个元素的大小
- Python 的 Tuple 可以排序，所以还可以用 Tuple 包裹自定结构，把 Rank 值放在 Tuple 的第一个元素

Python代码示例：

```python
from heapq import nlargest
arr = [(1, 'aa'), (5, 'bb'), (2, 'cc')]
tmp = nlargest(2, arr, key=operator.itemgetter(0))
sorted_arr = [word for _, word in tmp]  # ['bb', 'cc']
```

Java代码示例：略。

对比来说，Python这种风格看起来很优雅，但适用面不广，比如[658. 找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/)这题Python用堆来做就很难提取出key。
