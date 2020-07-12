# C++ RAII 内存管理

## 使用堆（Heap）容易遗漏 delete
在 C 语言中，如果使用 `malloc()` 和 `free()` 不配对，那么就会导致内存泄漏。C++ 中也一样需要 `new` 和 `delete` 配对。

看起来 `new` 和 `delete` 配对非常简单，但实际上往往非常容易遗漏 `delete` 导致内存泄漏。

例如这段代码，虽然看起来很简单，但省略号的部分可能抛出异常，导致 delete 得不到执行：
```cpp
void foo() {
  Person* ptr = new Person();
  // ...
  delete ptr;
}
```

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

## C++ 栈展开（stack unwinding）
C++ 里有一个 POD 类型（Plain Old Data）的概念，表示的是简单的类型，如：int、float等。

对于 POD 类型，栈帧弹出后栈空间会自动被销毁，这样的机制决定了栈天生就没有内存泄漏的问题。

然而对于有构造和析构函数的非 POD 类型，并不是只需要释放了栈内存就够了，还需要调用析构函数。对此，C++ 编译器会在代码的合适位置，调用构造和析构函数。确保所有函数出口（函数return、函数抛出异常）都会调用析构函数，我们把这叫栈展开。

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

在析构函数里做必要的清理工作，这就是 RAII 的基本用法。这种清理并不限于释放内存，也可以是：

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

顺便说一句，上面的 shape_wrapper 差不多就是个最简单的智能指针了。
