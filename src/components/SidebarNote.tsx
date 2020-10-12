import React from 'react'
import { Note } from '../entities'

type Props = {
 note: Note,
 selectedNote: Note | null,
 handleSidebarNoteClick: (note: Note) => void,
}

export default function SidebarNote(props: Props) {
 const { note, selectedNote, handleSidebarNoteClick } = props
 const createdDate = new Date(note.created)
 const isSelected = selectedNote && selectedNote.id === note.id
 return (
  <div
   className="sidebar__note"
   style={{
    borderColor: isSelected ? 'blue' : 'transparent',
   }}
   onClick={() => handleSidebarNoteClick(note)}
  >
   <h4>{note.title}</h4>
   {/* <p className="sidebar__note-content">{note.content}</p> */}
   <p>{createdDate.toLocaleDateString('en-US')}</p>
  </div>
 )
}
