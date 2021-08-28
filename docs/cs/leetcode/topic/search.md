# 搜索专题

- 树搜索: DFS、BFS、Force DFS
- 图搜索: DFS、BFS、双向 BFS
- 高级搜索: 剪枝，分为预剪枝和后剪枝
- 高级搜索: A*

DFS 和 BFS 的区别：

|            | DFS深度优先                      | BFS广度优先                    |
| ---------- | -------------------------------- | ------------------------------ |
| 时间复杂度 |                                  | 在最短路问题中有极大的优势     |
| 空间复杂度 | 取决于树的高度、图的最长环路长度 | 取决于树的“宽度”、图里面不好说 |
| 实现方式   | 一般是递归，很少用迭代，实现容易 | 迭代，实现难一点点             |

## 树搜索: DFS、BFS、暴力 DFS
### BFS (层次遍历)
层次遍历的基础题见[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，有多种实现技巧。我了解的有两种，我给他们起名字为：队列计数法、新旧队列法。

这两种方法的效果是一样的，大家可能有各自的喜好。但我建议大家重点掌握「新旧队列法」，因为它在后面的图 BFS 遍历中更加适用 (特别是 set 队列和 dict 队列的情况)。

::: details 102题「队列计数法」代码
```python{8-10}
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = collections.deque()
        if root: queue.append(root)
        while queue:
            res.append([])
            n = len(queue)
            while n:
                n -= 1
                node = queue.popleft()
                res[-1].append(node.val)
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
        return res
```
:::

::: details 102题「新旧队列法」代码
```python{8,11-13}
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        queue = []
        if root: queue.append(root)
        while queue:
            res.append([])
            newQueue = []
            for node in queue:
                res[-1].append(node.val)
                if node.left: newQueue.append(node.left)
                if node.right: newQueue.append(node.right)
            queue = newQueue
        return res
```
:::

### Force DFS
暴力 DFS 本质是一种二重循环/二重遍历，[543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/) 题可以使用暴力 DFS，也可以优化成一重遍历，这样复杂度就从 O(N^2) 降到了 O(N)。

还记得二重循环的优化方法吗？我们可以反转外层循环的遍历顺序，然后省略内层循环。运用到树中也是一样的，我们可以把先序遍历改成后序遍历，然后省略内层遍历。

::: details 543题 暴力DFS (二重遍历)
```python
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        if not root: return 0
        # 第二重遍历
        res = self.dfs(root.left) + self.dfs(root.right)
        # 第一重遍历
        return max(res, self.diameterOfBinaryTree(root.left), self.diameterOfBinaryTree(root.right))

    def dfs(self, node):
        if not node: return 0
        return max(self.dfs(node.left), self.dfs(node.right)) + 1
```
:::

::: details 543题 使用后续遍历，优化成一重遍历
```python
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        if not root: return 0
        self.ans = 0
        self.postTrav(root)
        return self.ans
    
    def postTrav(self, node):
        if not node: return 0
        left = self.postTrav(node.left)
        right = self.postTrav(node.right)
        self.ans = max(self.ans, left + right)
        return max(left, right) + 1
```
:::


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
```python{9}
def isSubPath(self, head, root):
    def dfs(head, root):
        if not head: return True
        if not root: return False
        if root.val != head.val: return False
        return dfs(head.next, root.left) or dfs(head.next, root.right)
    if not head: return True
    if not root: return False
    return dfs(head, root) or self.isSubPath(head, root.left) or self.isSubPath(head, root.right)
```
:::

[124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)使用暴力 DFS 虽然会超时，但挺适合用作练习的。

::: details 124题 暴力DFS
```python
class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        if not root: return -math.inf
        res = root.val + self.dfs(root.left) + self.dfs(root.right)
        return max(res, self.maxPathSum(root.left), self.maxPathSum(root.right))
    
    def dfs(self, root):
        if not root: return 0
        return max(0, root.val + self.dfs(root.left), root.val + self.dfs(root.right))
```
:::

## 图搜索: DFS、BFS、双向 BFS
如果你还没被下面这几题虐过，那你可能看不懂本节内容。
- [127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/)
- [126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/)

### BFS
图可能有回路，需要用 visited 集合避免走回路。

BFS 算法有很多流派：
- 单循环BFS / 双循环BFS
- 队列节点携带信息 / 全局变量记录信息
- 队列 / set去重队列 / dict去重队列
- 入队列visited / 出队列visited / 批量visited

去重队列分为 set、dict 两种，二者怎么选呢？
- 如果用全局变量记录信息，那么用 set 充当队列
- 如果用队列节点附带信息，那么就需要用 dict 充当队列

去重队列用的是哈希表，因为有的语言自带的不是有序哈希表，所以用「队列计数法」容易翻车，所以我们在图中统一用「新旧队列法」。

127题只需要输出最短路径的长度，不管用「入队列visited」、「出队列visited」还是「批量visited」都是可以的。126题需要输出所有最短路径，只能用「批量visited」，不能用「入队列visited」，否则会漏解。

::: details 127题 入队列visited、出队列visited、批量visited
```python
# 入队列visited
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordList = set(wordList)
        if endWord not in wordList: return 0
        queue = { beginWord }
        visited = { beginWord }
        depth = 1
        while queue:
            newQueue = set()
            for word in queue:
                if word == endWord: return depth
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        nextWord = word[:i] + c + word[i+1:]
                        if nextWord not in visited and nextWord in wordList:
                            newQueue.add(nextWord)
                            visited.add(nextWord)  # 入队列visited，能通过
            depth += 1
            queue = newQueue
        return 0
```

```python
# 出队列visited
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordList = set(wordList)
        if endWord not in wordList: return 0
        queue = { beginWord }
        visited = set()
        depth = 1
        while queue:
            newQueue = set()
            for word in queue:
                if word == endWord: return depth
                visited.add(word)  # 出队列visited，能通过
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        nextWord = word[:i] + c + word[i+1:]
                        if nextWord not in visited and nextWord in wordList:
                            newQueue.add(nextWord)
            depth += 1
            queue = newQueue
        return 0
```

```python
# 批量visited
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordList = set(wordList)
        if endWord not in wordList: return 0
        queue = { beginWord }
        visited = { beginWord }
        depth = 1
        while queue:
            newQueue = set()
            for word in queue:
                if word == endWord: return depth
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        nextWord = word[:i] + c + word[i+1:]
                        if nextWord not in visited and nextWord in wordList:
                            newQueue.add(nextWord)
            visited = visited.union(newQueue)  # 批量visited，能通过
            depth += 1
            queue = newQueue
        return 0
```
:::

下面我们分析一下图 BFS 中，「入队列visited」、「出队列visited」和「批量visited」的区别。先说结论，「批量visited」才是图 BFS 的正确写法。我在本子上画了图来分析三者区别的，暂时没有写在博客里面，以后贴上来。

::: details 126题 双循环BFS + (set队列 = 去重队列 + 全局变量记录信息) + 批量visited
```python
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        wordList = set(wordList)
        queue = { beginWord }  # 采用 set 实现去重队列
        visited = { beginWord }
        paths = { beginWord: [[beginWord]] }  # 记录 path 信息

        while queue:
            newQueue = set()
            for w in queue:  # 出队列，在这里添加 visited 会导致解冗余
                if w == endWord: return paths[endWord]
                for i in range(len(w)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        neww = w[:i] + c + w[i+1:]
                        if neww in wordList and neww not in visited:
                            newQueue.add(neww)  # 入队列，在这里添加 visited 会导致漏解
                            paths.setdefault(neww, [])
                            paths[neww] += [path + [neww] for path in paths[w]]
            queue = newQueue
            visited = visited.union(queue)  # 批量添加 visited 才是 BFS 的正解，因为 BFS 是一种“并发”扩散
            # 估计很多人最短路长度的题做多了，被宠坏了，习惯在入队列的时候更新 visited
        return []
```
:::

::: details 126题 BFS + (dict队列 = 去重队列 + 队列节点附带信息) + 批量visited
```python
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        wordList = set(wordList)
        queue = collections.defaultdict(list)  # 采用 dict 实现去重队列
        queue[beginWord] = [[beginWord]]
        visited = { beginWord }

        while queue:
            newVisited = set()
            newQueue = collections.defaultdict(list)
            for w in queue:
                paths = queue[w]
                if w == endWord: return paths
                else:
                    for i in range(len(w)):
                        for c in 'abcdefghijklmnopqrstuvwxyz':
                            neww = w[:i] + c + w[i+1:]
                            if neww in wordList and neww not in visited:
                                newQueue[neww] += [path + [neww] for path in paths]  # 队列节点附带信息
                                newVisited.add(neww)
            visited = visited.union(newVisited)  # 批量visited
            queue = newQueue

        return []
```
:::

::: details 126题 BFS + 队列节点附带信息 + 批量访问邻居
```python
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        wordList = set(wordList)
        res = []
        queue = collections.deque()
        queue.append([beginWord])
        visited = { beginWord }
        while queue:
            newVisited = set()
            newQueue = collections.deque()
            while queue:
                path = queue.popleft()
                word = path[-1]
                if word == endWord: return res
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        newWord = word[:i] + c + word[i+1:]
                        if newWord in visited or newWord not in wordList: continue
                        newVisited.add(newWord)
                        if newWord == endWord: res.append(path + [endWord])
                        else: newQueue.append(path + [newWord])
            visited = visited.union(newVisited)
            queue = newQueue
        return res
```
:::

### 双向 BFS
[127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/)。
::: details 127题 双向BFS
```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList: return 0
        wordList = set(wordList)
        start, end, visited = {beginWord}, {endWord}, {beginWord, endWord}
        res = 2

        while start:
            tmp = set()
            for word in start:
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    for i in range(len(word)):
                        newWord = word[:i] + c + word[i+1:]
                        if newWord in end: return res
                        if newWord in wordList and newWord not in visited:
                            visited.add(newWord)
                            tmp.add(newWord)
            res += 1
            start = tmp
            if len(start) > len(end): start, end = end, start

        return 0
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
后剪枝虽然代码写起来少几行，但有2个缺点：
- 效率低
- 会导致重复解

[37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)，这题可以用预剪枝、后剪枝来解，可以看到后剪枝所能依赖的决策信息比预剪枝要少，所以一般效率更低。这题还有 A* 解法，但这里不介绍。

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

## 高级搜索: A* 启发式搜索
启发的英文是 heuristic，启发式搜索用估价函数 `h(n)` 来决定哪个邻居优先访问。业务需要设计具体的估价函数，估价函数的好坏直接决定了性能。

只要在 BFS 的基础上，将队列改为优先级队列就可以变为 A* 搜索。

[1091. 二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)题不知道为啥入队列时候 visited 答案会错误，不知道为啥用曼哈顿距离答案会错。

::: details 1091题 Python
```python
# 启发式搜索，出队列visited，答案正确
from heapq import heappush, heappop
class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        N, M = len(grid), len(grid[0])
        h = lambda i, j: max(N - 1 - i, M - 1 - j)
        queue = []
        if grid[0][0] == 0:
            heappush(queue, (h(0, 0) + 1, 1, (0, 0)))
            visited = set()
        while queue:
            _, depth, cur = heappop(queue)
            if cur in visited: continue  #
            visited.add(cur)  # 出队列visited，答案正确
            curx, cury = cur
            if curx == N - 1 and cury == M - 1: return depth 
            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (-1, -1), (1, -1), (-1, 1)]:
                nextx, nexty = curx + dx, cury + dy
                nex = nextx, nexty
                if 0 <= nextx < N and 0 <= nexty < M and grid[nextx][nexty] == 0:
                    heappush(queue, (h(nex[0], nex[1]) + depth + 1, depth + 1, nex))
        return -1
