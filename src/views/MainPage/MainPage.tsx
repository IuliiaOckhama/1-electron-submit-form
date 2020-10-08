import * as React from 'react'
import './MainPage.css'

import Sidebar from '../../containers/Sidebar'
import Editor from '../../containers/Editor'

import { DataStoreStructure } from '../../entities'

interface DispatchProps {
 fetchNotes: () => void;
}
interface StateProps {
 data: DataStoreStructure;
}
export default function MainPage(
 props: StateProps & DispatchProps
): React.ReactElement {
 const { fetchNotes } = props
 React.useEffect(() => {
  fetchNotes()
 }, [fetchNotes])
 return (
  <div className="main-container">
   <Sidebar />
   <Editor />
  </div>
 )
}
