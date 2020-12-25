class Solution:
    def smallestRangeI(self, A: List[int], K: int) -> int:
        minA = min(A)
        maxA = max(A)
        if maxA - minA > 2 * K:
            return maxA - minA - 2 * K
        else:
            return 0