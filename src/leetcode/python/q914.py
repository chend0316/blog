class Solution:
    def hasGroupsSizeX(self, deck: List[int]) -> bool:
        cnts = list(collections.Counter(deck).values())
        minCnt = min(cnts)
        for i in range(2, minCnt + 1):
            if sum([cnt % i for cnt in cnts]) == 0:
                return True
        return False