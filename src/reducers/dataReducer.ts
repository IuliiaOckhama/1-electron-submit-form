import { AnyAction } from 'redux'
import {
  SET_DATA
} from '../actions/types'
import { DataStoreStructure } from '../entities'

const initState: DataStoreStructure = {
  data: []
}

const dataReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}
export default dataReducer