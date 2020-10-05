import * as React from 'react'
import './Form.css'
import { FormValue } from '../entities'

type Props = {
 value: FormValue,
 handleValueChange: (value: string) => void,
 handleFormSubmit: () => void,
}

export default function Form(props: Props) {
 const { value, handleValueChange, handleFormSubmit } = props
 const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  handleValueChange(e.target.value)
 }
 const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  handleFormSubmit()
 }
 return (
  <form className="submit-form" onSubmit={_handleSubmit}>
   <label htmlFor="username" className="submit-form__label">
    Username:
   </label>
   <input
    className="submit-form__text-input"
    type="text"
    id="username"
    name="username"
    value={value}
    onChange={_handleChange}
    placeholder="John Doe"
   />
   <input className="submit-form__submit-input" type="submit" value="Submit" />
  </form>
 )
}
