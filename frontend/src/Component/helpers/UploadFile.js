import React from 'react'
import { Link } from 'react-router-dom';
import './UploadFile.scss'
import localService from '../../config/Local'
const UploadFile = ({
  URL,
  valor=true
}) => {

  const handleArchivo = ()=> {
    fetch(URL, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
    .then(rest => rest.json())
    .then(data => {
      if(data.ok) {
        window.open(data.url, '_blank');
      }
    })
    .catch(err => console.log(err))
  }
  if(valor) {
    return (
      <div className="ed-item s-20 m-20">
        <Link to='#' className="button11 btn-link btnFile icon-download" onClick={() => handleArchivo()}>Descargar archivo</Link>
      </div>
    )
  }else {
    return (
      <Link to='#' className="button11 btn-link btnFile icon-download" onClick={() => handleArchivo()}>Descargar archivo</Link>
    )
  }
}

export default UploadFile