import { all } from 'redux-saga/effects'
import { setNotesSaga, updateNoteSaga, createNewNoteSaga, setSidebarTabSaga, handleDeleteButtonClickSaga, debounceHandleEditorChangeSaga, handleSaveButtonClickSaga } from './sagas'
function* rootSaga() {
  yield all([
    setNotesSaga(),
    updateNoteSaga(),
    createNewNoteSaga(),
    handleDeleteButtonClickSaga(),
    setSidebarTabSaga(),
    debounceHandleEditorChangeSaga(),
    handleSaveButtonClickSaga()
  ])
}

export default rootSaga