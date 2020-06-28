
Java和TS的static成员无法使用类的类型参数，见《TIJ4》ch15ex5。

TS在实例化的时候可以不传入类型参数，这时候类型是any。

TS有泛型约束的概念。
```ts
interface Length {
  length: number;
}
function log<T extends Length>(value: T): T {
  console.log(value, value.length);
  return value;
}
log([1]) // 数组有length属性
log('123') // 字符串有length属性
log(1) // 报错
```

静态成员不能访问类的类型参数，如下。

> As we covered in [our section on classes](https://www.typescriptlang.org/docs/handbook/classes.html), a class has two sides to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.
