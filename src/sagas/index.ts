import { all } from 'redux-saga/effects'
import { fetchNotesSaga, updateNoteSaga, createNewNoteSaga, setSidebarTabSaga, setSortBySaga, handleDeleteButtonClickSaga, debounceHandleEditorChangeSaga, handleSaveButtonClickSaga } from './sagas'
function* rootSaga() {
  yield all([
    fetchNotesSaga(),
    updateNoteSaga(),
    createNewNoteSaga(),
    handleDeleteButtonClickSaga(),
    setSidebarTabSaga(),
    setSortBySaga(),
    debounceHandleEditorChangeSaga(),
    handleSaveButtonClickSaga()
  ])
}

export default rootSaga