import React, { useRef, useState, useEffect } from 'react'
import { parseISO, format, isDate } from 'date-fns'
import { useField } from '@rocketseat/unform'

export default function DatePicker({ name, defaultValue, ...rest }) {
  const { registerField, fieldName } = useField(name)
  const [selected, setSelected] = useState(
    format(parseISO(defaultValue), "yyyy-MM-dd'T'HH:mm:ssxxx")
  )

  const ref = useRef()
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'selected'
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  function handleChange(e) {
    if (e.target.value && isDate(parseISO(e.target.value))) {
      setSelected(format(parseISO(e.target.value), "yyyy-MM-dd'T'HH:mm:ssxxx"))
    }
  }

  return (
    <input
      type="date"
      name={fieldName}
      defaultValue={defaultValue}
      selected={selected}
      onChange={handleChange}
      ref={ref}
      {...rest}
    />
  )
}
