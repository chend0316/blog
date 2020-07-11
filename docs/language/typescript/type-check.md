# TypeScript类型检查机制
类型检查机制可以辅助开发、增强代码安全性。

## Type Inference（类型推断）
- Basics：最基本的类型推断
- Best common type
- Contextual Typing：上下文类型推断比较牛，可以实现“从左到右”的类型推断，即根据left-value去推断right-value的类型，常用于right-value为函数表达式的情况

## Type Compatibility（类型兼容性）
参考：https://www.typescriptlang.org/docs/handbook/type-compatibility.html

## Type Guards（类型保护）
一共有4种类型保护手段：
- 使用类型谓词（type predicates）
- 使用`in`关键字
- 使用`typeof`关键字
- 使用`instanceof`关键字

参考：https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
