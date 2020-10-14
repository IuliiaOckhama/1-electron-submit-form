import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { createNewNote } from '../../actions/dataActions'
import { saveButtonClick, handleEditorChange } from '../../actions/uiActions'
import { NoteState } from '../../entities'
import Editor from './Editor'

const mapStateToProps = (state: State) => ({
 data: state.data,
 ui: state.ui
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  createNewNote: () => dispatch(createNewNote()),
  handleEditorChange: (noteState: NoteState) => dispatch(handleEditorChange(noteState)),
  saveButtonClick: () => dispatch(saveButtonClick())
 })

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
