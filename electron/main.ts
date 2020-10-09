import { app, ipcMain } from 'electron'
import { MainWindow } from './MainWindow'
import { NativeMenu } from './Menu'
import AppManager from './AppManager'
import { SubmitUsernameChannel } from './SubmitUsernameChannel'
import { IpcChannelInterface } from '../shared/entities'

class Main {
  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }
  private setupApplication() {
    const window = new MainWindow()
    AppManager.setWindow('MainWindow', window.mainWindow)
    AppManager.setMenu(new NativeMenu(window.mainWindow))
  }
  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }
  public init() {
    app.on('ready', () => {
      this.setupApplication()
      const ipcChannels:IpcChannelInterface[] = [new SubmitUsernameChannel(AppManager.getWindow('MainWindow'))]
      this.registerIpcChannels(ipcChannels);
    });
    app.disableHardwareAcceleration()
    app.on('window-all-closed', this.onWindowAllClosed)
  }
}

(new Main()).init();