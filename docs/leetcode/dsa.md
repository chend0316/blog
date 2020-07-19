# 数据结构在各个语言中的使用

## Dequeue（双端队列）
双端队列可以理解为栈、队列的组合，所以在实际应用中可以直接使用双端队列取代栈和队列。

[Python 3 双端队列](https://docs.python.org/3/library/collections.html#collections.deque)的基本用法如下：

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

## 优先级队列（Priority Queue）

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
