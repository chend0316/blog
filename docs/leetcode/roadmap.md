# 刷题路线

[112. 路径总和](https://leetcode-cn.com/problems/path-sum/)，为了求解显然必须访问所有节点，至少需要 O(N) 的复杂度。
- 用递归来解决，是最佳答案
- 这题用 BFS 不是最好的解法，但对练习 BFS 非常有帮助

::: details 112题 递归
```python
class Solution:
    def hasPathSum(self, root: TreeNode, s: int) -> bool:
        if not root: return False
        if not root.left and not root.right and root.val == s: return True
        return self.hasPathSum(root.left, s - root.val) or self.hasPathSum(root.right, s - root.val)
```
:::

::: details 112题 BFS
```python
class Solution:
    def hasPathSum(self, root: TreeNode, s: int) -> bool:
        if not root: return False
        queue = { root: root.val }
        while queue:
            newQueue = {}
            for node in queue:
                if not node.left and not node.right and queue[node] == s: return True
                if node.left: newQueue[node.left] = queue[node] + node.left.val
                if node.right: newQueue[node.right] = queue[node] + node.right.val
            queue = newQueue
        return False
```
:::
