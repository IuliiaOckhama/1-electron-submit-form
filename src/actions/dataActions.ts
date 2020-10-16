import { 
  ADD_NEW_NOTE, 
  DELETE_NOTE, 
  FETCH_NOTES, 
  CREATE_NEW_NOTE, 
  SET_NOTES, 
  SET_PAGE, 
  SET_SELECTED_NOTE, 
  SET_NEW_EDITOR_STATE, 
  UPDATE_NOTE, 
  NORMALIZE_SELECTED_NOTE_STATE 
} from './types'
import { Note, NoteState } from '../entities'

export const addNewNote = (note: Note) => ({ type: ADD_NEW_NOTE, payload: note })
export const createNewNote = () => ({ type: CREATE_NEW_NOTE })
export const deleteNote = (id: number) => ({ type: DELETE_NOTE, payload: id })
export const fetchNotes = () => ({ type: FETCH_NOTES })
export const setNotes = (notes: Note[]) => ({ type: SET_NOTES, payload: notes })
export const setPage = (page: number) => ({ type: SET_PAGE, payload: page })
export const setNewEditorState = (noteState: NoteState) => ( { type: SET_NEW_EDITOR_STATE, payload: noteState})
export const setSelectedNote = (note: Note | null) => ({ type: SET_SELECTED_NOTE, payload: note })
export const normalizeSelectedNoteState = () => ( { type: NORMALIZE_SELECTED_NOTE_STATE } )
export const updateNote = (id: number, title: string, content: Node[]) => ({
  type: UPDATE_NOTE,
  payload: {
    id, title, content
  }
})
