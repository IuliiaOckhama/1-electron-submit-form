import { AnyAction } from 'redux'
import { SET_REQUEST_ERROR } from '../actions/types'
import { UiStoreStructure } from '../entities/storeTypes'

const initState: UiStoreStructure = {
 reqError: null
}

const uiReducer = (state = initState, action: AnyAction) => {
 switch (action.type) {
  case SET_REQUEST_ERROR:
   return {
    ...state,
    reqError: action.payload,
   }

  default:
   return state
 }
}
export default uiReducer
