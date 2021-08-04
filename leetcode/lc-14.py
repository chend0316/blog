class Solution:
    def longestCommonPrefix(self, strs):
        n = len(strs)
        if n == 0: return ''
        if n == 1: return strs[0]
        i = 0
        while True:
            shouldExit = False
            for j in range(n):
                if i >= len(strs[j]):
                    shouldExit = True
                    break
                if j > 0 and strs[j][i] != strs[j - 1][i]:
                    shouldExit = True
                    break
            if shouldExit:
                break
            i += 1
        return strs[0][:i]