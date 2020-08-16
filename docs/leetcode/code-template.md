# 代码模板 (背)
## 为什么要背代码？
代码模板是需要背诵的，虽然很反常识。并不是说代码不需要理解，这里只是强调绝大多数人都忽视了背诵的重要性。举个例子吧，勾股定理大家都背的滚瓜烂熟 `a^2 + b^2 = c^2` 那么你用的时候会去关心它如何推导的吗？

所以编程也是一样：
- 99%的时候编程并不是发挥创造性的工作
- 创造性工作的基础是对基础知识背诵的滚瓜烂熟

## 这里的代码模板有何特点？
这里是经过大量刷题后提炼出来的、最好用的模板。

- 例如 DFS/BFS 中，我们会用 `visited` 标记访问过的节点，而不会介绍颜色标记法，因为前者更加通用
- 再如层次遍历 (BFS) 中，我们更推荐背诵「新旧队列法」的模板，而不是「队列计数法」，因为前者可以改造成为「双向BFS」
- 再如层次遍历 (BFS) 中，我们选择在节点入队列时标记 visited，而不是在节点出队列时标记 visited，因为前者更不容易出错

## 算法模板
### 约定
算法离不开数据结构，所以我们先约定一下数据结构的基本实现，这些实现兼容 leetcode 。对于语言内置的数据结构这里假定大家都知道，就不介绍了。

::: details Python 二叉树实现
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None
```
:::

### 二叉树的三种遍历（递归版）
::: details Python 前中后序遍历
```python
def preorder(self, root):
    if root:
        self.traverse_path.append(root.val)
        self.preorder(root.left)
        self.preorder(root.right)

def inorder(self, root):
    if root:
        self.inorder(root.left)
        self.traverse_path.append(root.val)
        self.inorder(root.right)

def postorder(self, root):
    if root:
        self.postorder(root.left)
        self.postorder(root.right)
        self.traverse_path.append(root.val)
```
:::

### DFS、BFS
BFS 也叫层次遍历。

DFS 是递归实现，BFS 是迭代实现。

图需要标记 visited，树不需要标记 (因为没有环路)。

「新旧队列法」和「队列计数法」是我自己起的名字，大家不要死记这两个名词。

::: details Python DFS
```python
def dfs(node, level = 0, visited = set()):
    visited.add(node)
    process(node)
    for next_node in gen_related_nodes(node):
        if next_node not in visited:
        dfs(next_node, level + 1, visited)
```
:::

::: details Python 朴素 BFS
```python
def bfs(root):
    queue = []
    if root: queue += [(1, root)]  # 根据题意，初始深度 1
    for depth, cur in queue:
        if cur == target: return depth
        for nei in gen_neighbors(cur):
            queue.append((depth + 1, nei))
    return -1  # 根据题意
```
:::

::: details Python BFS 新旧队列法 + 预访问 + 预处理
```python
def bfs(root):
    queue = []
    visited = set()
    level = 0
    if root:
        queue.append(root)
        visited.add(root)  # 预访问
        process(root)  # 预处理
    while queue:
        level += 1
        tmp = []
        for node in queue:
            # process(node)  # 后处理
            # visited.add(node)  # 后访问
            for next_node in gen_related_nodes(node):
                visited.add(next_node)
                tmp.append(next_node)
        queue = tmp 
```
:::

::: details Python 双向 BFS 最短level
```python
def debfs(start, end):
    if start == end:  # 必须判断
        return 0  # 根据题意 0 or -1
    s1, s2, visited = {start}, {end}, {start, end}
    level = 2  # 根据题义 1 or 2
    while s1:
        tmp = set()
        for cur in s1:
        for next in gen_relative_nodes(node):
            if next in s2: return level  # found
            if next not in visited:
            tmp.add(next)
            visited.add(next)
        s1 = tmp
        if len(s1) > len(s2): s1, s2 = s2, s1
    return 0  # 根据题义 0 or -1
```
:::

::: details Python 双向 BFS 所有最短路
有这种模板吗？
:::

### 字典树 (Trie)
::: details Python Trie 实现
```python
class Trie:
    def __init__(self):
        self.root = {}
    
    def insert(self, word):
        node = self.root
        for c in word:
            node = node.setdefault(c, {})
        node['#'] = None

    def search(self, word):
        return self.startsWith(word + '#')
    
    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node: return False
            node = node[c]
        return True
