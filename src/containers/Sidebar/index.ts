import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { setSelectedNote } from '../../actions/dataActions'
import { Note } from '../../entities'

import Sidebar from './Sidebar'

const mapStateToProps = (state: State) => ({
 data: state.data,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
 setSelectedNote: (note: Note) => dispatch(setSelectedNote(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
