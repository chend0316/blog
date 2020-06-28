
## 面试通关40讲
### 链表
- [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
- [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

### 栈、队列
- [844. 比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)
- [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues)
- [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

### 堆（优先级队列）

- [703. 数据流中的第K大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)，
- [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)，这题除了用大顶堆，还有一个线性时间的算法；

### 树

- [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

### 贪心法

- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)，力扣上股票问题是一系列问题，这题的特殊性刚好能用贪心，否则通解是用DP

### DFS、BFS

- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，经典面试题，除了用BFS竟然还能用DFS做

### 其它

- [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)，
- [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
- [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)

## 经典综合题

[15. 三数之和](https://leetcode-cn.com/problems/3sum/submissions/)，这题考虑到最优复杂度比较大，所以可以先排序，然后是一道双指针的题目。

## 参考代码

### 98

```java
public boolean isValid(TreeNode root, Integer min, Integer max) {
    if (root == null) return true;
    if (min != null && root.val <= min) return false;
    if (max != null && root.val >= max) return false;
    return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);
}
```

### 102

```python
# BFS实现
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = collections.deque()
        if root: queue.append(root)
        while len(queue) > 0:
            current_level = []
            for i in range(len(queue)):
                node = queue.popleft()
                current_level.append(node.val)
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
            res.append(current_level)
        return res

# DFS实现
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        self.res = []
        self._dfs(root, 0)
        return self.res

    def _dfs(self, node, level):
        if node is None: return
        if len(self.res) == level:
            self.res.append([])
        self.res[level].append(node.val)
        self._dfs(node.left, level + 1)
        self._dfs(node.right, level + 1)
```

### 169

```python
# 这个解法是O(N)时间、O(1)空间，视频中没介绍
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        res = 0
        cnt = 0
        for n in nums:
            if cnt == 0:
                res = n
                cnt = 1
            elif res == n:
                cnt += 1
            else:
                cnt -= 1
        return res
```

### 236

```python
def lowestCommonAncestor(root, p, q):
    if root is None: return None
    if root == q or root == p: return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left is None:
        return right
    elif right is None:
        return left
    else:
        return root
```

