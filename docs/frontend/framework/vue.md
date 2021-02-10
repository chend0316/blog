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

## Vue 3 中的 TypeScript
本节会说 Vue 3 对 TypeScript 的支持还是不如 React 好，具体会通过以下几点展开讲解：
- Vetur 插件对单 Vue 文件内的 TS 支持很好，但跨 Vue 文件会丢失 TS 类型 (这是 TypeScript 的不足)
- 上一点我们说 TypeScript 的不足是指 TS 不认识 .vue 后缀的文件，TS 也提供了一些技术手段 (即编写 shims-vue.d.ts 文件)，然而在实践中还是存在许多缺陷
- 如果我们使用 JSX 编写业务代码，那么就不存在 .vue 后缀的文件了，问题自然就解决了

### Vetur 对 TS 的支持
VSCode 的 Vetur 插件有一个实验特性：`templateInterpolationService`，打开之后可以开启类型检查，但还是比较鸡肋 (不能实现跨 Vue 文件的检查)。

::: details 单 Vue 文件内工作良好
```vue {3-4}
<template>
  <div>
    <!-- TS 报错 -->
    {{ obj + 1 }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const obj = {
      name: 'zhang',
    };
    return {
      obj,
    };
  },
});
</script>
```
:::

::: details 跨 Vue 文件无法工作
```vue {12-20}
<template>
  <div>
    <span :style="{ color: color }">{{ msg.text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'LogItem',
  props: {
    msg: {
      type: Object as PropType<{
        type: 'info' | 'warn' | 'error';
        text: string;
      }>,
      required: true,
    },
  },
  setup(props) {
    const colorMapByType = { info: 'gray', warn: 'orange', error: 'red' };
    const color = colorMapByType[props.msg.type];
    return { color };
  },
});
</script>
```

```vue {3-4}
<template>
  <log-item :msg="{ type: 'info', text: 'hello' }"></log-item>
  <!-- msg 入参类型错误，无法检查出来 -->
  <log-item :msg="'a'"></log-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogItem from './components/LogItem.vue';

export default defineComponent({
  name: 'App',
  components: { LogItem },
});
</script>
```
:::

### shims-vue.d.ts
跨 Vue 文件之所以会丢失 TS 类型，是因为我们 `import 'xxx.vue'` 的时候，后缀名是 .vue。TypeScript 不知道怎么处理 .vue 后缀的文件，所以 TypeScript 提供了一个解决方法是编写 shims-vue.d.ts 文件 (如下所示)。

```typescript
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

上面这种写法显然是不够的，`*.vue` 是对所有 vue 文件生效的。

### 在 Vue 中使用 JSX
Vue 有 template、JSX、render 函数这 3 种方式编写视图，前两种最终都会编译成 render 函数。

和 React 一样，JSX 的编译需要依赖 Babel 插件，Vue 3 可以使用 [jsx-next](https://github.com/vuejs/jsx-next) 实现，Vue 2 可以使用 [jsx](https://github.com/vuejs/jsx) 实现。

而 JSX 的类型检查需要依赖 TypeScript 官方支持，和 Babel 不同 TypeScript 不支持插件扩展。React JSX 得到了 TypeScript 官方支持，然而 Vue 2 JSX 没有，二者有着一些语法区别。Vue 3 调整了 JSX 的语法并和 React 保持统一，这样 Vue 中的 JSX 也能得到 TypeScript 支持了。

### 对 props 入参的 TS 检查
业务代码调用组件库，为了考察 props 对 TS 的支持，我们做 4 个实验：
- 都采用 SFC + TS 编写，无法对 props 做类型检查
- 业务代码采用 SFC + TS，组件库采用 TSX，无法对 props 做类型检查
- 业务代码采用 TSX，组件库采用 SFC + TS，VSCode 不会报错，但编译时控制台会报类型错误
- 都采用 TSX，VSCode 在代码编写阶段就能够报类型错误，编译时控制台也会有错误信息

## RFC 解读
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
