import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { createNewNote } from '../../actions/dataActions'
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
 setSidebarTab: (note: Note) => dispatch(setSidebarTab(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
