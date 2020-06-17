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

