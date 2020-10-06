import { IpcChannelInterface, IpcRequest } from "../shared/entities";
import { IpcMainEvent, dialog } from 'electron';

export class SubmitUsernameChannel implements IpcChannelInterface {
  getName(): string {
    return 'submit-username';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    const options = {
      type: 'info',
      buttons: ['Okay'],
      defaultId: 1,
      title: 'Your username',
      message: `Your username is ${request}`
    }
    dialog.showMessageBox(options)
  }
}