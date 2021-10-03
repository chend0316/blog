# Web 前端开发自学指南
## JavaScript
90 年代网景公司发明了 JavaScript 语言，紧接着微软也做了一个类似的语言，二者不兼容。后来 ECMA 才推出了 ECMAScript 标准，简称 ES。一般我们平时 ES 和 JS 说的都是同一个东西。

- 必学: ES5、ES6
- 必学: React，学 React 就行了，不要学 Vue、Angular
- 了解: Babel
- 了解: ESLint

## CSS
[web.dev](https://web.dev/) 网站上虽然是全英文的，但依然是首选学习资料。入门阶段先看 [CSS](https://web.dev/learn/css/)，其它的以后再看。

## 打包工具
Webpack 和 Rollup。在校脱产学习的话，肯定学不好。你也不可能在校招前把这个学精，所以学一些基本的使用就行了。

## Node.js
### 使用 JS 编写 Node 程序
用 JS 编写 Node 属于比较上层的开发。这种上层应用开发不用学的很精，等用到了再去查资料就可以。

必学:
- 去官网熟悉一下: [https://nodejs.org/](https://nodejs.org/)
- Express、Koa

选学:
- 如何做 React/Vue SSR (服务端渲染)
- 如何读写数据库
- GraphQL

### Node addons
使用 C++ 编写 Node 扩展。[https://github.com/nodejs/node-addon-examples](https://github.com/nodejs/node-addon-examples) 里面有很多 Demo，可以学一下这些代码。如果想学会，你还需要学习: C++、libuv、V8。

区别
- NAN 是比较老的技术
- node addon api 是给 C 语言用的
- N-API 是给 C++ 用的

开发环境挺难配的，可以参考:
- [如何方便快捷的进行 node-addons 开发](https://www.orrafy.com/posts/my/node-addons)
- [Node C++ 插件 Windows Electron 环境配置](https://juejin.cn/post/6844903981718700045)
- [https://nodejs.medium.com/building-modern-native-add-ons-for-node-js-in-2020-cd3992c68e0](https://nodejs.medium.com/building-modern-native-add-ons-for-node-js-in-2020-cd3992c68e0)

### libuv
可以在[http://nikhilm.github.io/uvbook/](http://nikhilm.github.io/uvbook/)学一下 libuv 编程，你需要使用 C 语言编写代码。遇到不懂的可以去 [libuv 官网](https://libuv.org/) 查资料。

### V8
官网: [https://v8.dev/](https://v8.dev/)

API 文档: [https://v8.github.io/api/head/](https://v8.github.io/api/head/)

## Electron
官网: [https://www.electronjs.org/](https://www.electronjs.org/)
