# 小实验：编译、链接

## 编译时链接静态库

若main.c想要使用外部库中的一些函数、变量，需要将其链接（Link）进来。

### 理论

### 库（Library）

在`/usr/lib/`目录下可以找到很多库，文件名形如`libxxx.so`或`libxxx.a`，那么这个库的名字就叫xxx。

#### 符号（Symbol）表

库和可执行文件都会有符号，在Linux下可以通过`nm`命令来查看一个文件的符号表。

#### C语言编译、链接过程

C代码首先会`编译`成为机器指令，函数和变量经过编译成为了符号，此时的符号都还没有分配具体的地址，因此是不可执行的。随后需要进行`链接`，链接会为符号分配地址，链接后得到的就是可执行文件了。
可以通过编译选项`gcc -l`链接外部库。

### 实践

这个实验主要是体会编译、链接这两个步骤。

#### 实验指导

对于这样的一个程序：

```c
#include <stdio.h>

const char *msg = "hello world!";

int main() {
    printf("%s\n", msg);
    return 0;
}
```

实验步骤：

* 编译但不链接：`gcc -c hello.c -o hello.o`，它会编译`hello.c`并生成`hello.o`文件。`-c`选项告诉`gcc`只编译不链接。
* 链接：`gcc hello.o -lc -o hello`，得到可执行文件`hello`。其中`-lc`是链接C标准库，`-lc`的意思是链一个叫做c的库，`-labc`的意思是链接一个叫做abc的库。

查看符号表，体会链接前后的差异（链接后符号分配了地址）：

* 执行`nm ./hello.o`
* 执行`nm ./hello`

#### 实验结果

* `hello.o`的符号表：

```
0000000000000000 T _main
0000000000000048 D _msg
                 U _printf  # 这个U的意思是undefined，未定义
```

* `hello`的符号表：

```
0000000100000f50 T _main
0000000100000fa2 S _msg
                 U _printf
```

## 如何创建库

链接分为动态链接和静态链接。静态库的文件名为`libxxx.a`，动态库的文件名为`libxxx.so`。

### 理论

#### 静态库

创建名为math的静态库，分编译、打包两个步骤：

* 第一步，编译，但不链接：`gcc -c infile.c -o outfile.o`
* 第二步，打包：`ar -rcs libmath.a outfile1.o outfile2.o`

#### 动态库

创建名为math的动态库：

* 第一步：`gcc -c -fPIC infile.c -o outfile.o`
* 其中`-fPIC`意思是生成位置无关码（Position Independent Code）
* 第二步：`ld -shared -soname libmath.so -o libmath.so outfile1.o outfile2.o`
* 可能还要配置`LD_LIBRARY_PATH`环境变量
* 可能还要执行`ldconfig`命令

### 实践

为了加深理解，尝试以下实验。

#### 实验指导

main.c代码如下：

```c
// main.c
#include <stdio.h>

int add(int a, int b);

int main() {
    printf("%d\n", add(1, 2));
    return 0;
}
```

math.c代码如下：

```c
int add(int a, int b) {
    return a + b;
}
```

创建动态库的步骤：

* `gcc -c -fPIC math.c -o math.o`
* `ld -shared -soname libmath.so -o libmath.so math.o`
* `gcc main.c -L./ -lmath -o main_shared`
* 运行：`LD_LIBRARY_PATH=$(pwd) ./main_shared`

创建静态库的步骤：

* `gcc -c math.c -o math.o`
* `ar -rcs libmath.a math.o`
* `gcc main.c -L./ -lmath -o main_static`
* 运行：`./main_static`

下面体会动态库和静态库的区别：

* 分别敲`ldd main_shared`和`ldd main_static`，体会二者区别
* 分别敲`ls -al ./main_shared`和`ls -al ./main_static`，体会两个文件的大小区别
* 分别敲`nm ./main_shared`和`nm ./main_static`，体会二者符号表的区别，重点关注`add`符号
* 删除`libmath.a`后`main_static`还能运行，但删除`libmath.so`后`main_shared`不能运行了
* 将`libmath.so`移动到其它目录后，必须相应更新`LD_LIBRARY_PATH`才能运行`main_shared`

实验注意事项：

* 如果同时有`libmath.so`和`libmath.a`，那么会优先使用`.so`，所以在做静态库实验时，确保已经删除了`libmath.so`

#### 实验结果

`main_shared`的符号表大概是这样的，其中`add`符号是未定义：

```
00000000000005a8 T _init
0000000000000600 T _start
                 U add
0000000000201010 b completed.7696
0000000000201000 W data_start
```

`main_static`大概是这样的，其中`add`符号有定义：

```
00000000000004f0 T _init
0000000000000540 T _start
0000000000000677 T add
0000000000201010 b completed.7696
0000000000201000 W data_start
```

`ldd main_shared`比`ldd main_static`多了一个东西：

```
# main_shared的结果
        linux-vdso.so.1 (0x00007fff06f13000)
        libmath.so => not found
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f7178212000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f7178805000)

# main_static的结果
        linux-vdso.so.1 (0x00007ffd0bd93000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f8b7c07e000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f8b7c671000)
```

## 运行时加载动态库

通过`dlopen()`在运行时加载动态库，也能做到调用动态库中提供的函数、变量，这比编译时链接要更加灵活。

### 理论

`dlfcn.h`中定义了一些函数，这些函数不是C标准库的一部分，因此想要用的话必须加上`-ldl`编译选项：

* `void *dlopen(const char *file, int mode);`，返回一个handle
* `void *dlsym(void *handle, const char *symbol_name);`，用于查询符号（即变量或函数）的地址
* `int dlclose(void *handle);`，库调用完后通过此函数关闭库
  `mode`参数分为：
* RTLD_LAZY
* RTLD_NOW
* RTLD_GLOBAL
* RTLD_LOCAL

### 实践

之前我们已经创建了`libmath.so`这个动态库，下面写一个`main.c`来调用math库中的add函数。

#### 实验指导

代码如下：

```c
#include <stdio.h>
#include <dlfcn.h>

int (*add)(int a, int b);

int main() {
    void *handle = dlopen("./libmath.so", RTLD_NOW);
    add = dlsym(handle, "add");
    if (add == NULL) {
        printf("error\n");
    } else {
        printf("%d\n", add(1, 2));
    }
    return 0;
}
```

实验步骤：

* 编译：`gcc main.c -ldl -o main`
* 运行：`./main`
