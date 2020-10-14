import { IpcMainEvent, dialog, BrowserWindow } from 'electron'
import { IpcChannelInterface, IpcRequest, CONFIRM_DELETE_NOTE, DELETE_NOTE_RESPONSE } from '../src/shared/entities'

export class ConfirmDeleteNoteChannel implements IpcChannelInterface {

  private readonly window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }
  getName(): string {
    return CONFIRM_DELETE_NOTE
  }

 handle(event: IpcMainEvent, request: IpcRequest): void {
  const options = {
   type: 'warning',
   buttons: ['Delete note', 'Do not delete'],
   defaultId: 0,
   title: "Delete note",
   message: 'Are you sure you want to delete your note?',
  }
  const answer = dialog.showMessageBox(options)
  answer.then(({response}) => {
    const res = response === 0 ? true : false
    this.window.webContents.send(DELETE_NOTE_RESPONSE, res)
  })
 }
}
