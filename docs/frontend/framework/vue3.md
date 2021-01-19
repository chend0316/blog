# Vue 3 快速上手

## 响应式 API (Reactivity API)
通过 `Vue.reactive()` 创建响应式数据，它的神奇能力依赖 ES6 Proxy，因此必须是对象类型，不能是原始类型。如果是原始类型，可以使用 `Vue.ref()`。下面这个 Demo 通过响应式数据实现一个简易的 MVVM 双向绑定。

```html
<input id="input" type="text">
<span id="span"></span>
<script>
  const msg = Vue.ref('hello')
  const input = document.querySelector('#input')
  const span = document.querySelector('#span')

  // View -> ViewModel 方向的绑定
  input.addEventListener('input', (evt) => {
    msg.value = evt.target.value
  })

  // ViewModel -> View 方向的绑定
  Vue.watchEffect(() => {
    input.value = msg.value
  })
  Vue.watchEffect(() => {
    span.innerText = msg.value
  })
</script>
```

### 响应式数据
`reactive` 会更好用，但如果是原始类型只能用 `ref`。`ref` 难用的地方就是新建了一个对象，把原数据放到 `value` 字段里面。

### watch
业务中优先使用 `Vue.watchEffect`，需求不满足才使用 `Vue.watch`，二者区别：
- 接口形式不一样
- watch 可以拿到 oldValue
- watch 是 lazy 的
