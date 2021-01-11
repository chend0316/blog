# Webpack 源码和原理分析

## 概念
### 模块 (Module)
JavaScript 模块化早期经历过一段黑暗的时代，目前主要存在的两种模块化方案是 CommonJS 和 ES Module，前者通过 `require()` 函数，后者通过 `import` 关键字。

ES Module 会更加强大，也更加好用。现代浏览器也能直接支持 ES Module：`<script src="..." type="module"></script>`。考虑到还有许多旧浏览器，项目中还是会用 Webpack 处理 JS 模块化。

Webpack 能够识别 CommonJS 和 ES Module 的语法，然后将依赖的所有模块打包到同一个文件。例如下面这段代码：
::: details 一个示例代码
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
:::

上面这段代码经过 Webpack 打包后会变成下面这样。如果是第一次阅读 Webpack 的输出代码，会感觉很晦涩，但有必要多花点时间读懂它，最好是能背下来，这对 Webpack 的学习是非常有帮助的。
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

### HMR
Webpack 自带了一个 HotModuleReplacementPlugin 插件。这个插件的原理是将 HMR Runtime 注入到浏览器端，文件变动后，webpack-dev-server 会通过 WebSocket 告知 HMR Runetime，HMR Runetime 做页面的局部刷新。

通过阅读 Webpack 官网给出的[一个 HMR 的例子](https://webpack.js.org/guides/hot-module-replacement/)，我们会发现即使是最简单的业务，也需要编写繁琐的 HMR 代码，代码类似下面这样。

```javascript
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('准备更新 print.js 模块');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  })
}
```

不过幸运的是，一些 loader 已经帮我们实现了 HMR。如果你正在使用 React、Vue 等框架，那么就能享受到 HMR 带来的高效的开发体验。