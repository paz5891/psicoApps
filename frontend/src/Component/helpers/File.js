import React from 'react'
import './File.scss'

const Files = ({file, label, handleChange,name, negrita = false}) => {
  return (
    <>
    <label className={negrita ? 'negrita' : null}>{label}</label>
      <div className="forms">
        <div className="file-upload-wrapper" data-text={
          file
            ? file.name || `${label}.${file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2)}`
            : 'Seleccionar archivo'
        }>
          <input name={name} onChange={handleChange} type="file" className="file-upload-field" />
        </div>
      </div>
    </>
  )
}

export default Files