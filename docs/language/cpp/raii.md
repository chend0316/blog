# C++内存管理（RAII）

## 堆（Heap）

在堆上分配内存也叫做动态内存分配，这比较灵活。分配之后需要手工释放，否则就会造成内存泄漏。

在 C++ 标准中，更准确的叫法是自由存储区（free store），但通常它的底层实现也是堆，所以区分自由存储区和堆的意义不大。

在 C 语言中，我们使用 `malloc()` 分配堆空间，使用 `free()` 释放堆空间。

有些语言使用 new 这样的关键字分配内存：
- C++：`auto list = new std::vector<int>();`
- Java：`ArrayList<int> list = new ArrayList<int>();`

有些语言把 new 关键字省略了：
- Python：`lst = list()`

不管是哪种语言，都会牵涉到三个可能的内存管理器的操作： 
1. 让内存管理器分配一个某个大小的内存块 
2. 让内存管理器释放一个之前分配的内存块 
3. 让内存管理器进行垃圾收集操作，寻找不再使用的内存块并予以释放

C++ 通常会做上面的操作 1 和 2。Java 会做上面的操作 1 和 3。而 Python 会做上面的操作 1、2、3。这是语言的特性和实现方式决定的。

上面这三个操作看似简单，实际上水很深，如果不懂请补习操作系统课程：
- 分配内存时需要找一块最合适的内存标记为已用，有许多算法用于寻找合适的内存块
- 实际分配的内存通常会比申请的大，而且地址是对齐的
- 释放内存时要考虑合并连续未使用的内存块
- 垃圾回收是最复杂的，可单独作为一门研究生课程，这里不展开介绍

每一个 new 都要对应一个 delete 来释放空间，这看起来很简单但实际上非常容易遗漏 delete 导致内存泄漏。

例如这段代码：

```cpp
void foo() {
  Person* ptr = new Person();
  // ...
  delete ptr;
}
```

虽然这段代码看起来很简单，但省略号的部分可能抛出异常，导致 delete 得不到执行。

另一种情况是分配和释放不在一个函数里，就非常容易漏掉 delete。比如下面这段示例代码：

```cpp
bar* make_bar(...) {
  bar* ptr = new bar();
  return ptr;
}

void foo() {
  bar* ptr = make_bar()
  // ...
  delete ptr;
}
```

## 栈（Stack）

局部变量存放在栈上，栈的分配和释放都非常简单，只要移动栈顶指针即可。栈的工作原理决定它天生不存在内存碎片和内存泄漏的情况。

但是函数返回后栈空间就被释放了，许多场景不适用。

### 栈的分配和释放

我们先来看一段示例代码，来说明 C++ 里函数调用、本地变量是如何使用栈的。当然，这一过程取决于计算机的实际架构，具体细节可能有所不同，但原理上都是相通的，都会使用一个后进先出的结构。

```cpp
void foo(int n)
{
  // ...
}

void bar(int n)
{
  int a = n + 1;
  foo(a);
}

int main()
{
  // ...
  bar(42);
  // ...
}
```

这段代码执行过程中的栈变化，我画了下面这张图来表示：

