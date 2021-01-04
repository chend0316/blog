# 事件循环系统

不管是浏览器还是 Node 环境，都采用了单线程的执行模型（未来 JS 可能会有多线程，但不是现在），因此引入了事件队列/事件循环的概念。和多线程模型不同，在 JS 中如果某段代码执行时间过长是会阻塞线程的，在浏览器端体现为用户卡顿。

## 事件循环 & 消息队列
想要理解事件循环系统是必须要看源码的，它本质上就是死循环加上消息队列。

```cpp
while (1) {
    // 执行消息队列中的任务
    Task task = task_queue.takeTask();
    ProcessTask(task);
}
```

## setTimeout
在 JS 中的 `setTimeout()` 函数是如何实现的呢？

需要延迟的任务会放到单独的延迟队列。
```cpp
while (1) {
    // 执行消息队列中的任务
    Task task = task_queue.takeTask();
    ProcessTask(task);

    // 执行延迟队列中的任务
    ProcessDelayTask();
}
```
通过上面的代码可以看到，延迟队列的优先级是最高的，别的任务都要排队，而延迟队列是插队的。`ProcessDelayTask()`会将延迟队列中所有已经到期的任务拿出来执行。

### setTimeout 为何不准时？
先介绍一个专业基础知识。多线程模型中，一个任务执行到一半是可以被高优先级任务打断的。首先会保存当前的上下文信息，然后切换到高优先级任务执行。执行完毕后，恢复上下文信息，并继续执行低优先级任务。

但是事件循环系统不一样，它是单线程的，任务在执行的过程中是无法被打断的。因此如果当前任务执行时间太久，会导致定时器任务晚于预期时间才能得到执行。

### setTimeout 嵌套调用
如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒。

可以拿这段代码做实验，当嵌套调用次数超过 5 次，Chrome 会将最小时间间隔设置为 4 毫秒。
```javascript
let n = 10;
function cb() {
    if (n > 0) setTimeout(cb, 0);
    n--;
    console.log((new Date()).getMilliseconds());
}
setTimeout(cb, 0);
```

因此 `setTimeout()` 不适合用于做动画，可以用 `window.requestAnimationFrame()`。

## XMLHttpRequest
在 Ajax 编程中，我们通过 XHR 异步请求一个资源，JS 代码如下：
```javascript
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () { }
xhr.send();
```

浏览器内部也是通过事件循环系统实现的，渲染进程通过 IPC 通知网络进程加载资源。等资源加载完毕后，网络进程通过 IPC 往消息队列里面添加一个任务。

## 宏任务 & 微任务
只有 Promise 和 MutationObserver 可以创建微任务。

一个宏任务内对应一个微任务队列，只有所有微任务执行完毕这个宏任务才算完成。
