import { AnyAction } from 'redux'
import { SET_REQUEST_ERROR, SET_IS_NOTE_CHANGED } from '../actions/types'
import { UiStoreStructure } from '../entities'

const initState: UiStoreStructure = {
 reqError: null,
 isNoteChanged: false
}

const uiReducer = (state = initState, action: AnyAction) => {
 switch (action.type) {
  case SET_REQUEST_ERROR:
   return {
    ...state,
    reqError: action.payload,
   }
  case SET_IS_NOTE_CHANGED:
    return {
      ...state,
      isNoteChanged: action.payload
    }
  default:
   return state
 }
}
export default uiReducer
