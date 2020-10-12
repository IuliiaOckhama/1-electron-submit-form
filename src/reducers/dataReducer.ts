import { AnyAction } from 'redux'
import { ADD_NEW_NOTE, DELETE_NOTE, SET_NOTES, SET_SELECTED_NOTE, UPDATE_NOTE } from '../actions/types'
import { DataStoreStructure, Note } from '../entities'

const initState: DataStoreStructure = {
 notes: [],
 selectedNote: null,
}

const dataReducer = (state = initState, action: AnyAction) => {
 switch (action.type) {
  case SET_NOTES:
   return {
    ...state,
    notes: action.payload,
   }
  case SET_SELECTED_NOTE:
   return {
    ...state,
    selectedNote: action.payload,
   }
  case ADD_NEW_NOTE:
    return {
      ...state,
      notes: [action.payload, ...state.notes]
    }
  case UPDATE_NOTE:
    const noteToUpdate = state.notes.find((note: Note) => note.id === action.payload.id)
    if (noteToUpdate) {
      noteToUpdate.title = action.payload.title
      noteToUpdate.content = action.payload.content
      noteToUpdate.updated = new Date().toJSON()

      return {
        ...state,
        notes: state.notes.map((note: Note) =>  note.id === noteToUpdate.id ? noteToUpdate : note)
      }
    } else {
      return state
    } 
  case DELETE_NOTE:
    if (state.selectedNote) {
      return {
        ...state,
        notes: state.notes.filter((note: Note) => state.selectedNote && note.id === state.selectedNote.id ? false : true)
      }
    } else {
      return state
    }
    
  default:
   return state
 }
}
export default dataReducer
