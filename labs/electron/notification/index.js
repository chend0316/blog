const { ipcRenderer } = require('electron')

document.querySelector('#btn').addEventListener('click', () => {
  ipcRenderer.send('file-upload')
})
