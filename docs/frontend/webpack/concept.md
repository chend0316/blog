# 核心概念

## 基础概念
### entry、output
略

### loader、plugin
略

### Source Map
略

### 文件指纹
文件指纹会在文件名上加一段 Hash 值，防止因为缓存机制导致浏览器使用旧的资源。

### 配置文件
要理解 Webpack 的配置文件也是 JS 文件，它会被 Node.js 执行，所以可以使用 `require()` 导入社区第三方的包。

对于中大型系统，构建的需求会很复杂，这时候可以充分利用“配置文件也是 JS 代码”这一点来实现各种灵活的需求。

## 高级概念
### 热更新
略。

### Webpack API
我们通常是编写配置文件，然后执行 webpack 命令进行打包。而 Webpack API 是反过来的，由另一个系统调用 Webpack 进行打包，可以用于集成到现有工具链中。

### JS 动态加载
JS 动态加载可以提升首屏加载速度，也叫做按需加载、懒加载。在 CommonJS 中，可以通过 `require.ensure` 动态加载。ES Modules 中，可以通过 `import('./test.js')` 动态加载。

Webpack 会将动态加载的脚本提取到独立的文件，运行时通过 JSONP 动态加载脚本。

### 代码分割
如果两个文件都 import 了同一段代码，那么就会有重复的公共代码，可以使用 SplitChunksPlugin 将公共代码分离，节约体积。

### Tree Shaking
如果启用了 Tree Shaking，Webpack 会在编译阶段通过死码消除 (Dead code elimination) 技术，将没有用到的代码删掉，以便减小体积。

Tree Shaking 只支持 ES Modules，不支持 CommonJS。因为 ES Modules 是静态导入 (static import)，这有助于提升系统的自省 (introspection) 能力，帮助工具更好的进行静态代码分析。[Stack Overflow](https://stackoverflow.com/questions/52965907/what-is-the-meaning-of-static-import-in-es6) 上有一个回答讲的很好。

Webpack 在 `mode = 'production'` 模式下，会默认开启 Tree Shaking。

### Scope Hoisting
Webpack 构建后的代码存在大量闭包代码，会导致：
- 代码体积更大
- 函数作用域变多，内存开销变大，执行速度变慢

Webpack 为什么会创建那么多闭包呢？因为 Webpack 将每个 import 进来的模块包裹在 [IIFE](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F) 里面，避免变量名冲突。

Scope Hoisting 是怎么减少闭包的呢？
- 按照模块引用顺序将模块代码放在同一个函数作用域内 (有向图的拓扑排序)
- 对变量适当重命名，防止模块之间的变量名冲突

[Webpack 官网](https://webpack.js.org/configuration/mode/)说了，在 `mode = 'production'` 模式下，会默认开启 [ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)，这就启用了 Scope Hoisting。

和 Tree Shaking 一样，只支持 ES Modules，不支持 CommonJS，因为前者是 static import。
