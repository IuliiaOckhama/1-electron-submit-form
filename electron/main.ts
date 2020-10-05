const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow

function createWindow() {
 mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  show: false,
  webPreferences: {
   nodeIntegration: true,
   preload: __dirname + '/preload.js',
  },
 })

 if (isDev) {
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL('http://localhost:3000')
 } else {
  mainWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`)
 }

 mainWindow.once('ready-to-show', () => mainWindow.show())

 const showMessage = (message) =>
  dialog.showMessageBox({
   type: 'info',
   message: `You activated action: "${message}"`,
   buttons: ['Close'],
  })

 const menu = Menu.buildFromTemplate([
  {
   label: 'Preferences',
   submenu: [
    {
     label: 'Color',
     submenu: [
      {
       label: 'Red',
       type: 'radio',
       accelerator: 'CmdOrCtrl+R',
       click: () => showMessage('Red'),
      },
      {
       label: 'Green',
       type: 'radio',
       accelerator: 'CmdOrCtrl+G',
       click: () => showMessage('Green'),
      },
      {
       label: 'Blue',
       type: 'radio',
       accelerator: 'CmdOrCtrl+B',
       click: () => showMessage('Blue'),
      },
     ],
    },
   ],
  },
 ])
 Menu.setApplicationMenu(menu)

 ipcMain.on('SUBMIT_FORM', (event, data) => {
  const isUsernameExists = data.length > 0
  const message = isUsernameExists
   ? `Your username is ${data}`
   : 'Enter your username'

  const options = {
   type: isUsernameExists ? 'info' : 'warning',
   buttons: ['Okay'],
   defaultId: 1,
   title: 'Your username',
   message: message,
   checkboxLabel: 'Remember my answer',
   checkboxChecked: true,
  }
  dialog.showMessageBox(null, options, (response, checkboxChecked) => {
   console.log(response)
  })
 })

 mainWindow.on('closed', () => {
  mainWindow = null
 })
}
app.on('ready', () => {
 createWindow()
})
app.on('window-all-closed', function () {
 app.quit()
})
