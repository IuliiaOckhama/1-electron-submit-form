import * as React from 'react'
import './MainPage.css'

import Sidebar from '../../components/Sidebar/Sidebar'
import Note from '../../components/Note/Note'

import { DataStoreStructure } from '../../entities'

interface DispatchProps {
  setData: (data: any) => void;
}
interface StateProps {
  data: DataStoreStructure;
}
export default function MainPage(props: StateProps & DispatchProps): React.ReactElement {
  return (
    <div className="main-container">
      <Sidebar />
      <Note />
    </div>
  )
}
