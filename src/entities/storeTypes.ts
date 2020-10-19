import {Note, SelectedNote} from './'

export interface DataStoreStructure {
  notes: Note[];
  page: 1,
  selectedNote: SelectedNote
 }
 export interface UiStoreStructure {
   reqError: string | null
 }