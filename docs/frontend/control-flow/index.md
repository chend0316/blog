# 程序控制流 (Promise、Observable)
经典的程序控制流程更贴近汇编语言：
- 顺序、分支、循环
- 函数调用
- 异常处理

但是随着业务越来越复杂，现代编程语言出现了几个新的控制流程：

- 协程/Generator
- Promise
- Observable

人们进行升维思考，也提出了一些新的理论：

- 程序无非就是数据的流动和加工
- 生产者产生数据，消费者消费/加工数据
- 生产者和消费者之间有两种通信模型：Pull模型、Push模型

|                 | 返回值数量 | 同步、异步 | PULL、PUSH | 惰性求值 |
| --------------- | ---------- | ---------- | ---------- | -------- |
| 函数调用        | 1          | 同步       | PULL       | 惰性求值 |
| 协程、Generator | 多个       | 同步       | PULL       | 惰性求值 |
| Promise         | 1          | 异步       | PUSH       | 立即求值 |
| Observable      | 多个       | 同步或异步 | PUSH       | 惰性求值 |

## 复习 Promise

下面这段代码体现了 Promise 的几个特性：异步、立即求值。

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log('111');  // 111 比 222 先输出，所以是立即求值
  resolve('444');  // 最后输出，所以是异步
});
console.log('222');
promise1.then((value) => {
  console.log(value);
});
console.log('333');
```

相比之下，Observable 就是同步、惰性求值的。

```javascript
import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  console.log('222');  // 222 比 111 后输出，所以是惰性求值
  subscriber.next('333');  // 比 444 先输出，所以是同步
});
console.log('111');
observable.subscribe((value) => {
  console.log(value)
});
console.log('444');
```

## 概念和名词解释
- Observable 是数据的生产者
- Observer 是数据的消费者: `observable.subscribe(observer);`
- Operators 就是函数，分为 Pipeable Operators、Creation Operators 两种
- Pipeable Operations `observableInstance.pipe(operator())`

Pipeable Operation 是纯 (Pure) 的，会创建新的 Observable，不会修改原来的 Observable。 

Creation Operator 用于创建 Observable。
