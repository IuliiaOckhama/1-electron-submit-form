/* eslint-disable import/first */
import { takeLatest, put, call, select, take } from 'redux-saga/effects'

/******************************************************************************/
/******************************* TYPES ****************************************/
/******************************************************************************/

import { CREATE_NEW_NOTE, CONFIRM_NOTE_SAVE, DELETE_NOTE, FETCH_NOTES, SEND_CONFIRMATION, UPDATE_NOTE } from '../actions/types'
import { Note } from '../entities'

/******************************************************************************/
/******************************* SELECTORS ************************************/
/******************************************************************************/

import { State } from '../reducers'
const getNotes = (state: State) => state.data.notes
const getSelectedNote = (state: State) => state.data.selectedNote

/******************************************************************************/
/******************************* ACTIONS **************************************/
/******************************************************************************/

import { addNewNote, setNotes, setSelectedNote } from '../actions/dataActions'
import { setRequestError } from '../actions/uiActions'

/******************************************************************************/
/******************************* HELPERS **************************************/
/******************************************************************************/

import { createNewNoteApi, deleteNoteApi, fetchNotesApi, updateNoteApi } from './api'
import { sendIpcReq } from './ipc'

/******************************************************************************/
/******************************* SAGAS *************************************/
/******************************************************************************/

function* handleSetNotesSaga() {
 try {
  const notes = yield call(fetchNotesApi)
  yield put(setNotes(notes.data))
  yield put(setSelectedNote(notes.data[0]))
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
    content: string
  }
}
function* handleUpdateNoteSaga({ payload }: UpdateNoteAction ) {
  try {
    const notes = yield select(getNotes)
    const noteToUpdate = notes.find((note: Note) => note.id === payload.id)
    noteToUpdate.title = payload.title
    noteToUpdate.content = payload.content
    noteToUpdate.updated = new Date().toJSON()
    yield call(updateNoteApi, noteToUpdate)
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

function* handleDeleteNoteSaga() {
  try {
    const selectedNote = yield select(getSelectedNote)
    yield call(deleteNoteApi, selectedNote.id)
    yield put(setSelectedNote(null))
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
    yield put(setRequestError(error.message))
  }
}

function* handleConfirmNoteSaveSaga() {
  try {
    // call ipc
    // ipc is showing modal
    // if save, call save saga and set selected note
    // if not save, set selected note
    
    yield call (sendIpcReq, 'SAVE_NOTE')
    const res = yield take(SEND_CONFIRMATION)
    yield console.log('confirmation', res.payload)
  } catch (error) {
    const err = new Error(error)
    console.log(err.stack)
    yield put(setRequestError(error.message))
  }
}

export function* setNotesSaga() {
 yield takeLatest(FETCH_NOTES, handleSetNotesSaga)
}
export function* updateNoteSaga(){
  yield takeLatest(UPDATE_NOTE, handleUpdateNoteSaga)
}
export function* createNewNoteSaga(){
  yield takeLatest(CREATE_NEW_NOTE, handleCreateNewNoteSaga)
}
export function* deleteNoteSaga(){
  yield takeLatest(DELETE_NOTE, handleDeleteNoteSaga)
}
export function* confirmNoteSaveSaga() {
  yield takeLatest(CONFIRM_NOTE_SAVE, handleConfirmNoteSaveSaga)
}