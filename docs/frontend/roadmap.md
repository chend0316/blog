# 技术发展路线

## CSS 组件化
传统 CSS 痛点：
- 全局污染，class名称比较简单时，容易引起选择器冲突，导致样式互相影响
- class命名混乱，因为全局污染，所以日常起class名称时会尽量加长，但很容易导致命名风格不统一
- 代码复用困难，有时虽然知道项目上已有一些相似的样式，但因为怕互相影响不敢复用，导致代码冗余

技术路线：
- SASS、LESS，在 CSS 语法上扩展，提供了变量、简单函数、运算、继承等机制
- BEM (.block__element--modifier)，只是一种命名规则约定
- CSS Modules，将 CSS 文件以模块的形式引入到 JavaScript 里

|             | **全局污染** | class命名混乱 | 代码复用困难 | 引入的新问题    |
| ----------- | ------------ | ------------- | ------------ | --------------- |
| SASS、LESS  |              |               | 解决         |                 |
| BEM         | 解决         | 解决          |              | class命名太长了 |
| CSS Modules | 解决         | 解决          | 解决         | CSS只能嵌套一层 |
|             |              |               |              |                 |
|             |              |               |              |                 |

### styled-components

对代码入侵太强了。

```javascript
import React from "react";
import styled from "styled-components";

export default function App() {
  const Title = styled.h1`
    text-align: center;
  `;
  return (
    <div className="App">
      <Title>Hello</Title>
    </div>
  );
}
```

## 工程化

### Babel
Babel 本质上是一个编译器。实现的功能归纳起来就分为两个：code optimize、code transform。

### babel-plugin-macro
Babel 的配置是全局的，放在`.babelrc`或`webpack.config.js`里面，这个范围太大了，是整个工程级别的。
- 多个插件在同一个 AST 上一起工作，可能相互冲突
- 程序员阅读代码的时候很难搞懂代码是如何工作的，因为不知道哪些插件会处理当前文件

为了解决这个问题，2017年出现了 Babel Macro。
