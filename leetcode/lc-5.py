class Solution:
    def longestPalindrome(self, s):
        n = len(s)
        maxLen = 0
        maxL = maxR = 0
        for mid in range(n):
            l, r = mid, mid
            while l >= 0 and r < n:
                if s[l] != s[r]: break
                if r - l > maxLen:
                    maxLen = r - l
                    maxL, maxR = l, r
                l, r = l - 1, r + 1

            l, r = mid, mid + 1
            while l >= 0 and r < n:
                if s[l] != s[r]: break
                if r - l > maxLen:
                    maxLen = r - l
                    maxL, maxR = l, r
                l, r = l - 1, r + 1

        return s[maxL: maxR + 1]
