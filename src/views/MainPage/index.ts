import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { fetchNotes } from '../../actions/dataActions'
import MapPage from './MainPage'

const mapStateToProps = (state: State) => ({
 data: state.data,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
 fetchNotes: () => dispatch(fetchNotes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)
