# 代码模板 (背)
这里是面向工程/竞赛的代码模板，因此只会给出最好用的模板。具体会体现在下面这几个地方。

例如 DFS/BFS 中，我们会用 `visited` 标记访问过的节点，而不会介绍颜色标记法，因为前者更加通用。

再如层次遍历 (BFS) 中，我们更推荐背诵「新旧队列法」的模板，而不是「队列计数法」，因为前者可以改造成为「双向BFS」。

再如层次遍历 (BFS) 中，我们选择在节点入队列时标记 visited，而不是在节点出队列时标记 visited，因为在「双向BFS」中前者不容易出错。

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
```py
def dfs(node, level = 0, visited = set()):
  visited.add(node)
  process(node)
  for next_node in gen_related_nodes(node):
    if next_node not in visited:
      dfs(next_node, level + 1, visited)
```
:::

::: details Python BFS 新旧队列法
```py
def bfs(root):
  queue = []
  visited = set()
  level = 0
  if root:
    queue.append(root)
    visited.add(root)
  while queue:
    level += 1
    new_queue = []
    for node in queue:
      process(node)
      for next_node in gen_related_nodes(node):
        visited.add(next_node)
        new_queue.append(next_node)
    queue = new_queue
```
:::

::: details Python BFS 队列计数法
```py
def bfs(root):
  queue = collections.deque()
  visited = set()
  level = 0
  if root:
    queue.append(root)
    visited.add(root)
  while queue:
    level += 1
    n = len(queue)
    while n:
      n -= 1
      node = queue.popleft()
      process(node)
      for next_node in gen_related_nodes(node):
        visited.add(next_node)
        new_queue.append(next_node)
```
:::

### TODO
这几个代码模板我还没整理：
- 二叉树的三种遍历 (迭代版)，因为比较少用
- 递归代码模板，因为比较简单，就略过了
- 分治代码模板
- 二分查找
- 动态规划
- 字典树
- 并查集

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
