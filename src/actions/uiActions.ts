import { CONFIRM_NOTE_SAVE, SET_REQUEST_ERROR, SET_IS_NOTE_CHANGED, SEND_CONFIRMATION } from './types'

export const setRequestError = (error: string) => ({ type: SET_REQUEST_ERROR, payload: error })
export const setIsNoteChanged = (isChanged: boolean) => ({ type: SET_IS_NOTE_CHANGED, payload: isChanged })
export const confirmNoteSave = () => ({ type: CONFIRM_NOTE_SAVE })
export const sendConfirmation = (confirmation: boolean) => ({ type: SEND_CONFIRMATION, payload: confirmation })