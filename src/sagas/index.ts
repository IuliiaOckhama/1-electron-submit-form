import { all } from 'redux-saga/effects'
import { setNotesSaga, updateNoteSaga, createNewNoteSaga, confirmNoteSaveSaga, deleteNoteSaga } from './sagas'
function* rootSaga() {
  yield all([
    setNotesSaga(),
    updateNoteSaga(),
    createNewNoteSaga(),
    deleteNoteSaga(),
    confirmNoteSaveSaga()
  ])
}

export default rootSaga