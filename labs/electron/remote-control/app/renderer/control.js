const { ipcRenderer } = require('electron')

ipcRenderer.once('code', (e, code) => {
  document.querySelector('#remoteCode').innerText = code
})
