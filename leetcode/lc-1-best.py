class Solution:
    def twoSum(self, nums, target):
        hash = {}
        for i in range(len(nums)):
            need = target - nums[i]
            if need in hash:
                return [i, hash[need]]
            hash[nums[i]] = i