![img](https://static001.geekbang.org/resource/image/ef/7a/ef5c5e6a1032006051e3347a24eab17a.png)

在我们的示例中，栈是向上增长的。在包括 x86 在内的大部分计算机体系架构中，栈的增长方向是低地址，因而上方意味着低地址。任何一个函数，根据架构的约定，只能使用进入函数时栈指针向上部分的栈空间。当函数调用另外一个函数时，会把参数也压入栈里（我们此处忽略使用寄存器传递参数的情况），然后把下一行汇编指令的地址压入栈，并跳转到新的函数。新的函数进入后，首先做一些必须的保存工作，然后会调整栈指针，**分配出本地变量所需的空间**，随后执行函数中的代码，并在执行完毕之后，根据调用者压入栈的地址，返回到调用者未执行的代码中继续执行。

顺便说一句，图 2 中每种颜色都表示某个函数占用的栈空间。这部分空间有个特定的术语，叫做栈帧（stack frame）。GCC 和 Clang 的命令行参数中提到 frame 的，如 -fomit-frame-pointer，一般就是指栈帧。

### 实验：利用栈的特性访问调用函数的局部变量

### 实验：栈展开

前面例子的本地变量是简单类型，C++ 里称之为 POD 类型（Plain Old Data）。对于有构造和析构函数的非 POD 类型，栈上的内存分配也同样有效，只不过 C++ 编译器会在生成代码的合适位置，插入对构造和析构函数的调用。

这里尤其重要的是：编译器会自动调用析构函数，包括在函数执行发生异常的情况。在发生异常时对析构函数的调用，还有一个专门的术语，叫栈展开（stack unwinding）。事实上，如果你用 MSVC 编译含异常的 C++ 代码，但没有使用上一讲说过的 /EHsc 参数，编译器就会报告：

warning C4530: C++ exception handler used, but unwind semantics are not enabled. Specify /EHsc

下面是一段简短的代码，可以演示栈展开：

```cpp
#include <stdio.h>

class Obj {
public:
  Obj() { puts("Obj()"); }
  ~Obj() { puts("~Obj()"); }
};

void foo(int n)
{
  Obj obj;
  if (n == 42)
    throw "life, the universe and everything";
}

int main()
{
  try {
    foo(41);
    foo(42);
  }
  catch (const char* s) {
    puts(s);
  }
}
```

执行代码的结果是：

Obj()

~Obj()

Obj()

~Obj()

life, the universe and everything

也就是说，不管是否发生了异常，obj 的析构函数都会得到执行。

对堆和栈有了基本了解之后，我们继续往下，聊一聊 C++ 的重要特性 RAII。

## RAII
RAII (Resource Acquisition Is Initialization) 是 C++ 所特有的资源管理方式。有少量其他语言，如 D、Ada 和 Rust 也采纳了 RAII。

RAII 依托栈和析构函数，来管理所有的资源（甚至包括堆内存）。因为 RAII 的存在，所以在 C++ 中垃圾收集并不流行。

C++ 支持将对象存储在栈上面。但是，在很多情况下，对象不能，或不应该，存储在栈上。比如：

- 对象很大；
- 对象的大小在编译时不能确定；
- 对象是函数的返回值，但由于特殊的原因，不应使用对象的值返回。


常见情况之一是，在工厂方法或其他面向对象编程的情况下，返回值类型是基类。下面的例子，是对工厂方法的简单演示：

```cpp
enum class shape_type {
  circle,
  triangle,
  rectangle,
};

class shape { };
class circle: public shape { };
class triangle: public shape { };
class rectangle: public shape { };

shape* create_shape(shape_type type) {
  switch (type) {
  case shape_type::circle:
    return new circle();
  case shape_type::triangle:
    return new triangle();
  case shape_type::rectangle:
    return new rectangle();
  }
}
```

这个 create_shape 方法会返回一个 shape 对象，对象的实际类型是某个 shape 的子类，圆啊，三角形啊，矩形啊，等等。这种情况下，函数的返回值只能是指针或其变体形式。如果返回类型是 shape，实际却返回一个 circle，编译器不会报错，但结果多半是错的。这种现象叫对象切片（object slicing），是 C++ 特有的一种编码错误。这种错误不是语法错误，而是一个对象复制相关的语义错误，也算是 C++ 的一个陷阱了，大家需要小心这个问题。

那么，我们怎样才能确保，在使用 create_shape 的返回值时不会发生内存泄漏呢？

答案就在析构函数和它的栈展开行为上。我们只需要把这个返回值放到一个本地变量里，并确保其析构函数会删除该对象即可。一个简单的实现如下所示：

```cpp
class shape_wrapper {
public:
  explicit shape_wrapper(shape* ptr = nullptr)
    : ptr_(ptr) {}

  ~shape_wrapper() {
    delete ptr_;
  }

  shape* get() const { return ptr_; }

private:
  shape* ptr_;
};

void foo() {
  shape_wrapper ptr_wrapper(create_shape());
}
```

如果你好奇 delete 空指针会发生什么的话，那答案是，这是一个合法的空操作。在 new 一个对象和 delete 一个指针时编译器需要干不少活的，它们大致可以如下翻译：

```cpp
// new circle()
{
  void* temp = operator new(sizeof(circle));
  try {
    circle* ptr = static_cast<circle*>(temp);
    ptr->circle();
    return ptr;
  } catch () {
    operator delete(ptr);
    throw;
  }
}

if (ptr != nullptr) {
  ptr->~shape();
  operator delete(ptr);
}
```

也就是说，new 的时候先分配内存（失败时整个操作失败并向外抛出异常，通常是 bad_alloc），然后在这个结果指针上构造对象（注意上面示意中的调用构造函数并不是合法的 C++ 代码）；构造成功则 new 操作整体完成，否则释放刚分配的内存并继续向外抛构造函数产生的异常。delete 时则判断指针是否为空，在指针不为空时调用析构函数并释放之前分配的内存。

回到 shape_wrapper 和它的析构行为。在析构函数里做必要的清理工作，这就是 RAII 的基本用法。这种清理并不限于释放内存，也可以是：

- 关闭文件（fstream 的析构就会这么做）
- 释放同步锁
- 释放其他重要的系统资源

例如，我们应该使用：

```cpp
std::mutex mtx;

void some_func() {
  std::lock_guard<std::mutex> guard(mtx);
  //  做需要同步的工作
}
```

而不是：

```cpp
std::mutex mtx;
void some_func() {
  mtx.lock();
  //  做需要同步的工作……
  //  如果发生异常或提前返回，
  //  下面这句不会自动执行。
  mtx.unlock();
}
```

顺便说一句，上面的 shape_wrapper 差不多就是个最简单的智能指针了。至于完整的智能指针，我们留到下一讲继续学习。

## 内容小结

本讲我们讨论了 C++ 里内存管理的一些基本概念，强调栈是 C++ 里最“自然”的内存使用方式，并且，使用基于栈和析构函数的 RAII，可以有效地对包括堆内存在内的系统资源进行统一管理。

## 参考资料

[1] Wikipedia, “Memory management”. https://en.wikipedia.org/wiki/Memory_management

[2] Wikipedia, “Stack-based memory allocation”. https://en.wikipedia.org/wiki/Stack-based_memory_allocation

[3] Wikipedia, “Resource acquisition is initialization”. https://en.wikipedia.org/wiki/RAII

[3a] 维基百科, “RAII”. https://zh.wikipedia.org/zh-cn/RAII

[4] Wikipedia, “Call stack”. https://en.wikipedia.org/wiki/Call_stack

[5] Wikipedia, “Object slicing”. https://en.wikipedia.org/wiki/Object_slicing

[6] Stack Overflow, “Why does the stack address grow towards decreasing memory addresses?” https://stackoverflow.com/questions/4560720/why-does-the-stack-address-grow-towards-decreasing-memory-addresses

