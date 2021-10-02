# CSAPP

CSAPP 是 CMU 的一门课，课程编号是 CMU-213。本文是我看 CMU-213 做的笔记总结。
- B站可以看视频[【精校中英字幕】2015 CMU 15-213 CSAPP 深入理解计算机系统 课程视频](https://www.bilibili.com/video/BV1iW411d7hd)
- 课程主页: [https://www.cs.cmu.edu/~213/](https://www.cs.cmu.edu/~213/)

textbook:
- 《深入理解计算机系统》第三版
- Computer Systems: A Programmer's Perspective, 3/E

## Lecture 02
视频中一共讲了下面这些知识点，比较基础，书上都有。有基础的可以跳着看视频，然后过一遍书。

### 布尔代数
【textbook 2.1.1】因为二进制写起来太长太繁琐，所以我们通常用 16 进制来表示，对照表要背一下。

【textbook 2.1.6】介绍了与、或、非、异或四种布尔代数运算。

【textbook 2.1.7】在 C 语言中分别对应 `&` `|` `~` `^` 这四个运算符。

【textbook 2.1.8】C 语言初学者很容易将 `&&` 和 `&` 搞混。

### 移位操作
【textbook 2.1.9】算术右移在左边补符号位、逻辑右移在左边补 0。算术左移、逻辑左移没区别，都是在右边补 0。

### 整数的二进制表示
【textbook 2.2】直接看书吧。

