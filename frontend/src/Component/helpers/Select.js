import React from 'react'
import Select from 'react-select'

const CustomSelect = ({options,placeholder,handleSelect}) => {
  return (
    <Select 
      placeholder={placeholder}
      onChange={handleSelect} 
      options={options} 
    />
  )
}

export default CustomSelect
