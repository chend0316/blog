# 开发环境搭建

## Electron + Vue 环境搭建
虽然这里介绍的是Vue，但React、Angular等其他前端框架原理是一样的。

### 目录结构
Electron分为主进程和渲染进程，Vue运行在渲染进程。二者的代码是分开存放的，一般我们约定的工程目录结构如下：
```
src/ 
  |-- main/  # 这是主进程代码，这部分代码可以参考Electron文档，比较死板
    |-- main.js
  |-- renderer/  # 这部分代码结构非常灵活，根据框架和习惯的不同差异很大，没有统一标准
    |-- dist/  # 本文约定build出来的资源文件放在这个目录
    |-- App.vue
    |-- app.js
    |-- package.json
  |-- package.json
```
注意外层的package.json是Electron工程的，而内层的package.json是Vue工程的，使用的时候注意不要搞混。

### 原理和背景知识
Electron在主进程中通过`BrowserWindow.loadFile`或`BrowserWindow.loadURL`加载页面。

我们可以通过`vue-cli`快速创建Vue工程，也可以手动配置Webpack配置。在开发环境一般会通过`webpack-dev-server`启动一个HTTP服务器，比如监听在`http://localhost:8080`。而在生产环境会通过`webpack`进行打包，生成HTML、JS等文件。

### 生产环境（todo以后再补充）
首先需要约定Vue工程build出来的HTML文件放在哪里，然后在主进程中通过`BrowserWindow.loadFile`加载。

### 开发环境
在主进程中通过`BrowserWindow.loadURL('http://localhost:8080')`加载Vue页面，但在此之前需要先启动Vue项目，这就有个时序问题了。

首先通过执行内层package.json的命令启动Vue项目。等待Vue启动成功后，新开一个控制台，执行外层package.json的命令启动Electron。

这样就需要打开2个控制台，敲2个命令，而且还有顺序要求。如果你嫌每次这样做很麻烦，那么可以借助[wait-on](https://www.npmjs.com/package/wait-on)和[concurrently](https://www.npmjs.com/package/concurrently)，让命令自动化程度更高一些。
