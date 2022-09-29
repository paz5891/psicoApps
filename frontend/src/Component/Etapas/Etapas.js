import React, { Component, createRef } from 'react'
import EtapaDiagnostico from './wizard/EtapaDiagnostico'
import EtapaInicial from './wizard/EtapaInicial'
import EtapaIntermedia from './wizard/EtapaIntermedia'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Files from '../helpers/File'
import { URL } from '../../config/option'
import './Etapas.scss'
import General from './wizard/General'
import ModalPruebas from '../Pages/Modal.pruebas';
import EtapaCierre from './wizard/EtapaCierre';
import localService from '../../config/Local'
const modal = createRef()
const verModal = () => modal.current.classList.toggle('verModal2')

const modalPruebas = createRef()
const verModalPruebas = () => modalPruebas.current.classList.toggle('verModalPruebas')

class Etapas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idCase: props.match.params.idCasos,
      currentStep: 1,
      premorbidPersonality: '',
      premorbidPersonalityFile: '',
      currentProblem: '',
      currentProblemFile: '',
      healthHistory: '',
      healthHistoryFile: '',
      sexualHistory: '',
      sexualHistoryFile: '',
      growthHistory: '',
      growthHistoryFile: '',
      perinatalHistory: '',
      perinatalHistoryFile: '',
      familyHistory: '',
      familyHistoryFile: '',
      genogramFile: '',
      schoolHistory: '',
      schoolHistoryFile: '',
      workHistory: '',
      workHistoryFile: '',
      mentalEvaluationTest: '',
      mentalEvaluationTestFile: '',
      clinicalInterpretation: '',
      clinicalInterpretationFile: '',
      interpreationOfEvidence: '',
      interpreationOfEvidenceFile: '',
      therapeuticContract: '',
      therapeuticContractFile: '',
      uuidTestingApplication: '',
      uuidTestType: '',
      testingApplication: '',
      testingApplicationFile: '',
      uuidDSM5Array: [],
      uuidDSM5: '',
      descriptionOfProblem: '',
      descriptionOfProblemFile: '',
      rolAdmin: localService.getJsonValue('rol') === 'admin' ? true : false,
      attachment: '',
      comment: '',
      Estado: 0
    }
  }

  componentDidMount() {
    const url = `${URL}cases/initial/${this.state.idCase}`
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        this.setState({
          premorbidPersonality: data.data[0].premorbidPersonality || '',
          premorbidPersonalityFile: data.data[0].premorbidPersonalityFile || '',
          currentProblem: data.data[0].currentProblem || '',
          currentProblemFile: data.data[0].currentProblemFile || '',
          healthHistory: data.data[0].healthHistory || '',
          healthHistoryFile: data.data[0].healthHistoryFile || '',
          sexualHistory: data.data[0].sexualHistory || '',
          sexualHistoryFile: data.data[0].sexualHistoryFile || '',
          growthHistory: data.data[0].growthHistory || '',
          growthHistoryFile: data.data[0].growthHistoryFile || '',
          perinatalHistory: data.data[0].perinatalHistory || '',
          perinatalHistoryFile: data.data[0].perinatalHistoryFile || '',
          familyHistory: data.data[0].familyHistory || '',
          familyHistoryFile: data.data[0].familyHistoryFile || '',
          genogramFile: data.data[0].genogramFile || '',
          schoolHistory: data.data[0].schoolHistory || '',
          schoolHistoryFile: data.data[0].schoolHistoryFile || '',
          workHistory: data.data[0].workHistory || '',
          workHistoryFile: data.data[0].workHistoryFile || '',
          mentalEvaluationTest: data.data[0].mentalEvaluationTest || '',
          mentalEvaluationTestFile: data.data[0].mentalEvaluationTestFile || '',
          clinicalInterpretation: data.data[0].clinicalInterpretation || '',
          clinicalInterpretationFile: data.data[0].clinicalInterpretationFile || '',
          interpreationOfEvidence: data.data[0].interpreationOfEvidence || '',
          interpreationOfEvidenceFile: data.data[0].interpreationOfEvidenceFile || '',
          therapeuticContract: data.data[0].therapeuticContract || '',
          therapeuticContractFile: data.data[0].therapeuticContractFile || '',
          testingApplication: data.data[0].testingApplication || '',
          testingApplicationFile: data.data[0].testingApplicationFile || ''
        })
      })
      .catch(err => console.log(err))

    fetch(`${URL}diagnostic/disorders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(res => res.json())
      .then(data => this.setState({ uuidDSM5Array: data.data }))
      .catch(err => console.log(err))
  }

  handleChange = event => {
    const url = `${URL}cases/initial/${this.state.idCase}`
    if (event.is) {
      const { name, value } = event
      if (value) {
        this.setState({
          [name]: value
        })

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
    } else {
      const { name } = event.target
      const file = event.target.files[0]

      const formData = new FormData()

      formData.append([name], file)

      this.setState({
        [name]: file
      })

      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            this.setState({
              [name]: data.data
            })
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

  }

  handleChangediag = event => {
    if (event.is) {
      const { name, value } = event
      if (value) {
        this.setState({
          [name]: value
        })
      }
    } else {
      const { name, value } = event.target

      if (name === 'descriptionOfProblemFile') {
        const file = event.target.files[0]
        this.setState({
          [name]: file
        })

      } else {
        this.setState({
          [name]: value
        })
      }

    }

  }

  _next = () => {
    if (this.state.rolAdmin) {
      this.CambioEstado(this.state.currentStep)
    } else {
      if (this.state.currentStep === 1) {
        this.CambioEstado(this.state.currentStep)
      }
      if (this.state.currentStep === 2) {
        fetch(`${URL}cases/verifyinitialstage/${this.state.idCase}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localService.getJsonValue('token')}`
          },
          method: 'POST'
        })
          .then(res => res.json())
          .then(data => {
            if (data.ok) {
              if (data.phase === 1) {
                alert('Por favor de completar todos campos requeridos (*)')
              } else if (data.phase === 2) {
                verModal()
                this.setState({ Estado: data.phase })
              }
            }
          })
          .catch(err => console.error(err))
      }

      if (this.state.currentStep === 3){ 
        fetch(`${URL}cases/verifydiagnostic/${this.state.idCase}`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localService.getJsonValue('token')}`
          },
          method: 'POST'
        })
        .then(resp => resp.json())
        .then(resusts => {
          if (resusts.phase === 2) {
            alert('Por favor agregar un diagnóstico para poder continuar a etapa intermedia')
          } else if (resusts.phase === 3) {
            this.CambioEstado(resusts.phase)
            
          }
        })
        .catch(err => console.log(err))
        
      }
      
      if (this.state.currentStep === 4) {
        fetch(`${URL}cases/verifyintermediate/${this.state.idCase}`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localService.getJsonValue('token')}`
          },
          method: 'POST'
        })
        .then(resp => resp.json())
        .then(resusts => {
          if (resusts.phase === 3) {
            alert('Por favor agregar un plan terpeutico y una actividad para poder continuar a etapa cierre')
          } else if (resusts.phase === 4) {
            this.CambioEstado(resusts.phase)
            
          }
        })
        .catch(err => console.log(err))
      }

      if(this.state.currentStep >= 5) {
        this.CambioEstado(this.state.currentStep)
      }
    }
  }

  CambioEstado = (currentStep) => {
    currentStep = currentStep >= 5 ? 6 : currentStep + 1
    this.setState({
      currentStep: currentStep
    })

  }


  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="button light-color margin-left mt-1"
          disabled={!this.state.rolAdmin}
          type="button" onClick={this._prev}>
          Regresar
        </button>
      )
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <button
          className="button margin-left mt-1"
          type="button" onClick={this._next}>
          Siguiente
        </button>
      )
    }
    return null;
  }



  render() {
    const handlerCambio = () => {

      const formData = new FormData

      formData.append('attachment', this.state.attachment)
      formData.append('comment', this.state.comment)
      fetch(`${URL}cases/stagehistory/${this.state.idCase}`, {
        headers: {
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
        method: 'POST',
        body: formData
      })
        .then(rest => rest.json())
        .then(data => {
          if (data.ok) {
            verModal()
            this.CambioEstado(this.state.Estado)
          } else {
            alert('No se ha aguardado correctamente')
          }
        })
        .catch(err => console.log(err))
    }

    const desistirCaso = () => {
      fetch(`${URL}/cases/desistment/${this.state.idCase}`,{
        headers: {
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
        method: 'PUT'
      })
      .then(resp => resp.json())
      .then(result => {
        if(result.ok) {
          alert('Se ha desistido correctamente')
        }else {
          alert(result.message)
        }
      })
      .catch(err => console.log(err))

    }


    const navegacion = (id) => {
      if (id === 1) this.setState({ currentStep: 1 })
      if (id === 2) this.setState({ currentStep: 2 })
      if (id === 3) this.setState({ currentStep: 3 })
      if (id === 4) this.setState({ currentStep: 4 })
      if (id === 5) this.setState({ currentStep: 5 })
      if (id === 6) this.setState({ currentStep: 6 })
    }
    return (
      <>
        <div className="ed-container mt-5">
          <div className="ed-item">
            <h2 >Desistir el caso </h2>
            <button className="button mt" disabled={this.state.rolAdmin} onClick={desistirCaso}> Desistir</button>
          </div>
          <div className="ed-item ed-container mt">
            <div className="ed-item flex">
              <button
                className={this.state.currentStep === 1 ? 'menu-wizard2 paso2' : 'menu-wizard2'}
                disabled={!this.state.rolAdmin}
                onClick={() => navegacion(1)} >
                General
              </button>
              <button
                className={this.state.currentStep === 2 ? 'menu-wizard2 paso2' : 'menu-wizard2'}
                disabled={!this.state.rolAdmin}
                onClick={() => navegacion(2)} >
                Etapa Inicial
                </button>
              <button
                className={this.state.currentStep === 3 ? 'menu-wizard2 paso2' : 'menu-wizard2'}
                disabled={!this.state.rolAdmin}
                onClick={() => navegacion(3)} >
                Etapa de Diagnóstico
              </button>
              <button
                className={this.state.currentStep === 4 ? 'menu-wizard2 paso2' : 'menu-wizard2'}
                disabled={!this.state.rolAdmin}
                onClick={() => navegacion(4)} >
                Etapa intermedia
              </button>
              <button
                className={this.state.currentStep === 5 ? 'menu-wizard2 paso2' : 'menu-wizard2'}
                disabled={!this.state.rolAdmin}
                onClick={() => navegacion(5)} >
                Etapa de Cierre
              </button>
              <button
                className={this.state.currentStep === 6 ? 'menu-wizard2 paso2' : 'menu-wizard2'}
                disabled={!this.state.rolAdmin}
                onClick={() => navegacion(6)} >
                Etapa de seguimiento
              </button>
            </div>
          </div>
          <div className="ed-item ed-container mb-6 mt1">
            <General
              currentStep={this.state.currentStep}
              idCase={this.state.idCase}
            />
            <EtapaInicial
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              premorbidPersonality={this.state.premorbidPersonality}
              premorbidPersonalityFile={this.state.premorbidPersonalityFile}
              currentProblem={this.state.currentProblem}
              currentProblemFile={this.state.currentProblemFile}
              healthHistory={this.state.healthHistory}
              healthHistoryFile={this.state.healthHistoryFile}
              sexualHistory={this.state.sexualHistory}
              sexualHistoryFile={this.state.sexualHistoryFile}
              growthHistory={this.state.growthHistory}
              growthHistoryFile={this.state.growthHistoryFile}
              perinatalHistory={this.state.perinatalHistory}
              perinatalHistoryFile={this.state.perinatalHistoryFile}
              familyHistory={this.state.familyHistory}
              familyHistoryFile={this.state.familyHistoryFile}
              genogramFile={this.state.genogramFile}
              schoolHistory={this.state.schoolHistory}
              schoolHistoryFile={this.state.schoolHistoryFile}
              workHistory={this.state.workHistory}
              workHistoryFile={this.state.workHistoryFile}
              mentalEvaluationTest={this.state.mentalEvaluationTest}
              mentalEvaluationTestFile={this.state.mentalEvaluationTestFile}
              clinicalInterpretation={this.state.clinicalInterpretation}
              clinicalInterpretationFile={this.state.clinicalInterpretationFile}
              interpreationOfEvidence={this.state.interpreationOfEvidence}
              interpreationOfEvidenceFile={this.state.interpreationOfEvidenceFile}
              therapeuticContract={this.state.therapeuticContract}
              therapeuticContractFile={this.state.therapeuticContractFile}
              uuidTestingApplication={this.state.uuidTestingApplication}
              uuidTestType={this.state.uuidTestType}
              testingApplication={this.state.testingApplication}
              testingApplicationFile={this.state.testingApplicationFile}
            />
            <EtapaDiagnostico
              idCase={this.state.idCase}
              currentStep={this.state.currentStep}
              handleChangediag={this.handleChangediag}
              uuidDSM5Array={this.state.uuidDSM5Array}
              uuidDSM5={this.state.uuidDSM5}
              descriptionOfProblem={this.state.descriptionOfProblem}
              descriptionOfProblemFile={this.state.descriptionOfProblemFile}
            />
            <EtapaIntermedia
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
            />
            <EtapaCierre
              currentStep={this.state.currentStep}
            />
            <div className="ed-item">
              {this.previousButton()}
              {this.nextButton()}
              {
                this.state.currentStep === 2 &&
                <button className="button accent-color mt-1" type="button" onClick={verModalPruebas}>
                  Ver pruebas
                </button>
              }
            </div>
          </div>
        </div>
        <div className="contenedor-modar2" ref={modal}>
          <div className="form-modal22">
            <p className="button dark-color btn-cerrar" onClick={verModal}>X</p>
            <h2 className="title-modal">Escriba su comentario. Tenga en cuenta que esta dando por concluida la etapa inicial</h2>
            <div className="form_modal">
              <label htmlFor="">Comentario</label>
              <CKEditor
                editor={ClassicEditor}
                data={this.state.comment}
                data=""
                onInit={editor => {
                }}
                onBlur={(event, editor) => {
                  const data = editor.getData()
                  this.setState({ comment: data })
                }}
              />
              <Files
                file={this.state.attachment}
                label="Comentario (Adjunto)"
                name="currentProblemFile"
                handleChange={(e) => this.setState({ attachment: e.target.files[0] })}
              />
              <button className="button full mt" onClick={handlerCambio}>Continuar a la estapa de diagnóstico</button>
            </div>
          </div>
        </div>
        <div className="modalPruebas" ref={modalPruebas}>
          <ModalPruebas verModalPruebas={verModalPruebas} />
        </div>
       
      </>
    );
  }
}

export default Etapas