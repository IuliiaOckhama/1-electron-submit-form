import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { fetchNotes } from '../../actions/dataActions'
import MapPage from './MainPage'

const mapDispatchToProps = (dispatch: Dispatch) => ({
 fetchNotes: () => dispatch(fetchNotes()),
})

export default connect(null, mapDispatchToProps)(MapPage)
