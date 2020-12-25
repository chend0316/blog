# 刷题日记
## [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
虽然解法都会背了，但为啥这个算法是正确的呢？
```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        res = 0
        l, r = 0, len(height) - 1
        while l < r:
            w = r - l
            h = min(height[l], height[r])
            res = max(res, w * h)
            if height[l] < height[r]: l += 1
            else: r -= 1
        return res
```

## [18. 四数之和](https://leetcode-cn.com/problems/4sum/)
```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        nums = sorted(nums)
        # print(nums)
        res = []
        i = 0
        while i < n - 3:
            j = i + 1
            while j < n - 2:
                k, h = j + 1, n - 1
                while k < h:
                    s = nums[i] + nums[j] + nums[k] + nums[h]
                    # print(i, j, k, h, s)
                    if s < target: k += 1
                    elif s > target: h -= 1
                    else:
                        res.append([nums[i], nums[j], nums[k], nums[h]])
                        k += 1
                        while k < n and nums[k] == nums[k-1]: k += 1
                        h -= 1
                        while h >= 0 and nums[h] == nums[h+1]: h -= 1
                j += 1
                while j < n and nums[j] == nums[j-1]: j += 1
            i += 1
            while i < n and nums[i] == nums[i-1]: i += 1
        return res
```

## [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)
解法一比较容易想到，解法二更省空间，但没有数量级的提升。

解法一：
```python
# 三次扫描；1 找到左边的最高柱子；2 找到右边的最高柱子；3 累加答案；
class Solution:
    def trap(self, height: List[int]) -> int:
        n = len(height)
        leftMax = [0]*n
        rightMax = [0]*n

        h = 0
        for i in range(n):
            leftMax[i] = h
            h = max(h, height[i])
        h = 0
        for i in range(n - 1, -1, -1):
            rightMax[i] = h
            h = max(h, height[i])
        
        res = 0
        for i in range(n):
            leftRightMin = min(leftMax[i], rightMax[i])
            if height[i] < leftRightMin:
                res += leftRightMin - height[i]

        return res
```

解法二：
```python
# 用单调栈
```

## [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)
```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1]*(n) for _ in range(m)]
        
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
        
        return dp[m-1][n-1]
```

## [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/description/)
```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n < 3: return n
        pre, cur = 1, 2
        for i in range(n - 2):
            pre, cur = cur, pre + cur
        return cur
```

## [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
```python
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        return self.solve(root, -math.inf, math.inf)
    
    def solve(self, node, minValue, maxValue):
        if not node: return True
        if node.val <= minValue or node.val >= maxValue: return False
        if not self.solve(node.left, minValue, min(maxValue, node.val)): return False
        if not self.solve(node.right, max(minValue, node.val), maxValue): return False
        return True
```

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return solve(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    boolean solve(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return solve(node.left, min, Math.min(max, node.val))
                && solve(node.right, Math.max(min, node.val), max);
    }
}
```

```javascript
var isValidBST = function(root) {
    var flag = true;
    var pre = -Number.MAX_SAFE_INTEGER;
    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        if (pre >= node.val) {
            flag = false;
            return;
        }
        pre = node.val;
        dfs(node.right);
    }
    dfs(root);
    return flag;
};
```

## [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)
```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        res = cnt = 0
        for num in nums:
            if cnt == 0:
                res, cnt = num, 1
            elif res == num:
                cnt += 1
            else:
                cnt -= 1
        return res
```

## [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        n = len(nums)
        l, r = 0, n - 1
        while True:
            while l < r and nums[r] > nums[l]:
                r -= 1
            if l == r: break
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            while l < r and nums[l] < nums[r]:
                l += 1
            if l == r: break
            nums[l], nums[r] = nums[r], nums[l]
            r -= 1
        # print(l, r, nums)
        if n - l == k: return nums[l]
        elif n - l > k: return self.findKthLargest(nums[l+1:], k)
        else: return self.findKthLargest(nums[:l], k - (n - l))
```

## [303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)
```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.nums = nums
        self.sums = []  # nums[0,i) 的和
        s = 0
        for num in nums:
            self.sums.append(s)
            s += num
        self.sums.append(s)

    def sumRange(self, i: int, j: int) -> int:
        return self.sums[j+1] - self.sums[i]
```

## [461. 汉明距离](https://leetcode-cn.com/problems/hamming-distance/)
```c
int hammingDistance(int x, int y) {
    int a = x ^ y;
    int res = 0;
    while (a) {
        a = a & (a - 1);
        res++;
    }
    return res;
}
```

## [700. 二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)
```java
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) {
            return root;
        }
        if (val < root.val) {
            return searchBST(root.left, val);
        } else {
            return searchBST(root.right, val);
        }
    }
}
```

## [701. 二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
```python
class Solution:
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        if not root: return TreeNode(val)
        if val < root.val:
            if not root.left:
                root.left = TreeNode(val)
            else:
                self.insertIntoBST(root.left, val)
        if val > root.val:
            if not root.right:
                root.right = TreeNode(val)
            else: 
                self.insertIntoBST(root.right, val)
        return root
```

## [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)
```java
class Solution {
    public int search(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (target < nums[m]) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
            }
        }
        return -1;
    }
}
```

```javascript
var search = function(nums, target) {
    var l = 0;
    var r = nums.length - 1;
    while (l <= r) {
        var m = Math.floor((l + r) / 2);
        if (nums[m] > target) {
            r = m - 1;
        } else if (nums[m] < target) {
            l = m + 1;
        } else {
            return m;
        }
    }
    return -1;
};
```

## [746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

```python
# 746
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        preCost = curCost = 0
        for i in range(n):
            preCost, curCost = curCost, min(preCost, curCost) + cost[i]
        return min(preCost, curCost)
```

## [896. 单调数列](https://leetcode-cn.com/problems/monotonic-array/)
<<< @/../src/leetcode/python/q896.py

## [1295. 统计位数为偶数的数字](https://leetcode-cn.com/problems/find-numbers-with-even-number-of-digits/)
```javascript
var findNumbers = function(nums) {
    return nums
        .filter((num) => {
            let cnt = 0;
            while (num) {
                num = Math.floor(num / 10);
                cnt++;
            }
            return cnt % 2 === 0;
        })
        .length;
};
```

## [面试题 17.12. BiNode](https://leetcode-cn.com/problems/binode-lcci/)
```python
class Solution:
    def convertBiNode(self, root: TreeNode) -> TreeNode:
        if not root: return None
        return self.solve(root, None)
    
    def solve(self, root, nextNode):
        if root.left:
            ret = self.solve(root.left, root)
        else:
            ret = root
        if root.right:
            root.right = self.solve(root.right, nextNode)
        else:
            root.right = nextNode
        root.left = None
        return ret
```