//import { AppManager } from './AppManager'
// import { MainWindow } from './MainWindow'
import { MainWindow } from './MainWindow'
import { NativeMenu } from './Menu'
import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron'
import AppManager from './AppManager'

//  // Dialog

//  ipcMain.on('SUBMIT_FORM', (event, data) => {
//   const isUsernameExists = data.length > 0
//   const message = isUsernameExists
//    ? `Your username is ${data}`
//    : 'Enter your username'

//   const options = {
//    type: isUsernameExists ? 'info' : 'warning',
//    buttons: ['Okay'],
//    defaultId: 1,
//    title: 'Your username',
//    message: message,
//    checkboxLabel: 'Remember my answer',
//    checkboxChecked: true,
//   }
//   dialog.showMessageBox(null, options, (response, checkboxChecked) => {
//    console.log(response)
//   })
//  })

//  mainWindow.on('closed', () => {
//   mainWindow = null
//  })
// }
app.on('ready', () => {
 AppManager.setWindow('MainWindow', new MainWindow())
 AppManager.setMenu(new NativeMenu())
})

app.on('window-all-closed', function () {
 app.quit()
})
