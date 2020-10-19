import {Note, SelectedNote, SelectInputOptions} from './'

export interface DataStoreStructure {
  notes: Note[];
  page: 1,
  sortBy: null | SelectInputOptions
  selectedNote: SelectedNote
 }
 export interface UiStoreStructure {
   reqError: string | null
 }