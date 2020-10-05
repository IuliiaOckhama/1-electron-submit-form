import * as React from 'react'
import Form from '../components/Form'
import './MainPage.css'
import { FormValue } from '../entities'

const ipcRenderer = window.require('electron').ipcRenderer

export default function MainPage() {
 const [value, setValue] = React.useState<string>('')
 const handleValueChange = (value: FormValue) => {
  setValue(value)
 }
 const handleFormSubmit = () => {
  ipcRenderer.send('SUBMIT_FORM', value)
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
