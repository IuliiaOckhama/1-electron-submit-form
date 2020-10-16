import { all } from 'redux-saga/effects'
import { fetchNotesSaga, updateNoteSaga, createNewNoteSaga, setSidebarTabSaga, handleDeleteButtonClickSaga, debounceHandleEditorChangeSaga, handleSaveButtonClickSaga } from './sagas'
function* rootSaga() {
  yield all([
    fetchNotesSaga(),
    updateNoteSaga(),
    createNewNoteSaga(),
    handleDeleteButtonClickSaga(),
    setSidebarTabSaga(),
    debounceHandleEditorChangeSaga(),
    handleSaveButtonClickSaga()
  ])
}

export default rootSaga