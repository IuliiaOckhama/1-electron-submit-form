import { connect } from 'react-redux'
import { State } from '../../reducers'
import Editor from './Editor'

const mapStateToProps = (state: State) => ({
 data: state.data,
})

export default connect(mapStateToProps)(Editor)
