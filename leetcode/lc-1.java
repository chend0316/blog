class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> idxMapByNum = new HashMap();
        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            if (idxMapByNum.containsKey(num)) {
                return new int[]{i, idxMapByNum.get(num)};
            }
            idxMapByNum.put(target - num, i);
        }
        return new int[0];
    }
}