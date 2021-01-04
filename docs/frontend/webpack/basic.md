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

## 基础应用场景
### 解析 CSS、Less、Sass
以 Sass 为例，按顺序使用 sass-loader、css-loader、style-loader 即可。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
}
```

### 解析图片、字体等二进制文件
可以使用 file-loader 或 url-loader 加载二进制文件，file-loader 更简单一些，我们以 file-loader 为例。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

以 PNG 图片为例，file-loader 会将图片移动到输出目录，并修改文件名为：xxx.png。在业务中，我们可以像下面这样引入图片，代码中 logo 变量的值就是 xxx.png。
```javascript
import logo from './logo.png'

const img = document.createElement('img')
img.src = logo
document.body.appendChild(img)
```

### HtmlWebpackPlugin
可以自动生成一个 index.html，很方便，开发必备。最高级的地方在于可以在页面中自动插入一行 `<script src="bundle.js">`。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

### 文件指纹
文件指纹会在文件名上加一段 Hash 值，防止因为缓存机制导致浏览器使用旧的资源。
