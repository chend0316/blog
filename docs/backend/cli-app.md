# 命令行程序
## 程序的输入、输出
### 命令行参数
编译型语言会通过 main 函数的一个参数来接收，例如 C 语言: `main(int argc, char **argv)`

脚本语言有各种办法，例如：
- Node.js: `process.argv` 数组

#### CLI Api
Linux 下有个习俗，用 `--argument` 表示长命令，用 `-a` 表示短命令。想要实现这个功能不是很容易，可以借助一些第三方库。

Node.js 流行的库:
- commander
- yargs
- minimist

### 程序退出
#### 退出码
进程退出的时候会有退出码，在 Linux 下通过 `echo $?` 查看上一个命令的退出码，0 表示成功，其它表示失败。

C 语言:
- main 函数 return 的值就是退出码
- 标准库提供的 `exit()` 函数退出进程

脚本语言没有 main 函数的概念，如 Node.js 使用 `process.exit()` 退出进程

#### 异常退出

### 输入输出流
我们会在控制台打印一些文字、表情。

打印有颜色的文字。

### 信号
我们平时通过 Ctrl+C 终止一个程序其实就是给程序发了一个 Signal。
