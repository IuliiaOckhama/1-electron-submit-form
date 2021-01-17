import * as React from 'react'
import { SelectInputOptionsValues, SelectInputOptions } from '../entities'
interface Props {
  options: typeof SelectInputOptionsValues,
  placeholder: string,
  handleSelectOption: (sortOption: SelectInputOptions) => void,
  value: SelectInputOptions | ''
}
const SelectInput = (props: Props) => {
  const { options, placeholder, handleSelectOption, value } = props
  const [values, setValues] = React.useState<SelectInputOptions | ''>('')
  const [focusedValue, setFocusedValue] = React.useState<number>(-1)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (value) {
      setValues(value)
    }
  }, [value])


  const onBlur = () => {
    const value = values[0]
    let currentFocusedValue = -1
    if (value) {
      currentFocusedValue = options.findIndex((option:any) => option.value === value)
    }
    setFocusedValue(currentFocusedValue)
    setIsOpen(false)
  }

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const onHoverOption = (e:any) => {
    const { value } = e.currentTarget.dataset
    const index = options.findIndex((option:any) => option.value === value)
    setFocusedValue(index)
  }

  const onClickOption = (e:any) => {
    const { value } = e.currentTarget.dataset
    const index = values.indexOf(value)
    if (index === -1) {
      setValues(value)
      handleSelectOption(value)
      setIsOpen(false)
    }
  }

  const renderValues = () => {
    if (values.length === 0) {
      return <div className="select__placeholder text_p2">{placeholder}</div>
    }

    return <div className="select__value">{values}</div>
  }

  const renderOptions = () => {
    if (!isOpen) {
      return null
    }
    return <div className="select__options">{options.map(renderOption)}</div>
  }

  const renderOption = (option:any, index:number) => {
    const { value } = option
    const selected = values.includes(value)

    let className = 'select__option'
    if (selected) className += ' select__option_selected'
    if (index === focusedValue) className += ' select__option_focused'
    if (index === options.length - 1) className += ' select__option_last'
    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={onHoverOption}
        onClick={onClickOption}
      >
        {value}
      </div>
    )
  }

  return (
    <div>
      <div
        className="select"
        tabIndex={0}
        onBlur={onBlur}
      >
        <div
          className={
            isOpen ? 'select__input select__input_open' : 'select__input'
          }
          onClick={onClick}
        >
          {renderValues()}
        </div>
        {renderOptions()}
      </div>
    </div>
  )
}

export default SelectInput