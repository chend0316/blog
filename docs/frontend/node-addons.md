# Node C++ Addons

WIP: 限于笔者水平，所以本文内容可能有一些错误。

我们可以基于 V8 API 和 Node.js API 提供的头文件来编写 C++ 代码。不同版本的 Node.js 使用的 V8 引擎版本也是不同的。主要有两个坑点：
- V8 和 Node.js 在不同版本提供的函数有所不同，所以要为每一个版本的 Node.js 单独编译一份，有点坑。
- 更坑的是 V8 API 变动非常频繁，很多变动都不向下兼容，所以有时不仅需要重新编译，而是需要重写代码！

NAN 提供了一些宏可以判断 V8 版本展开不同的宏，这屏蔽了一部分 V8 API 的变动，缓解了重写代码的问题。但还是需要为每个 V8 版本单独编译。

N-API 封装了一层全新的 API，暴露出一些稳定的 API，保证接口向下兼容。而且只需要一次编译就可以用于不同版本的 Node.js。

总之 NAN 本质上只是一些宏展开，没有提供新接口，在编译阶段屏蔽 V8 API 变动。N-API 则提供了一套全新接口，在运行阶段屏蔽 V8 API 变动。

## NAN (Native abstractions for Node.js)
`npm install nan`，安装完成后进入 node_modules 目录找一下它提供的头文件，可以看到有很多宏。想要上手写代码的话，还是需要去学习 V8 的那套接口。

因为没有提供新 API，不需要大家学额外的知识。所以[Node.js 官网](https://nodejs.org/api/addons.html#addons_native_abstractions_for_node_js) 只用了一小段话来介绍这个技术。然后给了一个
[demo](https://github.com/nodejs/nan/tree/HEAD/examples/)。

## N-API (Node-API)
虽然不用学 V8 了，但要学很多 [N-API 的知识](https://nodejs.org/api/n-api.html)。
