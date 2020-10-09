import { IpcMainEvent, IpcRendererEvent } from 'electron'

export interface IpcChannelInterface {
 getName(): string;
 handle(event: IpcMainEvent | IpcRendererEvent, request: IpcRequest): void;
}

export interface IpcRequest {
 params: string;
}
// TODO
export const channelActionTypes = {
 SAVE_NOTE: 'SAVE_NOTE',
}

export class SaveNoteChannel implements IpcChannelInterface {
 getName(): string {
  return channelActionTypes.SAVE_NOTE
 }

 handle(event: IpcMainEvent, request: IpcRequest): void {
  console.log('FROM SERVICE', request)
 }
}
