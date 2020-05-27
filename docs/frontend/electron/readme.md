## Electron的技术架构
下图是Chromium的架构图。主进程负责管理窗口、标签页、右键菜单等等，这一部分跟操作系统强相关。渲染进程负责网页的渲染，这一部分跟操作系统无关。

![](./img/chromium-arch.png)

下图是Electron的架构图，可以看到他的核心工作就是把Node.js塞进去。

![](./img/electron-arch.png)

技术难点：Node.js事件循环基于libuv，但Chromium基于message bump，而一个线程在同一时间只能运行一个事件循环。有两种思路来实现二者整合：
- 将Chromium集成到Node.js，即用libuv实现message bump，Node Webkit就是基于这个方案的
- 将Node.js集成到Chromium，这是Electron的做法

在渲染进程中libuv实现message bump比较简单。但是在主进程内，由于各个操作系统的GUI都不一样，Mac是NSRunLoop、Linux是glib，所以工程量很大而且各种边界情况都处理不好。

后来作者（todo: 此处作者指谁？）尝试用一个小间隔定时器轮询GUI事件，但是这样界面响应特别慢、CPU特别高。

后来libuv引入了backend_fd的概念，相当于是libuv轮询事件的文件描述符。通过轮询backend_fd可以知道libuv的一个新事件。这样就可以实现将Node.js集成到Chromium。

![](./img/chromium-electron.png)

