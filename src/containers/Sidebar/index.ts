import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { setSelectedNote, createNewNote, deleteNote } from '../../actions/dataActions'
import { confirmNoteSave } from '../../actions/uiActions'
import { Note } from '../../entities'

import Sidebar from './Sidebar'

const mapStateToProps = (state: State) => ({
 data: state.data,
 ui: state.ui
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
 confirmNoteSave: () => dispatch(confirmNoteSave()),
 setSelectedNote: (note: Note) => dispatch(setSelectedNote(note)),
 createNewNote: () => dispatch(createNewNote()),
 deleteNote: () => dispatch(deleteNote()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
