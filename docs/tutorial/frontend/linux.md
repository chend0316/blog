# Linux 使用

## Linux 基本操作

- `man man`
- gcc

### 软件安装
- 手动安装软件
- PATH 环境变量
- 编译软件源码
- 使用软件管理工具:
  - Mac 同学: [brew](https://brew.sh/)
  - Ubuntu 同学: apt

## 信号 (Signal)
Linux 下通过 `kill` 命令给进程发送信号或关闭进程。

执行 `man kill` 可以看这个命令的用法。

```plain
NAME
     kill -- terminate or signal a process

SYNOPSIS
     kill [-s signal_name] pid ...
     kill -l [exit_status]
     kill -signal_name pid ...
     kill -signal_number pid ...

EXAMPLES
     Terminate the processes with PIDs 142 and 157:

           kill 142 157

     Send the hangup signal (SIGHUP) to the process with PID 507:

           kill -s HUP 507
```

### Signal 的产生
- 在终端输入某些组合键的时候，会给进程发送信号，例如，Ctrl+C 产生 SIGINT 信号，Ctrl+Z 产生 SIGTSTP 信号
- 硬件异常也会产生信号。比如，执行了除以 0 的指令，CPU 会产生异常，然后把 SIGFPE 信号发送给进程。再如，访问了非法内存，内存管理模块就会产生异常，然后把信号 SIGSEGV 发送给进程

#### SIGFPE
C 语言除零的结果是未知的，所以说 C 语言不安全，如果程序员写代码不小心除了 0，那后果是不可控的。

后来的语言: Java、Python 在除零的时候直接抛异常。也有一些语言，如 JavaScript，除零的结果是无穷大。

```c
#include <stdio.h>
int main() {
    int a = 1 / 0;
    printf("%d\n", a);
    return 0;
}
```

#### SIGSEGV
```c
#include <stdio.h>
int main() {
    int *a;
    a = 0;
    printf("%d\n", *a);
    return 0;
}
```

### Signal 的种类
Linux 下敲: `man 7 signal`，或者谷歌搜 「linux signal man 7」。

::: details 小作业
之前我们接触过了 SIGFPE 和 SIGSEGV 这两个 Signal，请查阅文档，回答以下问题：
- SIGFPE 是哪些单词的缩写？
- SIGSEGV 表示出了什么错？
- SIGSEGV 是哪些单词的缩写？这个问题可能在文档中找不到答案。
:::

## 管道 (Pipe)

在 Linux 下我们常用“竖线”把两个命令连起来，这个“竖线”就是一种匿名管道 (Anonymous Pipes)。管道这个词非常形象，它有两个端口，一端用于读取，另一端用于写入。
