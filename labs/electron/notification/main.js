const { app, BrowserWindow, ipcMain, Notification } = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./index.html')
}

app.on('ready', () => {
  createWindow()
})

ipcMain.on('show-notification', (e, msg) => {
  console.log('aaa')
  let n = new Notification({
    title: '来自Vue的消息',
    body: msg
  })
  n.show()
})
