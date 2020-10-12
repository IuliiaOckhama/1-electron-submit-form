export type FormValue = string
export interface DataStoreStructure {
 notes: Note[];
 selectedNote: Note | null;
}
export interface UiStoreStructure {
  reqError: string | null,
  isNoteChanged: boolean
}
export type Note = {
 id: number,
 title: string,
 content: string,
 created: string,
 updated: string,
}
export interface BaseProps {
  className: string
  [key: string]: unknown
}
export type OrNull<T> = T | null

const BlockButtonFormats = ['heading-one', 'heading-two'] as const;
export type BlockButtonFormats = typeof BlockButtonFormats[number]

const BlockButtonIcons = ['h1', 'h2'] as const;
type BlockButtonIcons = typeof BlockButtonIcons[number]
export interface BlockButtonProps {
  format: BlockButtonFormats,
  icon: BlockButtonIcons
}

const MarkButtonFormats = ['bold', 'italic', 'underline', 'code'] as const;
export type MarkButtonFormats = typeof MarkButtonFormats[number]

const MarkButtonIcons = ['bold', 'italic', 'underlined', 'code'] as const;
type MarkButtonIcons = typeof MarkButtonIcons[number]
export interface MarkButtonProps {
  format: MarkButtonFormats,
  icon: MarkButtonIcons
}