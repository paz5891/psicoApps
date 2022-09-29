import React from 'react'
import { Link } from 'react-router-dom';
import localService from '../../config/Local'
const FileUpload = ({
  URL
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

  return (
    
    <Link to='#' className="button11 btn-link btnFile icon-download" onClick={() => handleArchivo()}></Link>
    
  )
}

export default FileUpload