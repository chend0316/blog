# Vue 3 迁移指南

## Composition API：面向切面编程
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

总的来说，以前 options 里面是写死的；而现在可以通过 `setup()` 动态生成，这让 Vue 框架有能力做更多事情。

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

## 响应式数据
### ref()
JS 中对于原始类型 (primitive types) 是采用值传递的，`ref()` 可以将原始类型包装到一个对象里面去，变成引用传递，这就类似于其它语言中的装箱 (boxing)。不过除了包装原始类型 `ref()` 也可以包装一个对象，所以并不完全等同于装箱，在 Vue 中把这个过程叫做 wrap。wrap 后数据会放到 `value` 字段里面，代码如下。

```javascript
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

ES6 Proxy 只能用于对象类型，不能用于原始类型。所以 `ref()` 会把数据包在一个对象的 `value` 字段里，看起来有点怪，开发者要适应/理解一下。
