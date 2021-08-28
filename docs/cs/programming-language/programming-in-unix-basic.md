# Unix 环境编程入门
POSIX

## Hello World
编译型语言 (Compiled language): C/C++

解释型语言 (Interpreted Language): Python

但现代编程语言很多都分不清是编译型还是解释型: Java、JavaScript。Java 会先编译成字节码，然后用 Java 虚拟机解释执行。

二者区别: [英文阅读材料](https://www.geeksforgeeks.org/difference-between-compiled-and-interpreted-language/)

有同学可能会用是否存在 [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) 来区分二者，认为有 REPL 的语言是 Interpreted Language，这其实是一个误区。
- [Python 有 REPL](https://docs.python.org/3/tutorial/interpreter.html)，所以 Python 是 Interpreted Language
- C/C++ 没有 REPL，所以是 Compiled Language
- 这其实是误区，编译型语言也可以有 REPL

## 命令行程序
- 命令行参数 (command-line arguments)
- 进程退出码 (process exit code)
- 进程 ID (process id)
- main 函数

::: tip
在 macOS/Linux 下可以通过 `echo $?` 命令查看上一个进程的退出码，约定退出码为 0 表示程序正常退出。
:::

编译型语言一般用 main 函数的参数代表命令行参数，用 main 函数的返回值表示进程退出码。
::: details 例如 C 语言
[英文阅读材料](https://www.geeksforgeeks.org/command-line-arguments-in-c-cpp/)

```c
#include <stdio.h>

int main(int argc, char **argv) {
  // argc 表示命令行参数的个数，argv 表示命令行参数

  for (int i = 0; i < argc; i++) {
    printf("%s\n", argv[i]);
  }

  return 1; // 退出码是 1
}
```
:::

解释型语言也有各自的方法来表示命令行参数。
::: details 例如 Node.js
```javascript
for (const arg of process.argv) {
    console.log(arg);
}
process.exit(1); // 退出码是 1
```
:::

::: details 例如 Shell 脚本
```bash
#!/bin/bash
exit 1 # 退出码是 1
```
:::

::: details standard error codes
- 1 - Catchall for general errors
- 2 - Misuse of shell builtins (according to Bash documentation)
- 126 - Command invoked cannot execute
- 127 - “command not found”
- 128 - Invalid argument to exit
- 128+n - Fatal error signal “n”
- 130 - Script terminated by Control-C
- 255\* - Exit status out of range
:::

- [英文阅读材料](https://shapeshed.com/unix-exit-codes/)

## 进程退出
- 借助 Ctrl-C 讲解信号
- 异常退出，coredump 文件

## 标准输入、输出、错误流
[输出有颜色的文字](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)

## 环境变量
`getenv()`、`putenv()`、`environ`

## 系统调用
## 文件 I/O
### 文件描述符 (File Descriptor)
[英文阅读材料](https://www.computerhope.com/jargon/f/file-descriptor.htm)

### 打开、关闭文件
- `man 2 open`
- `man 2 close`
- `man 2 lseek`

process 结束的时候 Kernel 会自动 close process 打开的所有文件。

### 写文件
- `man 2 write`

## 进程

## 线程

## 网络 I/O
