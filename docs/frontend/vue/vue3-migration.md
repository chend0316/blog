# Vue 3 迁移指南

## Composition API
### 为啥需要 Composition API 呢？
Vue 组件 (Components) 已经能大大提升代码可维护性、灵活性了，但对于大型项目这还不够，我们需要有更加强大的代码复用能力。

下图是 Vue 2 使用 options API 的代码，我们来看下有啥问题。我们将业务逻辑相关的代码用相同的颜色标注出来了，用术语说就是不同颜色代表不同的关注点 (Concerns)。

![](./img/vue2-options-api-concerns.png)

你会看到不同颜色的代码混在一起了，这就非常不符合关注点分离 (Separation of concerns) 原则。阅读代码的时候不得不在不同颜色的代码块之间进行“跳跃”，这让代码变得更加费解。

现在 Composition API 可以帮助我们把相同关注点的代码聚集在一起，把不同关注点的代码分开来。

### 如何使用 Composition API
就是 API 增加了一个 `setup()`。
- `setup()` 的入参有两个: `props` 和 `context`
- `setup()` 可以返回: 计算属性、methods、生命周期钩子等等
- 在生命周期上 `setup()` 比组件实例化要早，所以函数体内无法访问 `this` 指针

总的来说，以前 options 里面编写的内容都是静态的；而现在可以由 `setup()` 动态生成了。

下面这个例子是在 `setup()` 里面定义 data 和 method。

```javascript
// src/components/UserRepositories.vue
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    let repositories = ref([]) // ref() 可以把数据变为响应式的
    const getUserRepositories = async () => {
      repositories = await fetchUserRepositories(props.user)
    }

    return {
      repositories, // data
      getUserRepositories // method
    }
  }
}
```

看起来我们只是把原先定义在 options 上的东西移动到了 setup 里面，但后续我们会把 setup 里面的代码提取出来，并且不同的功能放到不同的函数/文件里面，这就实现了关注点分离。

## Ref()
JS 中对于原始类型 (primitive types) 是采用值传递的，`ref()` 可以将原始类型包装到一个对象里面去，变成引用传递，这就类似于其它语言中的装箱 (boxing)。不过除了包装原始类型 `ref()` 也可以包装一个对象，所以并不完全等同于装箱，在 Vue 中把这个过程叫做 wrap。wrap 后数据会放到 `value` 字段里面，代码如下。

```javascript
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

wrap 带来的影响如下。
1. 所有数据都被包在 `value` 字段里，有点怪怪的，开发者要适应一下；
2. 消除了原始类型、值传递，可以帮助 Vue 更彻底的控制 data；因为 Vue 3 把 data 抽出来了，很容易失去对 data 的掌控，从而丢失数据响应式；

关于第2点，这里打个比方。Vue 2 所有 data 都是挂在 vm 实例里面的，但 Vue 3 把 data 放出来了，所以需要包装到 `value` 字段里面避免弄丢。类似于出门遛狗要牵绳。

todo: 给一个丢失数据响应式的例子吧？这篇是入门篇，有必要给这个例子吗？

## 其它需要适应的变化
### v-model
Vue 2 中，双向绑定通过 `v-model` 和 `.sync` 语法糖实现，Vue 3 组件可以有多个 `v-model`，所以不再需要 `.sync` 了，语法是 `v-model:xxx`。

