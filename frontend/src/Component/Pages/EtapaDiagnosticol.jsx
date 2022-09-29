import React from 'react'
import { useParams } from 'react-router-dom'
import ListaDiagnosticos from './ListaDiagnosticos'

const EtapaDiagnosticol = ({currentStep}) => {  
  const {idCasos} = useParams()

  if(currentStep !== 1){
    return null
  }
  return (
  <ListaDiagnosticos idCaso={idCasos} />
  )
}

export default EtapaDiagnosticol