```
:::

### 并查集

::: details Python 并查集 路径压缩
```python
class UnionFind:
    def __init__(self, n):
        self.uf = [i for i in range(n)]
    
    def union(self, i, j):
        self.uf[self.find(i)] = self.uf[self.find(j)]

    def find(self, i):
        root = i
        while self.uf[root] != root: root = self.uf[root]
        # 路径压缩
        while self.uf[i] != root: self.uf[i], i = root, self.uf[i]
        return root
```
:::

### TODO
这几个代码模板我还没整理：
- 二叉树的三种遍历 (迭代版)，因为比较少用
- 递归代码模板，因为比较简单，就略过了
- 分治代码模板
- 二分查找
- 动态规划
- 剪枝模板，分为预剪枝和后剪枝

## 位运算
基础概念
- +1: 0011 -> 0100
- -1: 0100 -> 0011
- -a: 取反加一

实用操作
- 取最低位的1: `bits & -bits`
- 最低位的1改为0: `bits & (bits - 1)`
- 生成 00111 掩模: `(1 << 3) - 1`

## 语言内置数据结构
[https://www.bigocheatsheet.com/](https://www.bigocheatsheet.com/) 有一张各种数据结构的复杂度对比。

### Dequeue（双端队列）
双端队列可以理解为栈、队列的组合，所以在实际应用中可以直接使用双端队列取代栈和队列。

[Python 3 双端队列](https://docs.python.org/3/library/collections.html#collections.deque) 的基本用法如下：

```python
from collections import deque
deq = deque([1, 2, 3], 3)
deq.append(4)  # [2, 3, 4]
deq.appendleft(0)  # [0, 2, 3]
deq[0]
```

[Java 8](https://docs.oracle.com/javase/8/docs/api/java/util/Deque.html) 双端队列基本用法，略。

| Python双端队列 | Head                | Tail            | Value           |
| -------------- | ------------------- | --------------- | --------------- |
| Insert         | `appendleft(value)` | `append(value)` | -               |
| Remove         | -                   | -               | `remove(value)` |
| Peek           | `deq[0]`            | `deq[-1]`       |                 |
| Remove & Peek  | `popleft()`         | `pop()`         |                 |


| Java双端队列  | Head              | Tail             | Value           |
| ------------- | ----------------- | ---------------- | --------------- |
| Insert        | `addFirst(value)` | `addLast(value)` |                 |
| Remove        | -                 | -                | `remove(value)` |
| Peek          | `peekFirst()`     | `peekLast()`     |                 |
| Remove & Peek | `removeFirst()`   | `removeLast()`   | -               |

Notes：
- Python可以插入一组 Value：`deq.extendleft([1,2])`，Java 不行
- Python可以指定 Capacity 队列最大容量，Java 不行

### 优先级队列（Priority Queue）

优先级队列只是一个应用场景，不是具体的某个数据结构，可以用 Heap、BST、Treap 来实现，一般是用 Heap。

而堆（Heap）又有各种实现，在[维基百科](https://en.wikipedia.org/wiki/Heap_(data_structure))中有一张表格列出了各种实现的性能对比。最常见/简单的实现是二叉堆，但二叉堆的性能也是最差的。

[Python3 的 heapq](https://docs.python.org/3/library/heapq.html) 是用完全二叉堆来实现的，用的时候只需要一个数组。基本用法如下。

```python
import heapq
queue = [5, 2, 1, 3]
heapq.heapify(queue)

print(queue)  # [1, 2, 5, 3]
print(queue.pop())  # 1
print(queue[0])  # 2
```

[Java 的 PriorityQueue](https://docs.oracle.com/javase/10/docs/api/java/util/PriorityQueue.html)，基本用法如下：

```java
import java.util.PriorityQueue;

public class ProorityQueueDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> queue = new PriorityQueue<>();
        queue.add(5); queue.add(2); queue.add(1); queue.add(3);

        System.out.println(queue);  // [1, 3, 2, 5]
        System.out.println(queue.poll());  // 1
        System.out.println(queue.peek());  // 2
    }
}
```

|               | Python 3                       | Java 8             |
| ------------- | ------------------------------ | ------------------ |
| 建堆          | `heapq.heapify(queue)`         |                    |
| Add           | `heapq.heappush(queue, value)` | `queue.add(value)` |
| Remove & Peek | `heapq.heappop(queue)`         | `queue.poll()`     |
| Peek          | `queue[0]`                     | `queue.peek()`     |


语言差异：
- Java 建堆的时候可以通过传入比较器实现小顶堆、大顶堆等等，而 Python 建堆的时候只能建立小顶堆
- 虽然 Python 的 `nlargest()` 和 `nsmallest()` 可以传入比较器，但这两个函数比较鸡肋，只能用于离线算法不能用于在线算法
