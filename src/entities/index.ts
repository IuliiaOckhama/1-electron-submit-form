import { Node } from 'slate';

export type FormValue = string
export interface BaseProps {
  className: string
  [key: string]: unknown
}
export type OrNull<T> = T | null
export type NoteState = {
  content: Node[],
  title: string
}
export type SelectedNote = {
  id: number | null,
  prevState: NoteState,
  editorState: NoteState
}
export type Note = {
 id: number,
 title: string,
 content: string,
 created: string,
 updated: string,
}
