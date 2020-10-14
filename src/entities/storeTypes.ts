import {Note, SelectedNote} from './'

export interface DataStoreStructure {
  notes: Note[];
  selectedNote: SelectedNote
 }
 export interface UiStoreStructure {
   reqError: string | null,
   isNoteChanged: boolean
 }