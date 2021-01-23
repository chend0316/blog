
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