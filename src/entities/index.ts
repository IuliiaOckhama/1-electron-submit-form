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
  isDirty: false,
  state: NoteState
}
export type Note = {
 id: number,
 title: string,
 content: string,
 created: string,
 updated: string,
}
export const SelectInputOptionsValues = [{ value: 'Title' }, { value: 'Updated' }, { value: 'Created' }] as const;
export type SelectInputOptions = typeof SelectInputOptionsValues[number]['value']