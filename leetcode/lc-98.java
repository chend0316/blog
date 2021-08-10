class Solution {
    public boolean isValidBST(TreeNode root) {
        return this.valid(root, null, null);
    }

    private boolean valid(TreeNode root, Integer min, Integer max) {
        if (root == null) return true;
        if ((min != null && root.val <= min) || (max != null && root.val >= max)) return false;
        return this.valid(root.left, min, max == null ? root.val : Math.min(max, root.val))
            && this.valid(root.right, min == null ? root.val : Math.max(min, root.val), max);
    }
}