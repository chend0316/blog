# Webpack 基础

## 核心概念
### entry、output
略

### loader、plugin
略

### Source Map
略

### Webpack 模块
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
经过 Webpack 打包后会变成下面这样。如果是第一次阅读 Webpack 的输出代码，会感觉很晦涩，但有必要多花点时间读懂它，最好是能背下来，这对 Webpack 的学习是非常有帮助的。
::: details Webpack 输出代码
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
:::

## 基础应用场景
### 解析 CSS、Less、Sass

### 解析图片、字体等二进制文件

### HtmlWebpackPlugin

### 文件监听和热更新
在命令行参数加上 `--watch` 或在配置文件加上 `watch: true` 可以实现文件变动的时候自动重新构建，但是网页还是需要手动刷新。

可以将 webpack-dev-server 和 HotModuleReplacementPlugin 结合使用，实现热更新的功能。在 Webpack 中，这叫做热模块替换 (HMR)。

HotModuleReplacementPlugin 会将 HMR Runtime 注入到浏览器端，收到 webpack-dev-server 通过 WebSocket 发来的文件变动消息后，做对应的页面更新操作。webpack-dev-server 会监听本地文件的变动，检测到变动会向 HMR Runtime 发送消息。

### 文件指纹
文件指纹会在文件名上加一段 Hash 值，防止因为缓存机制导致浏览器使用旧的资源。
