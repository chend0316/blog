class Solution:
    def increasingBST(self, root: TreeNode) -> TreeNode:
        if root: return self.solve(root, None)
        return None
    
    def solve(self, node, nextNode):
        ret = node
        if node.left:
            left = self.solve(node.left, node)
            ret = left
            node.left = None
        if node.right:
            right = self.solve(node.right, nextNode)
            node.right = right
        else:
            node.right = nextNode
        return ret