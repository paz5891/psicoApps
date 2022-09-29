import React from 'react'
import { Link } from 'react-router-dom'

import localService from '../../config/Local'
const PagesRol = () => {
  
  const rolUser = localService.getJsonValue('rol')

  const removeToken = () => {
    localService.removeJsonValue('token')
    localService.removeJsonValue('rol')
    window.location = "/login"
  }

  return (
    <div className="ed-grid mt-8">
      {
        rolUser
        ? 
        <div className="ed-grid">
          <h2 className='s-center'>Ups! Solo el admin puede ejecutar esta operación</h2>
          <div className="l-block"></div>
          <Link className="button" to="/gridcasos" >Regresar al inicio</Link>
        </div>
        :
        <p>Contactate con los administradores no tienes permisos
          <span onClick={() => removeToken()}>Regresar</span>
        </p>
      }
    </div>
  )
}

export default PagesRol
