import { all } from 'redux-saga/effects'
import {setDataSaga} from './sagas'
function* rootSaga() {
  yield all([
    setDataSaga(),
  ])
}

export default rootSaga