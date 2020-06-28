# 解法1：中序遍历必须为升序
def isValidBST(self, root):
    self.pre = None
    return self.helper(root)

def helper(self, root):
    if root is None: return True
    if not self.helper(root.left):
        return False
    if self.pre is not None and root.val <= self.pre.val:
        return False
    self.pre = root.val
    if not self.helper(root.right):
        return False
    return True

# 解法2：递归
def isValid(root, min_value, max_value):
    if root is None:
        return True
    if root.val <= min_value or root.val >= max_value:
        return False
    return isValid(root.left, min_value, root.val) and isValid(root.right, root.val, max_value)

isValid(root, -math.inf, math.inf)