```

```python
# 启发式搜索，入队列visited，答案错误 
# [[0,0,0,0,1,1,1,1,0],[0,1,1,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0],[1,1,0,0,1,0,0,1,1],[0,0,1,1,1,0,1,0,1],[0,1,0,1,0,0,0,0,0],[0,0,0,1,0,1,0,0,0],[0,1,0,1,1,0,0,0,0],[0,0,0,0,0,1,0,1,0]]
# 期望的是11，但输出的是12
from heapq import heappush, heappop
class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        N, M = len(grid), len(grid[0])
        h = lambda i, j: max(N - 1 - i, M - 1 - j)
        queue = []
        if grid[0][0] == 0:
            heappush(queue, (h(0, 0) + 1, 1, (0, 0)))
            visited = {(0, 0)}
        while queue:
            _, depth, cur = heappop(queue)
            curx, cury = cur
            if curx == N - 1 and cury == M - 1: return depth 
            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (-1, -1), (1, -1), (-1, 1)]:
                nextx, nexty = curx + dx, cury + dy
                nex = nextx, nexty
                if 0 <= nextx < N and 0 <= nexty < M and nex not in visited and grid[nextx][nexty] == 0:  #
                    heappush(queue, (h(nex[0], nex[1]) + depth + 1, depth + 1, nex))
                    visited.add(nex)  # 入队列visited，答案错误
        return -1
```
:::

## 例题

[433. 最小基因变化](https://leetcode-cn.com/problems/minimum-genetic-mutation/)

::: details 433题 Java BFS 预剪枝
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

::: details 433题 Java DFS
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
- [437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)；使用 DFS 配合哈希表是最佳解法，是很好的练习题；使用暴力 DFS 的话复杂度太高。

- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)，除了用BFS竟然还能用DFS做
- [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
- [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)，看起来不像，但其实是DFS+剪枝
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)

- [51. N皇后](https://leetcode-cn.com/problems/n-queens/)，判断是否要剪枝的逻辑可以遍历棋盘判断，或通过行列的和/差判断
- [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/)
- [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
- [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)
- [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)
- [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)，利用Trie高效剪枝
