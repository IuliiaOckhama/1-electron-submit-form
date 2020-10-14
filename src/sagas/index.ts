import { all } from 'redux-saga/effects'
import { setNotesSaga, updateNoteSaga, createNewNoteSaga, setSidebarTabSaga, handleDeleteButtonClickSaga, debouncesetNewEditorStateSaga, handleSaveButtonClickSaga } from './sagas'
function* rootSaga() {
  yield all([
    setNotesSaga(),
    updateNoteSaga(),
    createNewNoteSaga(),
    handleDeleteButtonClickSaga(),
    setSidebarTabSaga(),
    debouncesetNewEditorStateSaga(),
    handleSaveButtonClickSaga()
  ])
}

export default rootSaga