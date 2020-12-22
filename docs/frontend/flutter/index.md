# Flutter 快速上手

## 开发环境搭建 (macOS)
下载以下内容
- 在[官网](https://developer.android.com/) 下载安装 Android Studio
- 在 App Store 下载安装 Xcode
- 在[官网](https://flutter.dev/docs/development/tools/sdk/releases) 下载安装 Flutter SDK

国内网络环境问题，开发者可能需要关注[Using Flutter in China](https://flutter.dev/community/china)这篇文章。这篇文章的关键就是设置`PUB_HOSTED_URL`和`FLUTTER_STORAGE_BASE_URL`这两个环境变量。

### Android 模拟器的创建
在 Android Studio 中，打开 AVD Manager，点击“Create Virtual Device”按钮创建一台 Nexus 6P 模拟器。

### iOS 模拟器的创建
安装完 Xcode 之后，在命令行执行 `open -a Simulator` 即可启动。

### Flutter SDK 的安装
解压后，配置环境变量：`export PATH="$PATH:/path/to/flutter/bin"`

macOS 可以编辑 `~/.zshrc` 实现环境变量永久生效。

## 第一个项目: 计数器应用
Flutter 解压后根目录会存在一个 examples 目录，里面有一些示例项目，包括 hello_world 项目。但是我们不去使用这个目录。而是自己创建一个项目：`$ flutter create myapp`。

这部分可以参考[官网文档](https://flutter.dev/docs/get-started/editor)，写的很好。

这个项目只是用来熟悉开发环境的，也可以用来检验本地开发环境是否搭建成功。
