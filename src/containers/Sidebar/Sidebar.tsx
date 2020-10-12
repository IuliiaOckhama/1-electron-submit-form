import * as React from 'react'
import SidebarNote from '../../components/SidebarNote'
import { DataStoreStructure, Note, UiStoreStructure } from '../../entities'
import './Sidebar.css'

interface StateProps {
 data: DataStoreStructure;
 ui: UiStoreStructure
}
interface DispatchProps {
 setSelectedNote: (note: Note) => void;
 createNewNote: () => void
 confirmNoteSave: () => void
 deleteNote: () => void
}

export default function Sidebar(props: StateProps & DispatchProps) {
 const {
  data: { notes, selectedNote },
  ui: { isNoteChanged },
  setSelectedNote,
  createNewNote,
  confirmNoteSave,
  deleteNote
 } = props
 const handleSidebarNoteClick = React.useCallback(
  (note: Note) => {
    confirmNoteSave()
    setSelectedNote(note)
  },
  [confirmNoteSave, setSelectedNote]
 )

 return (
  <div className="sidebar">
    <div className="sidebar__header">
      <div className="sidebar__title">
        <h3>All notes</h3>
        <p>{notes.length} notes</p>
      </div>
      <input className="sidebar__input" type="text" placeholder="Search by keyword..." />
      <div className="sidebar__buttons-container">
       <button onClick={createNewNote} className="sidebar__button sidebar__button_save"></button>
       <button onClick={deleteNote} className="sidebar__button sidebar__button_delete">Delete Note</button>
     </div>
    </div>
   <div className="sidebar__notes-list">
    {notes.map((note: Note) => (
     <SidebarNote
      key={note.id}
      note={note}
      selectedNote={selectedNote}
      handleSidebarNoteClick={handleSidebarNoteClick}
     />
    ))}
   </div>
  </div>
 )
}
