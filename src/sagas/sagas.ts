/* eslint-disable import/first */
import { debounce, takeLatest, put, call, select, take } from 'redux-saga/effects'

/******************************************************************************/
/******************************* TYPES ****************************************/
/******************************************************************************/

import { Node } from 'slate'
import { 
  CREATE_NEW_NOTE, 
  DELETE_BUTTON_CLICK, 
  SAVE_BUTTON_CLICK,
  SET_SIDEBAR_TAB, 
  SET_SORTBY,
  SEND_SAVE_CONFIRMATION, 
  SEND_DELETE_CONFIRMATION,
  FETCH_NOTES, 
  UPDATE_NOTE,
  HANDLE_EDITOR_CHANGE,
} from '../actions/types'
import { CONFIRM_SAVE_NOTE, CONFIRM_DELETE_NOTE } from '../shared/entities'
import { Note, NoteState } from '../entities'

/******************************************************************************/
/******************************* SELECTORS ************************************/
/******************************************************************************/

import { State } from '../reducers'
const getNotes = (state: State) => state.data.notes
const getSelectedNote = (state: State) => state.data.selectedNote
const getPage = (state: State) => state.data.page
const getIsNoteChanged = (state: State) => state.data.selectedNote.isDirty
const getSortBy = (state: State) => state.data.sortBy

/******************************************************************************/
/******************************* ACTIONS **************************************/
/******************************************************************************/

import { addNewNote, deleteNote, setNotes, setSelectedNote, setSortedNotes, setPage, updateNote, normalizeSelectedNoteState, setNewNoteState } from '../actions/dataActions'
import { setRequestError } from '../actions/uiActions'

/******************************************************************************/
/******************************* HELPERS **************************************/
/******************************************************************************/

import { createNewNoteApi, deleteNoteApi, fetchNotesApi, fetchSortedNotes, updateNoteApi } from './api'
import { sendIpcReq } from './ipc'

/******************************************************************************/
/******************************* SAGAS *************************************/
/******************************************************************************/

function* handleFetchNotesSaga() {
 try {
  const page = yield select(getPage)
  const sortBy = yield select(getSortBy)
  let notes
  if (sortBy) {
    notes = yield call(fetchSortedNotes, sortBy, page)
    if (page === 1) {
      yield put(setSortedNotes(notes.data))
    } else {
      yield put(setNotes(notes.data))
    }
  } else {
    notes = yield call(fetchNotesApi, page)
    yield put(setNotes(notes.data))
  }
  yield put(setPage(page + 1))
  if (page === 1) {
    yield put(setSelectedNote(notes.data[0]))
  }
 } catch (error) {
  const err = new Error(error)
  console.log(err.stack)
  yield put(setRequestError(error.message))
 }
}


type UpdateNoteAction = {
  type: typeof UPDATE_NOTE,
  payload: {
    id: number,
    title: string,
    content: Node[]
  }
}
function* handleUpdateNoteSaga({ payload }: UpdateNoteAction ) {
  try {
    const notes = yield select(getNotes)
    const noteToUpdate = notes.find((note: Note) => note.id === payload.id)
    if (payload) {
      noteToUpdate.title = payload.title
      noteToUpdate.content = JSON.stringify(payload.content)
      noteToUpdate.updated = new Date().toJSON()
      yield call(updateNoteApi, noteToUpdate)
    }
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
    yield put(setRequestError(error.message))
  }
}

function* handleCreateNewNoteSaga() {
  try {
    const newNote = {
      title: '',
      content: '',
    }
    const newNoteWithId = yield call(createNewNoteApi, newNote)
    yield put(addNewNote(newNoteWithId.data))
    yield put(setSelectedNote(newNoteWithId.data))
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
    yield put(setRequestError(error.message))
  }
}

function* handleDeleteButtonClick() {
  try {
    yield call(sendIpcReq, CONFIRM_DELETE_NOTE)
    const userConfirmation = yield take(SEND_DELETE_CONFIRMATION)
    if (userConfirmation.payload) {
      const selectedNote = yield select(getSelectedNote)
      const notes = yield select(getNotes)
      yield call(deleteNoteApi, selectedNote.id)
      yield put(deleteNote(selectedNote.id))
      yield put(setSelectedNote(notes[0]))
    }
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
  }
}

type SetSidebarTabAction = {
  type: typeof SET_SIDEBAR_TAB,
  payload: Note
}
function* handleSetSidebarTabSaga({ payload }: SetSidebarTabAction) {
  try {
    const isNoteChanged = yield select(getIsNoteChanged)
    if (isNoteChanged) {
      yield call(sendIpcReq, CONFIRM_SAVE_NOTE)
      const userConfirmation = yield take(SEND_SAVE_CONFIRMATION)
      const selectedNote = yield select(getSelectedNote)
      if (userConfirmation.payload) {
        yield put(updateNote(selectedNote.id, selectedNote.state.title, selectedNote.state.content))
      }
    }
    yield put(setSelectedNote(payload))
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
    yield put(setRequestError(error.message))
  }
}
type HandleEditorChangeAction = {
  type: typeof SET_SIDEBAR_TAB,
  payload: NoteState
}
function* debounceHandleEditorChange({ payload }: HandleEditorChangeAction) {
  try {
    yield put(setNewNoteState(payload))
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
  }
}

function* handleSaveButtonClick() {
  try {
    const selectedNote = yield select(getSelectedNote)
    yield put(updateNote(selectedNote.id, selectedNote.state.title, selectedNote.state.content))
    yield put(normalizeSelectedNoteState())
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
  }
}
type SortByAction = {
  type: typeof SET_SORTBY,
  payload: string
}
function* handleSetSortBy({ payload }: SortByAction) {
  try {
    yield put(setPage(1))
    yield handleFetchNotesSaga()
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
  }
}

export function* fetchNotesSaga() {
 yield takeLatest(FETCH_NOTES, handleFetchNotesSaga)
}
export function* updateNoteSaga(){
  yield takeLatest(UPDATE_NOTE, handleUpdateNoteSaga)
}
/* Saga to create new note */
export function* createNewNoteSaga(){
  yield takeLatest(CREATE_NEW_NOTE, handleCreateNewNoteSaga)
}
/* Saga that controls switching between sidebar tabs  */
export function* setSidebarTabSaga() {
  yield takeLatest(SET_SIDEBAR_TAB, handleSetSidebarTabSaga)
}
/* Debounce saga that sets new note state
*/
export function* debounceHandleEditorChangeSaga() {
  yield debounce(200, HANDLE_EDITOR_CHANGE, debounceHandleEditorChange)
}
/* Saga that controls note saving */
export function* handleSaveButtonClickSaga() {
  yield takeLatest(SAVE_BUTTON_CLICK, handleSaveButtonClick)
}
/* Saga that controls note deletion */
export function* handleDeleteButtonClickSaga(){
  yield takeLatest(DELETE_BUTTON_CLICK, handleDeleteButtonClick)
}
/* Saga that fetchs sorted notes */
export function* setSortBySaga() {
  yield takeLatest(SET_SORTBY, handleSetSortBy)
}