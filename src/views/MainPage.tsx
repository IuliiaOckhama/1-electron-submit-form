import * as React from 'react'
import Form from '../components/Form'
import './MainPage.css'
import { FormValue } from '../entities'
import {IpcService} from "../services";


export default function MainPage() {
 const [value, setValue] = React.useState<string>('')
 const ipc = new IpcService()
 const handleValueChange = (value: FormValue) => {
  setValue(value)
 }
 const handleFormSubmit = () => {
  ipc.send('submit-username', value)
 }
 return (
  <div className="form-container">
   <Form
    value={value}
    handleValueChange={handleValueChange}
    handleFormSubmit={handleFormSubmit}
   />
  </div>
 )
}
