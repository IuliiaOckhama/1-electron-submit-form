import { ipc } from '../index'

export const sendIpcReq = (channel: string, args?: any) => {
 if (ipc) {
  ipc.send('CONFIRM_SAVE_NOTE', 'arg')
 }
}
