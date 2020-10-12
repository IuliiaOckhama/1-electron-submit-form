import { IpcMainEvent, IpcRendererEvent } from 'electron'
import { sendConfirmation } from '../actions/uiActions'
export interface IpcChannelInterface {
 getName(): string;
 handle(event: IpcMainEvent | IpcRendererEvent, response: IpcResponse): void;
}

export type IpcResponse = boolean;
// TODO
export const channelActionTypes = {
  SAVE_NOTE_RESPONSE: 'SAVE_NOTE_RESPONSE',
}

export class SaveNoteChannel implements IpcChannelInterface {
 private store: any
 constructor(store: any) {
   this.store = store
 }
 getName(): string {
  return channelActionTypes.SAVE_NOTE_RESPONSE
 }

 handle(event: IpcMainEvent, response: IpcResponse): void {
  this.store.dispatch(sendConfirmation(response))
 }
}