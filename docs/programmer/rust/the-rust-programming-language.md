# The Rust Programming Language

这本书可以在官网免费阅读[英文版](https://doc.rust-lang.org/book/title-page.html)，在微信读书阅读中文版《Rust权威指南》。

## 3. Common Programming Concepts
### 3.1. Variables and Mutability
### 3.2. Data Types
### 3.3. Functions
### 3.4. Comments
### 3.5. Control Flow

## 4. Understanding Ownership
### 4.1 What is Ownership?
#### The Stack and the Heap

|              | stack                                                    | heap                                                         |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| 内存分配方式 | 值直接存在函数调用栈帧上，移动栈顶指针就可以分配内存     | 值存在堆上面，值的引用(指针)存在栈上面，需要通过系统调用申请堆上的内存 |
| 内存清理方式 | 函数return时，栈帧直接被回收                             | 需要通过系统调用回收内存，少调内存泄露，多调程序崩溃         |
| 大小         | 只有编译期确定大小的值能存在栈上，如基本数据类型、指针等 |                                                              |
| 速度         |                                                          | 指针跳转存在开销、堆上存放比较分散不利于CPU缓存、内存清理需要系统调用 |

#### Ownership Rules

这三个规则极其重要

- Each value in Rust has a variable that’s called its *owner*.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

#### Variable Scope

变量作用域的概念和其它语言是一样的。

#### The String Type

后续的 demo 将通过 `String::from()` 创建字符串来研究 Ownership，由于其大小是动态的所以肯定存在堆上。

```rust
let s = String::from("hello");
s.push_str(" world");
```

#### Memory and Allocation

放在堆上的内存需要释放，如果像 C 语言那样由程序员手动释放的话，很容易出错。多释放会导致程序崩溃，少释放会导致内存泄露。

所以目前大多语言都实现了 GC，不需要程序员手动管理内存。

但 Rust 和其它语言不太一样，是在变量离开作用域的时候自动释放的，这一点其实借鉴了 C++ 的 RAII。

```rust
{
  let s = String::from("hello");
} // s 离开作用域了，Rust 会自动调用 s.drop() 方法
```

这套机制看起来很简单，但实际情况比这更加复杂，特别是多个变量引用同一个堆内存的时候。所以 Rust 要引入 Ownership 的概念，这也是我们接下来要学习的重点。

#### Move, Clone, Copy
这部分内容请直接看书。

#### Function
这部分内容请直接看书。

### 4.2. References and Borrowing

```rust
fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("The length of '{}' is {}.", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len();
    (s, length)
}
```

上面这段代码为了让 main 函数继续拥有 ownership 写的太冗长了，其实可以使用 Reference，这可以避免 ownership move。代码如下，这个操作叫做 borrowing。

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because it does not have ownership of what
  // it refers to, nothing happens.
```

#### Mutable References
接下来书上介绍了可变引用，以及可变引用的限制。

But mutable references have one big restriction: you can have only one mutable reference to a particular piece of data in a particular scope. This code will fail:

这个限制是为了能在编译期杜绝 data races，这个概念跟 race condition 有点类似。以下三个要求同时满足时会发生 data races。
- Two or more pointers access the same data at the same time.
- At least one of the pointers is being used to write to the data.
- There’s no mechanism being used to synchronize access to the data.

下面这段代码有多个不可变引用，但不会导致 data races，可以通过编译。
```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
```

下面这段代码，因为同时存在不可变引用和可变引用，可能会导致 data races，所以不能通过编译。
```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
let r3 = &mut s; // BIG PROBLEM
```

#### Dangling References
悬挂指针是访问一个已经被释放的内存地址。

下面这段代码是有问题的，Rust 也会在编译期检查到悬挂指针问题而报错。

```rust
fn main() {
    let reference_to_nothing = dangle();
    // reference_to_nothing 指向一个已经被释放的内存
}

fn dangle() -> &String {
    let s = String::from("hello");
    &s
}  // 返回的是引用，不会把 ownership 转移出去，所以变量 s 是 owner
   // 当 s 离开作用域了，会释放 "hello" 字符串的内存
```

### 4.3 The Slice Type
直接看原文吧。

## 5. Structs
### 5.1 Defining and Instantiating Structs
这部分比较简单，自己看原文学吧。

#### 两种语法糖
- Field Init Shorthand
- Struct Update Syntax

#### 两种特别的结构体
- Tuple Structs 可以创建没有字段名的结构体
- Unit-Like Structs 可以创建没有字段的结构体

#### Ownership & Lifetime
下面这段代码会报错，因为 `email: &str` 是 borrow (借用)。改成 `email: String` 就可以了，因为这是 move (挪用)。如果不想改 `&str` 那么就要用 lifetime 了，这个知识后面的章节会讲。

```rust
struct User {
    username: &str,
    email: &str,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let user1 = User {
        email: "someone@example.com",
        username: "someusername123",
        active: true,
        sign_in_count: 1,
    };
}
```

### 5.2 An Example Program Using Structs

### 5.3 Method
#### Defining Methods
Rust 定义 method 的语法跟 Python 有点类似，第一个参数一定是 self。

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 最常见的写法，take ownership
    fn area1(&self) -> u32 {
        self.width * self.height
    }

    // 等价于 area1
    fn area2(self: &Rectangle) -> u32 {
        self.width * self.height
    }

    // take ownership
    fn area3(self) -> u32 {
        self.width * self.height
    }

    // 等价于 area3
    fn area4(self: Rectangle) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    println!("{}", rect.area1());
    println!("{}", rect.area2());
    println!("{}", rect.area3());
    println!("{}", rect.area4()); // error[E0382]: use of moved value: `rect`
}
```

#### Associated Functions
定义的时候没有 `self` 参数，调用的时候用双冒号 `Rectangle::square(3);`，跟其它语言的静态方法很像。
