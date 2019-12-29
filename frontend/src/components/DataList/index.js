import React, { useRef, useEffect, useState } from 'react'
import { useField } from '@rocketseat/unform'

export default function DataList({
  name,
  options,
  label,
  placeholder,
  id,
  ...rest
}) {
  const { registerField, fieldName } = useField(name)
  const ref = useRef()
  const [itemId, setItemId] = useState()
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'dataset.item_id'
    })
  }, [fieldName, ref.current]) // eslint-disable-line

  function handleChange(e) {
    const selectedItem = e.target.value
    const item = options.find(o => o.title === selectedItem)
    setItemId(item && item.id)
  }

  return (
    <label htmlFor={id}>
      {label}
      <input
        type="text"
        ref={ref}
        name={fieldName}
        id={id}
        list={`${fieldName}_list`}
        placeholder={placeholder}
        data-item_id={itemId}
        onChange={handleChange}
        {...rest}
      />
      <datalist id={`${fieldName}_list`}>
        {options.map(o => (
          <option key={o.id} value={o.title} data-value={o.id} />
        ))}
      </datalist>
    </label>
  )
}
