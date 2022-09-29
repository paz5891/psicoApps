import React from 'react'
import { NavLink } from "react-router-dom"

const PublicMenu = () => {
  return (
    <ul>
      <li><NavLink exact to="/login">Login</NavLink></li>
    </ul>
  )
}

export default PublicMenu
