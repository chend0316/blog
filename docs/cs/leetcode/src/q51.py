class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        def dfs(queens, xy_diff, xy_sum):
            i = len(queens)
            if i == n:
                result_list.append(queens)
            for j in range(n):
                if j not in queens and i - j not in xy_diff and i + j not in xy_sum:
                    dfs(queens + [j], xy_diff + [i - j], xy_sum + [i + j])
        result_list = []
        dfs([], [], [])
        return [['.'*i + 'Q' + '.'*(n-i-1) for i in res] for res in result_list]