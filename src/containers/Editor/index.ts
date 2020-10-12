import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { updateNote, createNewNote } from '../../actions/dataActions'
import { setIsNoteChanged } from '../../actions/uiActions'
import Editor from './Editor'

const mapStateToProps = (state: State) => ({
 data: state.data,
 ui: state.ui
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNote: (id: number, title: string, content:any) => dispatch(updateNote(id, title, content)),
  createNewNote: () => dispatch(createNewNote()),
  setIsNoteChanged: (isChanged: boolean) => dispatch(setIsNoteChanged(isChanged))
 })

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
