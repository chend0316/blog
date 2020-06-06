const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
}

ipcMain.handle('msg-by-invoke', (event, msg) => {
  console.log('received msg: ' + msg)
  let ret = new Promise(function (resolve, reject) {
    resolve(msg.toUpperCase())
  })
  return ret
})

ipcMain.on('msg-to-main', (event, msg) => {
  console.log('received msg: ' + msg)
  event.reply('msg-to-renderer', msg.toUpperCase())
})

app.whenReady().then(createWindow)
