import * as React from 'react'
import SidebarNote from '../../components/SidebarNote'
import { Note } from '../../entities'
import { DataStoreStructure, UiStoreStructure } from '../../entities/storeTypes'
import './Sidebar.css'

interface StateProps {
 data: DataStoreStructure;
 ui: UiStoreStructure
}
interface DispatchProps {
 createNewNote: () => void
 setSidebarTab: (note: Note) => void
 deleteButtonClick: () => void
}

export default function Sidebar(props: StateProps & DispatchProps) {
 const {
  data: { notes, selectedNote },
  createNewNote,
  setSidebarTab,
  deleteButtonClick,
 } = props

 const handleSidebarNoteClick = React.useCallback(
  (note: Note) => {
    setSidebarTab(note)
  },
  [setSidebarTab]
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
       <button onClick={deleteButtonClick} className="sidebar__button sidebar__button_delete">Delete Note</button>
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
