# 前端学习知识路线
## Babel

最小工程：
- `npm i @babel/core` 是肯定要安装的
- .babelrc 配置文件肯定要配的
- 配置文件里面肯定要配置 presets/plugins，否则无任何功能

[Babel 在线 REPL](https://babeljs.io/repl/)上可以快速学习、验证知识点。

本地开发有一些快捷实用的命令，通过 `npm i babel-cli` 安装 `babel` 和 `babel-node` 命令。
- `babel` 命令可以直接编译 JS 文件
- `babel-node` 命令可以直接在 Node 环境直接运行 JS 文件

在工程上一般会使用 Webpack 结合 Babel 使用，`npm i babel-loader`。

高级用户可能想通过 JS 直接调用 Babel API 来实现一些复杂的需求，那么可以 `import { transform } from "@babel/core";` 然后调用 `transform` 函数。
