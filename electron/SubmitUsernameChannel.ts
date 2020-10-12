import { IpcChannelInterface, IpcRequest } from '../shared/entities'
import { IpcMainEvent, dialog, BrowserWindow } from 'electron'

export class SubmitUsernameChannel implements IpcChannelInterface {

  private readonly window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }
  getName(): string {
    return 'CONFIRM_SAVE_NOTE'
  }

 handle(event: IpcMainEvent, request: IpcRequest): void {
  const options = {
   type: 'warning',
   buttons: ['Save changes', 'Proceed without saving'],
   defaultId: 0,
   title: "You didn't save your note",
   message: 'Your note contains unsaved changes. Do you want to save them?',
  }
  const answer = dialog.showMessageBox(options)
  answer.then(({response}) => {
    const res = response === 0 ? true : false
    this.window.webContents.send('SAVE_NOTE_RESPONSE', res)
  })
 }
}
