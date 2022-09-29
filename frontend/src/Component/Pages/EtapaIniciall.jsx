import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {URL} from '../../config/option'
import ComboInput from '../Organisms/ComboInput'
import localService from '../../config/Local'
const EtapaIniciall = ({
  currentStep
}) => {

  const {idCasos} = useParams()

  const [premorbidPersonality,setRemorbidPersonality] = useState('')
	const [premorbidPersonalityFile,setPremorbidPersonalityFile] = useState('')
	const [currentProblem,setCurrentProblem] = useState('')
	const [currentProblemFile,setCurrentProblemFile] = useState('')
	const [healthHistory,setHealthHistory] = useState('')
	const [healthHistoryFile,setHealthHistoryFile] = useState('')
	const [sexualHistory,setSexualHistory] = useState('')
	const [sexualHistoryFile,setSexualHistoryFile] = useState('')
	const [growthHistory,setGrowthHistory] = useState('')
	const [growthHistoryFile,setGrowthHistoryFile] = useState('')
	const [perinatalHistory,setPerinatalHistory] = useState('')
	const [perinatalHistoryFile,setPerinatalHistoryFile] = useState('')
	const [familyHistory,setFamilyHistory] = useState('')
	const [familyHistoryFile,setFamilyHistoryFile] = useState('')
	const [genogramFile,setGenogramFile] = useState('')
	const [schoolHistory,setSchoolHistory] = useState('')
	const [schoolHistoryFile,setSchoolHistoryFile] = useState('')
	const [workHistory,setWorkHistory] = useState('')
	const [workHistoryFile,setWorkHistoryFile] = useState('')
	const [mentalEvaluationTest,setMentalEvaluationTest] = useState('')
	const [mentalEvaluationTestFile,setMentalEvaluationTestFile] = useState('')
	const [clinicalInterpretation,setClinicalInterpretation] = useState('')
	const [clinicalInterpretationFile,setClinicalInterpretationFile] = useState('')
	const [interpreationOfEvidence,setInterpreationOfEvidence] = useState('')
	const [interpreationOfEvidenceFile,setInterpreationOfEvidenceFile] = useState('')
	const [therapeuticContract,setTherapeuticContract] = useState('')
	const [therapeuticContractFile,setTherapeuticContractFile] = useState('')
  const url = `${URL}cases/initial/${idCasos}`

  useEffect(() => {
    async function casos() {
      await casosInitial()
    }
    casos()
  }, [])

  const casosInitial = async () => {
    const url = `${URL}cases/initial/${idCasos}`
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localService.getJsonValue('token')}`
    },
  })
    .then(rest => rest.json())
    .then(data => {
      setRemorbidPersonality(data.data[0].premorbidPersonality || '')
      setPremorbidPersonalityFile(data.data[0].premorbidPersonalityFile || '')
      setCurrentProblem(data.data[0].currentProblem || '')
      setCurrentProblemFile(data.data[0].currentProblemFile || '')
      setHealthHistory(data.data[0].healthHistory || '')
      setHealthHistoryFile(data.data[0].healthHistoryFile || '')
      setSexualHistory(data.data[0].sexualHistory || '')
      setSexualHistoryFile(data.data[0].sexualHistoryFile || '')
      setGrowthHistory(data.data[0].growthHistory || '')
      setGrowthHistoryFile(data.data[0].growthHistoryFile || '')
      setPerinatalHistory(data.data[0].perinatalHistory || '')
      setPerinatalHistoryFile(data.data[0].perinatalHistoryFile || '')
      setFamilyHistory(data.data[0].familyHistory || '')
      setFamilyHistoryFile(data.data[0].familyHistoryFile || '')
      setGenogramFile(data.data[0].genogramFile || '')
      setSchoolHistory(data.data[0].schoolHistory || '')
      setSchoolHistoryFile(data.data[0].schoolHistoryFile || '')
      setWorkHistory(data.data[0].workHistory || '')
      setWorkHistoryFile(data.data[0].workHistoryFile || '')
      setMentalEvaluationTest(data.data[0].mentalEvaluationTest || '')
      setMentalEvaluationTestFile(data.data[0].mentalEvaluationTestFile || '')
      setClinicalInterpretation(data.data[0].clinicalInterpretation || '')
      setClinicalInterpretationFile(data.data[0].clinicalInterpretationFile || '')
      setInterpreationOfEvidence(data.data[0].interpreationOfEvidence || '')
      setInterpreationOfEvidenceFile(data.data[0].interpreationOfEvidenceFile || '')
      setTherapeuticContract(data.data[0].therapeuticContract || '')
      setTherapeuticContractFile(data.data[0].therapeuticContractFile || '')
      
    })
    .catch(err => console.log(err))
  }


  const handleBlurCK = (event) => {
    const { name, value } = event

    const data = {
      [name]: value
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
        } else {
          if(localService.getJsonValue('rol')=== "admin"){
            alert('Solo el psicólogo asignado al caso puede realizar cambios')
          }else{
            alert('Sus cambios realizados no se guardaran')
          }
        }
      })
      .catch(err => console.log(err))
  }

  const handleChangeFile = (event) => {
    const { name } = event.target
      const file = event.target.files[0]
      const formData = new FormData()

      formData.append([name], file)

      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
      })
        .then(res => res.json())
        .then(async data => {
          if (data.ok) {
            await casosInitial()
          } else {
            if(localService.getJsonValue('rol')=== "admin"){
              alert('Solo el psicólogo asignado al caso puede realizar cambios')
            }else{
              alert('Sus cambios realizados no se guardaran')
            }
          }
        })
        .catch(err => console.log(err))
  }
  
  if(currentStep !== 0){
    return null
  }
  return (
    <div className="ed-grid mt mb">
      <h2 className="Title20 margin-button">Etapa Inicial</h2>
      <ComboInput 
        labelCKeditor="Personalidad premórbida" 
        getCkeditor={premorbidPersonality} 
        nameCK='premorbidPersonality'
        handleBlurCK={handleBlurCK}
        colorCombo={true}
        requiredCkeditor={false}
        getfile={premorbidPersonalityFile}
        nameFile='premorbidPersonalityFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Problema actual" 
        getCkeditor={currentProblem} 
        nameCK='currentProblem'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={true}
        getfile={currentProblemFile}
        nameFile='currentProblemFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Historial de salud" 
        getCkeditor={healthHistory} 
        nameCK='healthHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={true}
        requiredCkeditor={false}
        getfile={healthHistoryFile}
        nameFile='healthHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Historial sexual" 
        getCkeditor={sexualHistory} 
        nameCK='sexualHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={false}
        getfile={sexualHistoryFile}
        nameFile='sexualHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Historia de desarrollo" 
        getCkeditor={growthHistory} 
        nameCK='growthHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={false}
        getfile={growthHistoryFile}
        nameFile='growthHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Historia perinatal" 
        getCkeditor={perinatalHistory} 
        nameCK='perinatalHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={true}
        requiredCkeditor={false}
        getfile={perinatalHistoryFile}
        nameFile='perinatalHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Historia familiar" 
        getCkeditor={familyHistory} 
        nameCK='familyHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={false}
        getfile={familyHistoryFile}
        nameFile='familyHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Genograma" 
        colorCombo={true}
        getfile={genogramFile}
        nameFile='genogramFile'
        requiredFile={true}
        handleChangeFile={handleChangeFile}
        isFile={false}
      />
      <ComboInput 
        labelCKeditor="Historia escolar" 
        getCkeditor={schoolHistory} 
        nameCK='schoolHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={false}
        getfile={schoolHistoryFile}
        nameFile='schoolHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Historial de trabajo" 
        getCkeditor={workHistory} 
        nameCK='workHistory'
        handleBlurCK={handleBlurCK}
        colorCombo={true}
        requiredCkeditor={false}
        getfile={workHistoryFile}
        nameFile='workHistoryFile'
        requiredFile={false}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Prueba de evaluación mental" 
        getCkeditor={mentalEvaluationTest} 
        nameCK='mentalEvaluationTest'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={true}
        getfile={mentalEvaluationTestFile}
        nameFile='mentalEvaluationTestFile'
        requiredFile={true}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Interpretación clínica" 
        getCkeditor={clinicalInterpretation} 
        nameCK='clinicalInterpretation'
        handleBlurCK={handleBlurCK}
        colorCombo={true}
        requiredCkeditor={true}
        getfile={clinicalInterpretationFile}
        nameFile='clinicalInterpretationFile'
        requiredFile={true}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Interpretación de evidencia" 
        getCkeditor={interpreationOfEvidence} 
        nameCK='interpreationOfEvidence'
        handleBlurCK={handleBlurCK}
        colorCombo={false}
        requiredCkeditor={true}
        getfile={interpreationOfEvidenceFile}
        nameFile='interpreationOfEvidenceFile'
        requiredFile={true}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
      <ComboInput 
        labelCKeditor="Contrato terapéutico" 
        getCkeditor={therapeuticContract} 
        nameCK='therapeuticContract'
        handleBlurCK={handleBlurCK}
        colorCombo={true}
        requiredCkeditor={true}
        getfile={therapeuticContractFile}
        nameFile='therapeuticContractFile'
        requiredFile={true}
        handleChangeFile={handleChangeFile}
        isArchivo={true}
      />
    </div>
  )
}

export default EtapaIniciall
