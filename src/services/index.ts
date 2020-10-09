import { IpcRenderer } from 'electron';
import { IpcChannelInterface } from '../../shared/entities'
import { SaveNoteChannel } from './SaveNoteChannel'

export class IpcService {
  public ipcRenderer?: IpcRenderer;

  public send(channel: string, args: any) {
    if (this.ipcRenderer) {
      this.ipcRenderer.send(channel, args);
    } 
  }
  
  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }
    const ipcRenderer = this.ipcRenderer;
    if (ipcRenderer) {
      console.log('register channels')
      ipcChannels.forEach(channel => ipcRenderer.on(channel.getName(), (event, request) => channel.handle(event, request)));
    }
  }

  public initializeIpcRenderer() {
    if (!window || !window.process || !window.require) {
      throw new Error(`Unable to require renderer process`);
    }
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  public init(ipcChannels: IpcChannelInterface[] = [new SaveNoteChannel()]) {
    this.registerIpcChannels(ipcChannels);
    return this.ipcRenderer
  }
}


// (new IpcService()).init([new SaveNoteChannel()]);