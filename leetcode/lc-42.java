class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];
        int tmp = 0;
        for (int i = 0; i < n; i++) {
            leftMax[i] = tmp;
            tmp = Math.max(tmp, height[i]);
        }
        tmp = 0;
        for (int i = n - 1; i >= 0; i--) {
            rightMax[i] = tmp;
            tmp = Math.max(tmp, height[i]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            int diff = Math.min(leftMax[i], rightMax[i]) - height[i];
            if (diff > 0) res += diff;
        }
        return res;
    }
}
