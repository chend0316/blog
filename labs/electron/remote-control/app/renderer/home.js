const { ipcRenderer } = require('electron')
const Vue = require('vue/dist/vue.common.dev')

/**
 * @returns 0表示成功, 1表示控制码错误, 2表示网络错误
 */
function startControl(remoteCode) {
  let control = new Promise((resolve, reject) => {
    ipcRenderer.send('control', remoteCode)
    ipcRenderer.once('control-result', (e, type) => {
      if (type === 0) {
        resolve()
      } else if (type === 1) {
        reject({ errno: 1, msg: '控制码不存在' })
      } else if (type === 2) {
        reject({ errno: 2, msg: '网络不给力' })
      }
    })
  })
  return control
}

new Vue({
  data() {
    return {
      remoteCode: '',
      localCode: '1234',
      controlRemote: false,
    }
  },
  methods: {
    async handleButtonClick() {
      this.controlRemote = true
      try {
        await startControl(this.remoteCode)
      } catch (err) {
        alert(err.msg)
        console.log(err.errno, err.msg)
      } finally {
        this.controlRemote = false
      }
    }
  }
}).$mount('#app')
