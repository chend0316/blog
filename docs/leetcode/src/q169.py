# 这个解法是O(N)时间、O(1)空间
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        res = 0
        cnt = 0
        for n in nums:
            if cnt == 0:
                res = n
                cnt = 1
            elif res == n:
                cnt += 1
            else:
                cnt -= 1
        return res