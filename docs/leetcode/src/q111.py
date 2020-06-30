class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if root is None:
            return 0
        leftMin = self.minDepth(root.left)
        rightMin = self.minDepth(root.right)
        if leftMin != 0 and rightMin != 0:
            return 1 + min(leftMin, rightMin)
        else:
            return 1 + leftMin + rightMin  # 妙蛙种子在米奇妙妙屋写出来的代码就是妙啊
