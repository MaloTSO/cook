import {useRef, useState, useEffect} from 'react'

import './TextField.scss'

const TextField = ({label, value, setter, disabled, isSecure}) => {

  const fieldRef = useRef(null)

  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {if (disabled) {setHasFocus(false)}}, [disabled])

  const handleFocus = () => {fieldRef?.current?.focus()}

  return (
    <div className={
      'textfield-container' +
      (hasFocus ? ' focused' : '') +
      (disabled ? ' textfield-disabled' : '')
    }>
      {
        label &&
        <span
          id='label'
          onClick={disabled ? null : handleFocus}
        >
          {label}
        </span>
      }
      <input
        disabled={disabled}
        className='input'
        ref={fieldRef}
        value={value}
        onChange={(e) => setter(e?.target?.value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        type={isSecure ? 'password' : 'text'}
      />
    </div>
  )
}

export default TextField