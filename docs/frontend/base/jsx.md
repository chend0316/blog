# JSX
JSX 改变了语法
- 对 IDE 的代码高亮、代码建议、代码重构、代码跳转等功能都有影响，好在 VSCode、WebStorm 都对 JSX 有很好的支持
- JSX 是 Facebook 自己弄的一个[规范](https://facebook.github.io/jsx/)，这个规范无意并入 ECMAScript，语法是 ES6 的扩充
- JSX 需要编译，今天一般用 Babel 编译

虽然 Template Literials 很适合用于实现 JSX 这种 DSL，优点是可以在运行时实现，无需编译。但 [JSX 规范](https://facebook.github.io/jsx/)也指出 Template Literials 存在较大的缺点，即: 需要实现一个完整的 JS 语法 + JSX 语法，工作量大，且和 JS 引擎的工作重复了。

我认为 Template Literials 还有一个缺点 JSX 规范没提到: 无法访问局部变量。这是因为 Template Literials 本质就是个函数而已，如我的理解有误，欢迎指出。

```js
// Template Literals，无法访问 loading 变量
var loading = false;
var box = jsx`
  <Box>
    {
      loading ?
      <div>loading...</div> :
      <div>Text Content</div>
    }
  </Box>
`;

// JSX，可以访问 loading 变量
var loading = false;
var box = <Box>
    {
      loading ?
      <div>loading...</div> :
      <div>Text Content</div>
    }
  </Box>;
```

## 使用 Webpack + Babel 编译 JSX
- 安装 Webpack 5: `npm i -D webpack webpack-cli`
- 安装 Babel: `npm i -D @babel/core`
- 安装 Babel 的 JSX 插件: `npm i -D @babel/plugin-transform-react-jsx`
- 为了能在 Webpack 中使用 Babel，安装: `npm i -D babel-loader`
- 在 Webpack 中配置 babel-loader
