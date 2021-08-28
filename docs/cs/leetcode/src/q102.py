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