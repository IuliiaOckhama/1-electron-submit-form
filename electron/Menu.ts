import { dialog, BrowserWindow, Menu } from 'electron'

export class NativeMenu {

  public readonly mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    Menu.setApplicationMenu(this.createMenu())
    this.mainWindow = mainWindow
  }

 showMessage(message: string) {
  dialog.showMessageBox({
   type: 'info',
   message: `You activated action: "${message}"`,
   buttons: ['Close'],
  })
 }

 createMenu(): Menu {
  const contextMenu = Menu.buildFromTemplate([
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
        click: () => this.showMessage('Red'),
       },
       {
        label: 'Green',
        type: 'radio',
        accelerator: 'CmdOrCtrl+G',
        click: () => this.showMessage('Green'),
       },
       {
        label: 'Blue',
        type: 'radio',
        accelerator: 'CmdOrCtrl+B',
        click: () => this.showMessage('Blue'),
       },
      ],
     },
    ],
   },
  ])
  return contextMenu
 }
}
