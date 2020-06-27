# 数据结构在各个语言中的最佳实践

## Dequeue（双端队列）

|    operation    |     C++      |     Java     |        Python         |    JavaScript     | Golang |
| :-------------: | :----------: | :----------: | :-------------------: | :---------------: | :----: |
|     create      |              |              | `collections.dequeue` |     `q = []`      |        |
| insert at back  | `push_back`  | `offerLast`  |       `append`        |      `push`       |        |
| insert at front | `push_front` | `offerFirst` |     `appendleft`      |     `unshift`     |        |
|   remove last   |  `pop_back`  |  `pollLast`  |         `pop`         |       `pop`       |        |
|  remove first   | `pop_front`  | `pollFirst`  |       `popleft`       |      `shift`      |        |
|  examine last   |    `back`    |  `peekLast`  |        `q[-1]`        | `q[q.length - 1]` |        |
|  examine first  |   `front`    | `peekFirst`  |        `q[0]`         |      `q[0]`       |        |

## Heap（堆）

Python的`heapq`库使用Binary Heap(完全二叉堆)实现。但是只支持min-heap(小顶堆)，不支持max-heap。

Oracle Java的`Class PriorityQueue<E>`

## 搜索树

Java、C++内部都是用红黑树来实现搜索树的。

