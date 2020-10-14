import React from 'react'
import { SelectedNote, Note } from '../entities'

type Props = {
 note: Note,
 selectedNote: SelectedNote | null,
 handleSidebarNoteClick: (note: Note) => void,
}

export default function SidebarNote(props: Props) {
 const { note, selectedNote, handleSidebarNoteClick } = props
 const lastUpdatedDate = new Date(note.updated)
 const isSelected = selectedNote && selectedNote.id === note.id
 return (
  <div
   className="sidebar__note"
   style={{
    borderColor: isSelected ? 'blue' : 'transparent',
   }}
   onClick={() => handleSidebarNoteClick(note)}
  >
   <h4>{note.title.length > 0 ? note.title : 'New Untitled Note'}</h4>
   <p>{`UPD: ${lastUpdatedDate.toLocaleDateString('en-US')}`}</p>
  </div>
 )
}
