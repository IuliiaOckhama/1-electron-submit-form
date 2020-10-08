import { BrowserWindow } from 'electron';
const path = require('path')
const isDev = require('electron-is-dev')

export class MainWindow {
  public readonly mainWindow: BrowserWindow;

  constructor() {
    this.mainWindow = this.createWindow();
  }

  createWindow(): BrowserWindow {
    const mainWindow = new BrowserWindow({
      width: 1400,
      height: 1000,
      show: false,
      webPreferences: {
       nodeIntegration: true
      },
    })

    if (isDev) {
      mainWindow.webContents.openDevTools()
      mainWindow.loadURL('http://localhost:3000')
    } else {
      mainWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`)
    }
    mainWindow.once('ready-to-show', () => mainWindow.show())
    
    return mainWindow;
  }
}