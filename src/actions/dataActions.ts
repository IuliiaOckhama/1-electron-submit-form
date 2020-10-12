import { ADD_NEW_NOTE, DELETE_NOTE, FETCH_NOTES, CREATE_NEW_NOTE, SET_NOTES, SET_SELECTED_NOTE, UPDATE_NOTE } from './types'
import { Note } from '../entities'

export const addNewNote = (note: Note) => ({ type: ADD_NEW_NOTE, payload: note })
export const createNewNote = () => ({ type: CREATE_NEW_NOTE })
export const deleteNote = () => ({ type: DELETE_NOTE })
export const fetchNotes = () => ({ type: FETCH_NOTES })
export const setNotes = (notes: Note[]) => ({ type: SET_NOTES, payload: notes })
export const setSelectedNote = (note: Note | null) => ({ type: SET_SELECTED_NOTE, payload: note })
export const updateNote = (id: number, title: string, content: Node[]) => ({
  type: UPDATE_NOTE,
  payload: {
    id, title, content
  }
})
