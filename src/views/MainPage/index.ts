import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../../reducers'
import { setData } from '../../actions/dataActions'
import MapPage from './MainPage'

const mapStateToProps = (state: State) => ({
  data: state.data,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setData: (data: any) => dispatch(setData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)