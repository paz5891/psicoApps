import React from 'react'
import { Link, NavLink } from "react-router-dom"

import localService from '../../config/Local'

const removeToken = () => {
  localService.removeJsonValue('token')
  localService.removeJsonValue('rol')
  localService.removeJsonValue('user')
  window.location = '/login'
}

const rol = localService.getJsonValue('rol')

const PrivateMenu = () => {
  const nuevaVentana = () => {
    window.open('https://psicoapp.online:3000/d/hEHeWahGk/psicoapp?orgId=1', '_blank');
  }
  return (
    <ul>
      {
        rol === 'admin'
        ?<li><NavLink exact to="/users">Control de usuarios</NavLink></li>
        : null
      }
      {
        rol === 'admin'
        ?<li><Link to=""  onClick={()=>nuevaVentana()}>Gráficas</Link></li>
        : null
      }
      <li><NavLink exact to="/gridcasos">Casos</NavLink></li>
      <li><NavLink to="/pantient">Pacientes</NavLink></li>
      <li>
        <Link to="" onClick={removeToken}>Cerrar Sesión</Link>
      </li>
    </ul>
  )
}

export default PrivateMenu
