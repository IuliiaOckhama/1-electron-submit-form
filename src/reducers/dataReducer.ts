import { AnyAction } from 'redux'
import { SET_NOTES, SET_SELECTED_NOTE } from '../actions/types'
import { DataStoreStructure } from '../entities'

const initState: DataStoreStructure = {
 notes: [],
 selectedNote: null,
}

const dataReducer = (state = initState, action: AnyAction) => {
 switch (action.type) {
  case SET_NOTES:
   return {
    ...state,
    notes: action.payload,
   }
  case SET_SELECTED_NOTE:
   return {
    ...state,
    selectedNote: action.payload,
   }
  default:
   return state
 }
}
export default dataReducer
