const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow() {
  let home = new BrowserWindow({
    width: 600,
    heigh: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  // win.loadURL('http://localhost:3000')
  home.loadFile('../renderer/home.html')
}

function verifyCode(code) {
  return true
}

function startControl(code) {
  let control = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  control.loadFile('../renderer/control.html').then(() => {
    control.webContents.send('code', code)
  })
}

ipcMain.on('control', function (e, code) {
  if (!verifyCode(code)) {
    e.sender.send('control-result', 1)
    return
  }
  e.sender.send('control-result', 0)
  startControl(code/*, (errno, errmsg) => {
    e.sender.send('control-result', {errno, msg: errmsg})
  }*/)
})

app.on('ready', createWindow)
