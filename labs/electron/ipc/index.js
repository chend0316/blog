const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')

function createWindow () {
  let win1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win1.loadFile('./index1.html')

  let win2 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win2.loadFile('./index2.html')
  global.win2Id = win2.webContents.id
}

app.on('ready', () => {
  createWindow()
})
