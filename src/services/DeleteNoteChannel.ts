import { IpcMainEvent } from 'electron'
import { Store } from 'redux'
import { sendDeleteConfirmation } from '../actions/uiActions'
import { DELETE_NOTE_RESPONSE, IpcChannelInterface, IpcResponse } from '../shared/entities'


export class DeleteNoteChannel implements IpcChannelInterface {
 private store: Store
 constructor(store: Store) {
   this.store = store
 }
 getName(): string {
  return DELETE_NOTE_RESPONSE
 }

 handle(event: IpcMainEvent, response: IpcResponse): void {
  this.store.dispatch(sendDeleteConfirmation(response))
 }
}