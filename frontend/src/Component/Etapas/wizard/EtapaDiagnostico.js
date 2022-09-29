import React from 'react'
import ListaDiagnosticos from '../../Pages/ListaDiagnosticos';

const EtapaDiagnostico = ({
  currentStep,
  idCase
}) => {
  if (currentStep !== 3) {
    return null
  }


  return (
    <ListaDiagnosticos idCaso={idCase} />
  )
}

export default EtapaDiagnostico