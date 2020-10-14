import { connect } from 'react-redux'
import { State } from '../../reducers'

import ErrorMessage from './ErrorMessage'

const mapStateToProps = (state: State) => ({
 ui: state.ui
})


export default connect(mapStateToProps)(ErrorMessage)
