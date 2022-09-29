import React from 'react'
import ListaIntermedia from './ListaIntermedia'

const EtapaIntermedial = ({
  currentStep
}) => {
  if(currentStep !==2 ){
    return null
  }
  return (
    <ListaIntermedia />
  )
}

export default EtapaIntermedial
