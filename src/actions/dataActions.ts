import { FETCH_NOTES, SET_NOTES, SET_SELECTED_NOTE } from './types'
import { Note } from '../entities'

export const setNotes = (notes: Note[]) => ({
 type: SET_NOTES,
 payload: notes,
})
export const setSelectedNote = (note: Note) => ({
 type: SET_SELECTED_NOTE,
 payload: note,
})
export const fetchNotes = () => ({ type: FETCH_NOTES })
