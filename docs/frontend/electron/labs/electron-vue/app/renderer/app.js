import Vue from 'vue'
import App from './App.vue'

const el = document.createElement('div')
document.body.appendChild(el)

new Vue({
  render: (h) => h(App)
}).$mount(el)
