import * as React from 'react'
import { IpcRenderer } from 'electron'
import SidebarNote from '../../components/SidebarNote'
import { DataStoreStructure, Note } from '../../entities'
import './Sidebar.css'

interface StateProps {
 data: DataStoreStructure;
}
interface DispatchProps {
 setSelectedNote: (note: Note) => void;
}

export default function Sidebar(props: StateProps & DispatchProps) {
 const {
  data: { notes, selectedNote },
  setSelectedNote,
 } = props
 const handleSidebarNoteClick = React.useCallback(
  (note: Note) => setSelectedNote(note),
  [setSelectedNote]
 )

 return (
  <div className="sidebar">
   <div className="sidebar__title">
    <h3>All notes</h3>
    <p>{notes.length} notes</p>
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
