
import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import uiReducer from './uiReducer'
import { DataStoreStructure, UiStoreStructure } from '../entities/storeTypes'

const rootReducer = () =>
  combineReducers({
    data: dataReducer,
    ui: uiReducer
  })

export interface State {
  data: DataStoreStructure;
  ui: UiStoreStructure
}

export default rootReducer