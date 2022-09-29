import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import localService from '../config/Local'

const Protected = ({ component: Component, rolUser, isRol, ...rest }) => {

  const userLogged = localService.getJsonValue('token')
  const rolUserLogged = localService.getJsonValue('rol')



  if ( !userLogged ) {
    return <Redirect to="/login" />
  }

  if (rolUserLogged === rolUser ) {
    return <Route {...rest} component={Component} />
  }
  
   
  if (isRol) {
    return <Route {...rest} component={Component} />  
  }
    
  return <Redirect to="/segurity" />
  
}

export default Protected
