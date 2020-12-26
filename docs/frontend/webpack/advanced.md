# Webpack 进阶

## 灵活的配置文件
要理解 Webpack 的配置文件也是 JS 文件，它会被 Node.js 执行，所以可以使用 `require()` 导入社区第三方的包。

对于中大型系统，构建的需求会很复杂，这时候可以充分利用“配置文件也是 JS 代码”这一点来实现各种灵活的需求。

### 例子：多页应用打包方案
单页应用叫做 SPA，多页应用叫做 MPA，MPA 会有多个入口文件。

::: details 传统 MPA 的配置方法
<<< @/../labs/webpack/webpack-mpa/webpack.config.bad.js
:::

上面的配置方法不够灵活，如果增加了新的页面，我们还需要手动修改 Webpack 配置文件。考虑到 Webpack 配置文件本身就是 JavaScript 代码。我们可以充分利用这个特性，实现灵活的 MPA 应用打包。

关键思路如下：
- 团队成员约定多页应用中，代码文件的组织规则
- 利用 [glob](https://www.npmjs.com/package/glob) 这个包，根据约定的规则动态获取 src 目录下的文件

::: details 利用 glob 灵活打包多页应用
<<< @/../labs/webpack/webpack-mpa/webpack.config.good.js
:::

## 高级应用场景
### 自动添加 CSS 前缀
[Autoprefixer](https://www.npmjs.com/package/autoprefixer) 

### 移动端 px 自动转 rem

## Webpack API
我们通常是编写配置文件，然后执行 webpack 命令进行打包。而 Webpack API 是反过来的，由另一个系统调用 Webpack 进行打包，可以用于集成到现有工具链中。
