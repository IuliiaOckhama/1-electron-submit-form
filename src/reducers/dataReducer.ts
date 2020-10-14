import { AnyAction } from 'redux'
import { ADD_NEW_NOTE, DELETE_NOTE, SET_NOTES, SET_SELECTED_NOTE, SET_NEW_EDITOR_STATE, NORMALIZE_SELECTED_NOTE_STATE, UPDATE_NOTE } from '../actions/types'
import { Note } from '../entities'
import { DataStoreStructure } from '../entities/storeTypes'

import { isValidJson, convertStringContent } from '../helpers'

const initState: DataStoreStructure = {
 notes: [],
 selectedNote: {
   id: null,
   prevState: {
     content: [],
     title: ''
   },
   editorState: {
    content: [],
    title: ''
  },
 },
}

const renderNoteContent = (content: string) => {
  return isValidJson(content) ? JSON.parse(content) : convertStringContent(content)
}

const dataReducer = (state = initState, action: AnyAction) => {
 switch (action.type) {
  case SET_NOTES:
   return {
    ...state,
    notes: action.payload,
   }
  case SET_SELECTED_NOTE:
   if (action.payload === null) {
      return initState.selectedNote
   }
   const content = Array.isArray(action.payload.content) ? action.payload.content : renderNoteContent(action.payload.content)
   return {
    ...state,
    selectedNote: {
      id: action.payload.id,
      prevState: {
        content,
        title: action.payload.title,
      },
      editorState: {
        content,
        title: action.payload.title,
      }
    },
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
        notes: state.notes.map((note: Note) => note.id === noteToUpdate.id ? noteToUpdate : note)
      }
    } else {
      return state
    } 
  case DELETE_NOTE:
    if (state.selectedNote) {
      return {
        ...state,
        notes: state.notes.filter((note: Note) => note.id === action.payload ? false : true)
      }
    } else {
      return state
    } 
  case SET_NEW_EDITOR_STATE:
    return {
      ...state,
      selectedNote: {
        ...state.selectedNote,
        editorState: action.payload
      }
    }
  case NORMALIZE_SELECTED_NOTE_STATE: {
    return {
      ...state,
      selectedNote: {
        ...state.selectedNote,
        prevState: state.selectedNote.editorState
      },
      }
  }
  default:
   return state
 }
}
export default dataReducer
