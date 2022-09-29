import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import localService from '../config/Local'

const Public = ({ component: Component, ...rest }) => {

  const userLogged = localService.getJsonValue('token')

  if ( userLogged ) {
    return <Redirect to="/" />
  }
  return <Route {...rest} component={Component} />
  
}

export default Public
