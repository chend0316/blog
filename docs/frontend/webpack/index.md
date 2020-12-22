# Webpack

按照历史发展顺序：
- 手工进行代码混淆、代码压缩时代
- Grunt
- Gulp
- Rollup、Webpack、Parcel

## 各工具对比
### Grunt vs. Gulp
这两个都是 Task Runner。Grunt 会把中间结果放到 .tmp 文件夹下面，涉及到磁盘 I/O 操作，所以速度很慢。Gulp 把中间结果存放到内存里面，加快打包速度。

### Webpack vs. Rollup
这两个是目前最流行的构建工具，一般开发应用系统会使用 Webpack，开发组件库会使用 Rullup。

### Webpack vs. Grunt vs. Gulp
Webpack 是 Model Bundler，而 Grunt 和 Gulp 是 Task Runner。目前 Webpack 社区比其它两个更活跃，官方维护更加积极，插件更丰富，使用的人更多。

## 快速上手
### 安装
这里以最新的 Webpack 5 为例：`npm install webpack webpack-cli --save-dev`。

### 典型配置文件
下面是一个典型配置，可以当做 Cheat Sheet 查阅，或者背下来。文件名一般为 webpack.config.js。
```javascript
const path = require('path')

module.exports = {
  entry: './src/main.js', // 一般项目都是单入口，也可以指定多入口
  output: {
  	path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production', // 会变成 process.env.NODE_ENV，用于区分不同构建环境
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' } // 对于 .txt 后缀的文件，采用 raw-loader 处理
    ]
  },
  plugins: [
    // plugin 的概念较为复杂，这里略去不讲
    new HtmlwebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

一些小众知识点无需记忆，善用搜索引擎即可，例如多入口的配置，直接谷歌搜「multiple target site:webpack.js.org」即可。

需要理解 Webpack 本身只能处理 .js、.json 格式的文件，其它格式需要借助 loader。Webpack 官方提供了很多 [loader](https://webpack.js.org/loaders/) 和 [plugin](https://webpack.js.org/plugins/)，对于常见的最好背下来。也有很多第三方社区的 loader、plugin，日常开发中可以慢慢积累。

### 高级配置文件
要理解 Webpack 的配置文件也是 JS 文件，它会被 Node.js 执行，所以可以使用 `require()` 导入社区第三方的包。

对于中大型系统，构建的需求会很复杂，这时候可以充分利用“配置文件也是 JS 代码”这一点来实现各种灵活的需求。

### 配置文件 vs. Webpack API：控制流程相反
我们可以编写配置文件，然后执行 webpack 命令进行打包。Webpack API 是反过来的，由另一个系统调用 Webpack 进行打包，可以用于集成到现有工具链中。

## 核心概念
### 模块化
JavaScript 模块化早期经历过一段黑暗的时代，目前主要存在的两种模块化方案是 CommonJS 和 ES Module，前者通过 `require()` 函数，后者通过 `import` 关键字。

ES Module 会更加强大，也更加好用。现代浏览器也能直接支持 ES Module：`<script src="..." type="module"></script>`。考虑到还有许多旧浏览器，项目中还是会用 Webpack 处理 JS 模块化。

Webpack 能够识别 CommonJS 和 ES Module 的语法，然后将依赖的所有模块打包到同一个文件。例如下面这段代码：
``` javascript
// index.js
import { add } from './math.js'
window.addEventListener('load', () => {
  document.write(add(1, 2));
})

// math.js
export function add(a, b) {
  return a + b;
}

// webpack.config.js
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'hidden-source-map'
}
```
经过 Webpack 打包后会变成下面这样。这是我们第一次阅读 Webpack 输出的代码，虽然很晦涩，但有必要多花点时间读懂它，最好是能背下来，这对 Webpack 的学习是非常有帮助的。
```javascript
// bundle.js
(() => {
  "use strict";
  var __webpack_modules__ = ({
    "./src/index.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/math.js");

        window.addEventListener('load', () => {
          document.write((0, _math_js__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2));
        })
      }),
    "./src/math.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
          "add": () => add
        });
        function add(a, b) {
          return a + b;
        }
      })
  });

  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  (() => {
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
  })();

  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();

  __webpack_require__("./src/index.js");
})();
```

### 热更新
在命令行参数加上 `--watch` 或在配置文件加上 `watch: true` 可以实现文件变动的时候自动重新构建，但是网页还是需要手动刷新。

可以将 webpack-dev-server 和 HotModuleReplacementPlugin 结合使用，实现热更新的功能。

HotModuleReplacementPlugin 会将 HMR Runtime 注入到浏览器端，收到 webpack-dev-server 通过 WebSocket 发来的文件变动消息后，做对应的页面更新操作。webpack-dev-server 会监听本地文件的变动，检测到变动会向 HMR Runtime 发送消息。
