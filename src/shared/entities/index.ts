import { IpcMainEvent, IpcRendererEvent } from 'electron'

export const CONFIRM_DELETE_NOTE = 'CONFIRM_DELETE_NOTE'
export const DELETE_NOTE_RESPONSE = 'DELETE_NOTE_RESPONSE'
export const CONFIRM_SAVE_NOTE = 'CONFIRM_SAVE_NOTE'
export const SAVE_NOTE_RESPONSE = 'SAVE_NOTE_RESPONSE'

export type IpcResponse = any;
export interface IpcChannelInterface {
 getName(): string;
 handle(event: IpcMainEvent | IpcRendererEvent, response: IpcResponse): void;
}
export interface IpcRequest {
 params: string;
}
