import { AnyAction } from 'redux'
import { 
  ADD_NEW_NOTE, 
  DELETE_NOTE, 
  SET_NOTES,
  SET_SORTED_NOTES,
  SET_PAGE,
  SET_SORTBY,
  SET_SELECTED_NOTE, 
  SET_NEW_NOTE_STATE, 
  NORMALIZE_SELECTED_NOTE_STATE, 
  UPDATE_NOTE } from '../actions/types'
import { Note } from '../entities'
import { DataStoreStructure } from '../entities/storeTypes'

import { isValidJson, convertStringContent } from '../helpers'
import { INITIAL_VALUE } from '../constants'

const initState: DataStoreStructure = {
 notes: [],
 page: 1,
 sortBy: null,
 selectedNote: {
  id: null,
  isDirty: false,
  state: {
    content: INITIAL_VALUE,
    title: ''
  }
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
    notes: state.notes.concat(action.payload),
   }
  case SET_SORTBY: 
   return {
     ...state,
     sortBy: action.payload
   }
  case SET_SORTED_NOTES:
    return {
      ...state,
      notes: action.payload
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
      isDirty: false,
      state: {
        content,
        title: action.payload.title,
      }
    },
   }
  case SET_PAGE:
    return {
      ...state,
      page: action.payload
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
  case SET_NEW_NOTE_STATE:
    return {
      ...state,
      selectedNote: {
        ...state.selectedNote,
        isDirty: action.payload.isDirty,
        state: action.payload.state
      }
    }
  case NORMALIZE_SELECTED_NOTE_STATE: {
    return {
      ...state,
      selectedNote: {
        ...state.selectedNote,
        isDirty: false
      },
    }
  }
  default:
   return state
 }
}
export default dataReducer
