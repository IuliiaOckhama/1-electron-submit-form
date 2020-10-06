import { IpcRenderer } from 'electron';

export class IpcService {
  private ipcRenderer?: IpcRenderer;

  public send(channel: string, args: any) {
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }

    const ipcRenderer = this.ipcRenderer;
    if (ipcRenderer) {
      ipcRenderer.send(channel, args);
    } 
  }

  private initializeIpcRenderer() {
    if (!window || !window.process || !window.require) {
      throw new Error(`Unable to require renderer process`);
    }
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }
}
