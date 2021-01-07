class UF:
    def __init__(self, n):
        self.uf = [i for i in range(n)]
    
    def find(self, a):
        root = a
        while root != self.uf[root]: root = self.uf[root]
        while self.uf[a] != root:
            a, self.uf[a] = self.uf[a], root
        return root

    def union(self, a, b):
        self.uf[self.find(a)] = self.find(b)

class Solution:
    def findCircleNum(self, M: List[List[int]]) -> int:
        n = len(M)
        uf = UF(n)
        for i in range(n):
            for j in range(n):
                if M[i][j] == 1:
                    uf.union(i, j)
        return len(set([uf.find(e) for e in range(n)]))