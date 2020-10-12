import { IpcMainEvent, IpcRendererEvent } from 'electron'

export type IpcResponse = any;
export interface IpcChannelInterface {
 getName(): string;
 handle(event: IpcMainEvent | IpcRendererEvent, response: IpcResponse): void;
}

export interface IpcRequest {
 params: string;
}
// TODO
export const channelActionTypes = {
 SAVE_NOTE: 'SAVE_NOTE',
}
