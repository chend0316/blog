# 程序员修炼指南
## 笔记本电脑
### 软件开发环境
前端开发需要装 Node.js、Chrome 浏览器

推荐使用 [nvm](https://github.com/nvm-sh/nvm) 来安装 Node.js
- 安装 Node.js：`nvm install 12.14.0`
- 切换 Node.js 版本：`nvm use 12.14.0`

安装 Electron：
- `npm install --save-dev electron`
- 在 Win 下推荐安装 32 位：`npm install --save-dev --arch=ia32 --platform=win32 electron`
- Electron 安装镜像加速：`ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/ npm install --save-dev electron`
