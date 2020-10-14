import * as React from 'react'
import { UiStoreStructure } from '../../entities'
import './ErrorMessage.css'

interface StateProps {
  ui: UiStoreStructure
}
export default function ErrorMessage(props: StateProps) {
  const { ui: { reqError } } = props
  return (
    <div className={`error-message-container ${reqError ? `error-message-container_active` : `error-message-container_disabled`}`}>
      <p>{reqError}</p>
    </div>
  )
}
