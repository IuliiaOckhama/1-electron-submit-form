
import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import {
  DataStoreStructure
} from '../entities'

const rootReducer = () =>
  combineReducers({
    data: dataReducer
  })

export interface State {
  data: DataStoreStructure;
}

export default rootReducer