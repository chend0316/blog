# 搜索专题

- DFS、BFS、Force DFS
- 剪枝，分为预剪枝和后剪枝
- 双向 BFS
- A*

我个人把 visited 也看做是一种剪枝，因此入队列的时候加入 visited 视为预剪枝，出队列的时候加入 visited 视为后剪枝。

## 基础搜索: DFS、BFS、暴力 DFS
DFS 和 BFS 的区别：

|            | DFS深度优先                      | BFS广度优先                    |
| ---------- | -------------------------------- | ------------------------------ |
| 时间复杂度 |                                  | 在最短路问题中有极大的优势     |
| 空间复杂度 | 取决于树的高度、图的最长环路长度 | 取决于树的“宽度”、图里面不好说 |
| 实现方式   | 一般是递归，很少用迭代，实现容易 | 迭代，实现难一点点             |

### BFS (层次遍历)

层次遍历的基础题见[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，有多种实现技巧。我了解的有两种，我给他们起名字为：队列计数法、新旧队列法。

::: details 102题「队列计数法」代码
```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = collections.deque()
        if root: queue.append(root)
        while queue:
            res.append([])
            n = len(queue)  # 技巧
            while n:  # 技巧
                n -= 1  # 技巧
                node = queue.popleft()
                res[-1].append(node.val)
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
        return res
```
:::

::: details 102题「新旧队列法」代码
```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = []
        if root: queue.append(root)
        while queue:
            res.append([])
            newQueue = []  # 技巧
            for node in queue:
                res[-1].append(node.val)
                if node.left: newQueue.append(node.left)  # 技巧
                if node.right: newQueue.append(node.right)  # 技巧
            queue = newQueue  # 技巧
        return res
```
:::

层次遍历是一个代码技巧，熟悉其思想可以写出其它变种。例如双向 BFS 就将层次遍历运用到了出神入化的地步，它是在「新旧队列法」的基础上使用哈希表来代替队列。

### Force DFS
[543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)除了暴力 DFS 还有更好的解法。

[437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)有更好的解法，这里我们给出的是暴力 DFS 的代码：
::: details 437题暴力DFS代码
```java
public class Solution {
    public int pathSum(TreeNode root, int sum) {
        if (root == null) return 0;
        return pathSumFrom(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    }

    private int pathSumFrom(TreeNode node, int sum) {
        if (node == null) return 0;
        int ret = 0;
        if (node.val == sum) ret++;
        return ret + pathSumFrom(node.left, sum - node.val) + pathSumFrom(node.right, sum - node.val);
    }
}
```
:::

[1367. 二叉树中的列表](https://leetcode-cn.com/problems/linked-list-in-binary-tree/)也能用[DP来解](https://leetcode.com/problems/linked-list-in-binary-tree/discuss/524881/Python-Recursive-Solution-O(N)-Time)，这里我们给出的是暴力 DFS 的代码：

::: details 1367题暴力DFS代码
```python
def isSubPath(self, head, root):
    def dfs(head, root):
        if not head: return True
        if not root: return False
        if root.val != head.val: return False
        return dfs(head.next, root.left) or dfs(head.next, root.right)
    if not head: return True
    if not root: return False
    # 重点学习下面这行
    return dfs(head, root) or self.isSubPath(head, root.left) or self.isSubPath(head, root.right)
```
:::

### 更多习题

- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，除了用BFS竟然还能用DFS做
- [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
- [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)，看起来不像，但其实是DFS+剪枝
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)

## 高级搜索: 双向 BFS
[126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/)在国际站上有[一个绝妙的 BFS 解法](https://leetcode.com/problems/word-ladder-ii/discuss/40482/Python-simple-BFS-layer-by-layer)，代码如下。

::: details 126题双向DFS代码
```python
class Solution(object):
    def findLadders(self, beginWord, endWord, wordList):
        wordList = set(wordList)
        res = []
        layer = {}
        layer[beginWord] = [[beginWord]]

        while layer:
            newlayer = collections.defaultdict(list)  # 用哈希表而不是队列
            for w in layer:
                if w == endWord: 
                    res.extend(k for k in layer[w])
                else:
                    for i in range(len(w)):
                        for c in 'abcdefghijklmnopqrstuvwxyz':
                            neww = w[:i]+c+w[i+1:]
                            if neww in wordList:
                                newlayer[neww]+=[j+[neww] for j in layer[w]]

            wordList -= set(newlayer.keys())
            layer = newlayer  # 这是用「新旧队列」法实现的层次遍历，不过这里用哈希表取代队列

        return res
```
:::

## 高级搜索: 剪枝

[22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)。

::: details 22题 Python 预剪枝
```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        self.ans = []
        if n: self.backtrack(n, n, '')
        return self.ans
    
    def backtrack(self, left, right, path):
        if left + right == 0: self.ans.append(path)
        if left > 0: self.backtrack(left - 1, right, path + '(')
        if right > left: self.backtrack(left, right - 1, path + ')')
```
:::

::: details 22题 Python 后剪枝
```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        self.ans = []
        self.backtrack(n, n, '')
        return self.ans

    def backtrack(self, left, right, path):
        if right < left or left < 0 or right < 0: return
        if left + right == 0:
            self.ans.append(path)
            return
        self.backtrack(left - 1, right, path + '(')
        self.backtrack(left, right - 1, path + ')')
```
:::

### 预剪枝 vs 后剪枝
[37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)，这题可以用预剪枝、后剪枝来解，可以看到后剪枝的信息比预剪枝要少，所以一般效率更低。这题还有 A* 解法，但这里不介绍。

::: details 37题 Python 后剪枝 超时
```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        self.backtrack(board, 0)
    
    def backtrack(self, board, x):
        if x == 81: return True
        i, j = x // 9, x % 9
        if board[i][j] != '.': return self.backtrack(board, x + 1)
        if not self.valid(board): return False
        for c in '123456789':
            board[i][j] = c
            if self.backtrack(board, x + 1): return True
            board[i][j] = '.'

    def valid(self, board):
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        blocks = [set() for _ in range(9)]
        for i in range(9):
            for j in range(9):
                num = board[i][j]
                if num == '.': continue
                if num in rows[i] | cols[j] | blocks[i//3*3 + j//3]: return False
                rows[i].add(num); cols[j].add(num); blocks[i//3*3 + j//3].add(num)
        return True
```
:::

::: details 37题 Python 预剪枝
```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        self.backtrack(board, 0)
    
    def backtrack(self, board, x):
        if x == 81: return True
        i, j = x // 9, x % 9
        if board[i][j] != '.': return self.backtrack(board, x + 1)
        for c in '123456789':
            if self.canPlace(board, i, j, c):
                board[i][j] = c
                if self.backtrack(board, x + 1): return True
                board[i][j] = '.'
        return False

    def canPlace(self, board, i, j, c):
        for x in range(9):
            if board[i][x] != '.' and board[i][x] == c: return False
            if board[x][j] != '.' and board[x][j] == c: return False
            if board[i//3*3 + x//3][j//3*3 + x%3] != '.' and board[i//3*3 + x//3][j//3*3 + x%3] == c: return False
        return True
```
:::

## 例题
### [433. 最小基因变化](https://leetcode-cn.com/problems/minimum-genetic-mutation/)

::: details Java BFS 预剪枝
```java
// https://leetcode.com/problems/minimum-genetic-mutation/discuss/91484/Java-Solution-using-BFS
public class Solution {
    public int minMutation(String start, String end, String[] bank) {
        if(start.equals(end)) return 0;
        
        Set<String> bankSet = new HashSet<>();
        for(String b: bank) bankSet.add(b);
        
        char[] charSet = new char[]{'A', 'C', 'G', 'T'};
        
        int level = 0;
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        queue.offer(start);
        visited.add(start);
        
        while(!queue.isEmpty()) {
            int size = queue.size();
            while(size-- > 0) {
                String curr = queue.poll();
                if(curr.equals(end)) return level;
                
                char[] currArray = curr.toCharArray();
                for(int i = 0; i < currArray.length; i++) {
                    char old = currArray[i];
                    for(char c: charSet) {
                        currArray[i] = c;
                        String next = new String(currArray);
                        if(!visited.contains(next) && bankSet.contains(next)) {
                            visited.add(next);
                            queue.offer(next);
                        }
                    }
                    currArray[i] = old;
                }
            }
            level++;
        }
        return -1;
    }
}
```
:::

::: details Java DFS
```java
public int minMutation(String start, String end, String[] bank) {
    recurse(start, end, bank, 0, new HashSet<String>());  // 小问题，哈希表应该把 start 加入
    return count == Integer.MAX_VALUE ? -1 : count;
}
int count = Integer.MAX_VALUE;
private void recurse(String start, String end, String[] bank, int soFar, Set<String> visited) {
    if(start.intern() == end.intern()) {
        count = Math.min(count, soFar);
    }
    
    for(String e : bank) {
        int diff = 0;
        for(int i = 0; i < e.length(); i++) {
            if(start.charAt(i) != e.charAt(i)) {
                diff++;
                if(diff > 1) break;
            }
        }
        if(diff == 1 && !visited.contains(e)) {
            visited.add(e);
            recurse(e, end, bank, soFar+1, visited);
            visited.remove(e);
        }
    }
}
```
:::

## 更多习题

- [51. N皇后](https://leetcode-cn.com/problems/n-queens/)，判断是否要剪枝的逻辑可以遍历棋盘判断，或通过行列的和/差判断
- [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/)
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)
- [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)
- [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)，利用Trie高效剪枝
