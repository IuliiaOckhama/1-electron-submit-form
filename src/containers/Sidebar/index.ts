import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { createNewNote, setSortBy, fetchNotes } from '../../actions/dataActions'
import { setSidebarTab, deleteButtonClick } from '../../actions/uiActions'
import { Note } from '../../entities'

import Sidebar from './Sidebar'

const mapStateToProps = (state: State) => ({
 data: state.data,
 ui: state.ui
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
 createNewNote: () => dispatch(createNewNote()),
 deleteButtonClick: () => dispatch(deleteButtonClick()),
 fetchNotes: () => dispatch(fetchNotes()),
 setSidebarTab: (note: Note) => dispatch(setSidebarTab(note)),
 setSortBy: (sortBy: string) => dispatch(setSortBy(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
