class Solution:
    def isMonotonic(self, A: List[int]) -> bool:
        flag = 0
        for i in range(1, len(A)):
            if A[i] > A[i-1]:
                if flag == -1: return False
                flag = 1
            elif A[i] < A[i-1]:
                if flag == 1: return False
                flag = -1
        return True
