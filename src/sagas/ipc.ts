import { IpcService } from '../services'

const ipc = new IpcService().init()
const sendIpcReq = (channel: string, args?: any) => {
 if (ipc) {
  ipc.send('SAVE_NOTE', 'arg')
 }
}
