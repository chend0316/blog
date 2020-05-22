# TypeScript
## 从JS到TS
### 类型注解
TS中类型注解以冒号的形式放在变量或函数定义的后面，会对编译阶段产生影响。

TS的类型检查并不是万能的，对于这种情况就无法检查（为什么呢）：
```ts
let tuple: [number, string] = [0, '1']
tuple.push(2)  // 使用push可以绕开TS的类型检查，实际开发中不建议这样用
```

### 类型推断
有些地方就算不显式类型注解，TS也能对类型进行推断。

### 接口
类型、类型、类型。。。如果同样的类型注解反复出现，那么就抽象成一个接口，这是一种代码复用。

TS接口通过[鸭式辩型法]()来判断类型，这是动态类型语言（Python, Perl, Ruby, PHP, Javascript）判断类型的手段。

但对于字面量，TS不会采用鸭式辩型法：
```ts
interface Person {
    name: string;
    age: number;
}
let p: Person
let p2 = {
    name: 'li',
    age: 19,
    addr: 'shanghai'
}
p = p2  // 成功
p = {
    name: 'li',
    age: 19,
    addr: 'shanghai'  // 失败
}
```
