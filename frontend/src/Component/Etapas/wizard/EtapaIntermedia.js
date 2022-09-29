import React from 'react'
import ListaIntermedia from '../../Pages/ListaIntermedia'

const EtapaIntermedia = ({
  currentStep,
  handleChange
}) => {
  if (currentStep !== 4) {
    return null
  }
  return (
    <ListaIntermedia />
  )
}

export default EtapaIntermedia