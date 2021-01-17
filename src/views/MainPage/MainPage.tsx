import * as React from 'react'
import './MainPage.css'

import Editor from '../../containers/Editor'
import ErrorMessage from '../../containers/ErrorMessage'
import Sidebar from '../../containers/Sidebar'

interface DispatchProps {
 fetchNotes: () => void;
}
export default function MainPage(
 props: DispatchProps
): React.ReactElement {
 const { fetchNotes } = props

 React.useEffect(() => {
  fetchNotes()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 return (
  <div className="main-container">
   <ErrorMessage />
   <Sidebar />
   <Editor />
  </div>
 )
}
