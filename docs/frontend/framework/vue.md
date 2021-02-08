# Vue

视图部分，Vue 需要编写 Template 模板。
- Template 跟 HTML 很接近，上手容易，使用双花括号`{{}}`表示插值表达式，在插值表达式内可以编写 JS 代码。
- 在插值表达式上类型检查、代码补全很坑，Vetur 虽然可以打开 Experimental Interpolation Features 选项，但仍处于实验阶段，打开后会很卡。

逻辑部分，Vue 2.x 采用 Options API，Vue 3.x 引入了 Composition API，此外还有一种 Class Style Component 目前已经被官方废弃。
- Options API 对 TypeScript 类型推断非常不友好
- Composition API 一方面可以实现 AOP 面向切面，这点和 React Hooks 一样；另一方面对 TypeScript 的支持更加友好

Vue 的单文件组件 (SFC) 把 HTML、JS、CSS 都放在同一个文件里面。
- 这样对业务开发人员来说很好用。
- 对周边生态工具的实现者来说很坑，比如：语法高亮、Webpack 打包等等都成了问题。
- 对环境搭建人员来说有一些小坑，还好大多场景都可以交给 Vue CLI 处理，不需要自己配置。

## Vue 3
Vue 的 [RFC 仓库](https://github.com/vuejs/rfcs) 反映了 Vue 未来的发展，RFC 现在有 30 多个文档，文件名类似下面这样：
- 0001-new-slot-syntax.md
- 0002-slot-syntax-shorthand.md

### [0001-new-slot-syntax](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md)
slot 的 API 发生了变化，因为旧的 API 不是很自然。

|                           | old style    | new style                                        |
| ------------------------- | ------------ | ------------------------------------------------ |
| 插槽 (Slots)              |              | `<foo v-slot></foo>`                             |
| 具名插槽 (Named Slots)    |              | `<foo v-slot:name></foo>`                        |
| 作用域插槽 (Scoped Slots) | 一句话说不清 | `<foo v-slot="xxx"></foo>`                       |
| v-slot 语法糖             | 无           | `<foo #name></foo>`                              |
| 定义插槽                  |              | `<div><slot name="..." :arg="..."></slot></div>` |

### [0006-slots-unification](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0006-slots-unification.md)


### [0004-global-api-treeshaking](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0004-global-api-treeshaking.md)
#### Tree Shaking 减小体积
Vue 3 只能使用 named imports 导包，代码如下，好处是可以让打包工具的 Tree Shaking 发挥作用，减小最终生成的 bundle 体积。

```javascript
import { nextTick, observable } from 'vue'

nextTick(() => {})

const obj = observable({})
```

#### 对多 App 实例的支持更好
在 Vue 2 中，业务代码使用 `new Vue()` 来创建 App。[插件 (Plugin)](https://cn.vuejs.org/v2/guide/plugins.html) 会往 `Vue` 上 install 函数，代码如下。这样多个 App 实例共享同一个 `Vue` 原型可能会有插件冲突。

```javascript
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}
```

在 Vue 3 中，业务代码使用 `Vue.createApp` 来创建 App，插件往 app 实例上 install 函数，代码如下。这样不同 App 就可以隔离开。

```javascript
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```

### [0025-teleport](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0025-teleport.md)

### [0013-composition-api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)
