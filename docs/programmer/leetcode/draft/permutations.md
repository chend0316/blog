# 全排列问题
## 输出所有全排列
让你输出所有全排列，相关题目：
- [46. 全排列](https://leetcode-cn.com/problems/permutations/)无重复节点
- [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)有重复节点

练习点：
- 会画状态树
- DFS、BFS 都要会，我个人觉得 DFS 的想法比较自然，所以我要用 BFS 刻意练习
- 重复节点去重的思路：计数、先排序

::: details 无重复 + DFS
:::

::: details 无重复 + BFS
:::

::: details 排序去重 + DFS
:::

::: details 排序去重 + BFS
:::

::: details 计数去重 + DFS
:::

::: details 计数去重 + BFS
:::

::: details 无重复 + DFS + swap交换
```cpp
class Solution {
public:
    vector<vector<int> > permute(vector<int> &num) {
        vector<vector<int> > result;
      
        permuteRecursive(num, 0, result);
        return result;
    }
  
    // permute num[begin..end]
    // invariant: num[0..begin-1] have been fixed/permuted
    void permuteRecursive(vector<int> &num, int begin, vector<vector<int> > &result)	{
        if (begin >= num.size()) {
            // one permutation instance
            result.push_back(num);
            return;
        }
      
        for (int i = begin; i < num.size(); i++) {
            swap(num[begin], num[i]);
            permuteRecursive(num, begin + 1, result);
            // reset
            swap(num[begin], num[i]);
        }
    }
};
```
:::