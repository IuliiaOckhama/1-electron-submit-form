import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
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
 fetchNotes: () => void
}

export default function Sidebar(props: StateProps & DispatchProps) {
 const {
  data: { notes, selectedNote },
  createNewNote,
  setSidebarTab,
  deleteButtonClick,
  fetchNotes
 } = props

 const handleSidebarNoteClick = React.useCallback(
  (note: Note) => {
    setSidebarTab(note)
  },
  [setSidebarTab]
 )

 const loadMore = () => {
   console.log('loadMore');
   fetchNotes()
 }

 return (
  <div className="sidebar">
    <div className="sidebar__header">
      <div className="sidebar__title">
        <h3>All notes</h3>
        <p>{notes.length} notes</p>
      </div>
      <div className="sidebar__sortBy-container">
        <span>Search by:</span>
      </div>
      <div className="sidebar__buttons-container">
       <button onClick={createNewNote} className="sidebar__button sidebar__button_save"></button>
       <button onClick={deleteButtonClick} className="sidebar__button sidebar__button_delete">Delete</button>
     </div>
    </div>
  
    <InfiniteScroll
      dataLength={notes.length}
      next={loadMore}
      hasMore={true}
      loader={<span></span>}
      scrollableTarget="sidebar__notes-container"
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="sidebar__notes-container" id="sidebar__notes-container">
        {notes.map((note: Note) => (
          <SidebarNote
            key={note.id}
            note={note}
            selectedNote={selectedNote}
            handleSidebarNoteClick={handleSidebarNoteClick}
          />
        ))}
      </div>
    </InfiniteScroll>  
   </div>
 )
}
