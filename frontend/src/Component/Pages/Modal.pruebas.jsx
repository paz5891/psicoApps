import React, { useState, useEffect, createRef } from 'react'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Files from '../helpers/File';

import { URL } from '../../config/option'
import { useParams } from 'react-router-dom';
import UploadFile from '../helpers/UploadFile';
import localService from '../../config/Local' 

const modalPruebas_input = createRef()
const verModalPruebas_input = () => modalPruebas_input.current.classList.toggle('verModalPruebas-input')

const ModalPruebas = ({ verModalPruebas }) => {
  const [pruebasCaso, setPruebasCaso] = useState([])
  const [uuidTestTypeList, setUuidTestTypeList] = useState([])

  const [uuidTestingApplication, setUuidTestingApplication] = useState('')
  const [uuidTestType, setUuidTestType] = useState('')
  const [testingApplication, setTestingApplication] = useState('')
  const [testingApplicationFile, setTestingApplicationFile] = useState('')
  const [changefile, setChangefile] = useState('')
  const [createUpdate, setCreateUpdate] = useState(true)

  const { idCasos } = useParams()

  useEffect(() => {
    fetch(`${URL}cases/initial/testingapplication/testtypes`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(res => res.json())
      .then(rest => {
        if (rest.ok) {
          setUuidTestTypeList(rest.data)
        } else {
          alert('Error al traer lista de apliaciciones de pruebas')
        }
      })
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    async function puebas() {
      await listaApliacacionesPruebas()
    }
    puebas()
  }, [])

  const listaApliacacionesPruebas = async () => {
    fetch(`${URL}cases/initial/testingapplication/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(resp => resp.json())
      .then(results => setPruebasCaso(results.data))
      .catch(err => console.log(err))
  }

  const handlerSubmit = () => {
    const formData = new FormData()
    if(uuidTestType == '' || testingApplication == '' || testingApplicationFile == ''){
      alert("Debe de rellenar todos lo campos requeridos");
      return;
    }
    formData.append('uuidTestType', uuidTestType)
    formData.append('testingApplication', testingApplication)
    formData.append('testingApplicationFile', testingApplicationFile)

    fetch(`${URL}cases/initial/testingapplication/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PoST',
      body: formData
    })
      .then(resp => resp.json())
      .then(async resuls => {
        if (resuls.ok) {
          setUuidTestType('')
          setTestingApplication('')
          setTestingApplicationFile('')
          await listaApliacacionesPruebas()
          verModalPruebas_input()
        }
      })
      .catch(err => console.log(err))

  }
  const handlerSubmitAc_modal = (uuidTestingApplication) => {

    fetch(`${URL}cases/initial/testingapplication/${idCasos}/${uuidTestingApplication}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(resp => resp.json())
      .then(results => {
        if (results.ok) {
          setUuidTestingApplication(results.data[0].uuidTestingApplication)
          setUuidTestType(results.data[0].uuidTestType)
          setTestingApplication(results.data[0].testingApplication)
          setTestingApplicationFile(results.data[0].testingApplicationFile)
          setChangefile(results.data[0].testingApplicationFile)
          setCreateUpdate(false)
          verModalPruebas_input()
        } else {
          alert('La informacion de actulizar no se esta extraendo de la base de datos')
        }
      })
      .catch(err => console.log(err))
  }

  const handlerSubmitAc = () => {
    const formData = new FormData()
    if(uuidTestType == '' || testingApplication == ''){
      alert("Debe de rellenar todos lo campos requeridos");
      return;
    }
    formData.append('uuidTestType', uuidTestType)
    formData.append('uuidTestingApplication', uuidTestingApplication)
    formData.append('testingApplication', testingApplication)
    formData.append('testingApplicationFile', testingApplicationFile)
    formData.append('changefile', changefile)

    fetch(`${URL}cases/initial/testingapplication/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: formData
    })
      .then(resp => resp.json())
      .then(resuls => {
        if (resuls.ok) {
          setUuidTestingApplication('')
          setUuidTestType('')
          setTestingApplication('')
          setTestingApplicationFile('')
          setChangefile('')
          verModalPruebas_input()
        }
      })
      .catch(err => console.log(err))

  }


  const handlerSubmit_CRE = () => {
    setUuidTestingApplication('')
    setUuidTestType('')
    setTestingApplication('')
    setTestingApplicationFile('')
    setChangefile('')
    setCreateUpdate(true)
    verModalPruebas_input()
  }
  return (
    <>
      <div className="ed-grid paddin s-grid-2">
        <div>
          <p
            className="btn-volver"
            onClick={verModalPruebas}>
            Volver a la etapa inicial
          </p>
        </div>
        <div className="btn-container-agregar">
          <button 
            className="button" 
            onClick={handlerSubmit_CRE}
            disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
          >Agregar pruebas</button>
        </div>
      </div>
      <h2 className="s-center">Aplicaciones de Pruebas para el caso</h2> 
      <main className="ed-grid m-grid-3 l-grid-4 mt-1 paddin">
        {
          pruebasCaso.map(({ uuidTestingApplication, nameTestType }) => (
            <article className="card" key={uuidTestingApplication}>
              <div className="card__data s-border s-radius-br s-radius-bl s-pxy-2">
                <div className="ed-grid">
                  <h2 className="t5 s-mb-2 s-center mt-1">{nameTestType}</h2>
                  <div className="ed-grid">

                    <button
                      className="button accent-color"
                      disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                      onClick={() => handlerSubmitAc_modal(uuidTestingApplication)}
                    >
                      Editar
                  </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        }
      </main>
      <div className="modal-input" ref={modalPruebas_input}>
        <p className="btn-cerrar-input" onClick={verModalPruebas_input}>Cerrar</p>
        <h2 className="s-center title-input"> {createUpdate ? 'Crear' : 'Actializar'} prueba del caso</h2>
        <div className="form">
          <div>
            <label htmlFor="">Aplicación de pruebas<span className="require">(Requerido)</span></label>
            <select
              value={uuidTestType}
              onChange={(e) => setUuidTestType(e.target.value)}
            >
              <option value="">Seleccione la apliación de pruebas</option>
              {
                uuidTestTypeList.map(({ uuid, name }) => (
                  <option key={uuid} value={uuid}>{name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="">Descripción<span className="require">(Requerido)</span></label>
            <CKEditor
              editor={ClassicEditor}
              data={testingApplication}
              onInit={editor => {
              }}
              onBlur={(event, editor) => {
                const data = editor.getData()
                setTestingApplication(data)
              }}
            />

          </div>
          {
            createUpdate
              ?
              <div>
                <Files
                  file={testingApplicationFile}
                  label="Archivo Adjunto (Requerido)"
                  name="currentProblemFile"
                  handleChange={(e) => setTestingApplicationFile(e.target.files[0])}
                />
              </div>
              :
              <div className="ed-grid s-grid-3">
                <div className="s-cols-2">
                  <Files
                    file={testingApplicationFile}
                    label="Archivo Adjunto (Requerido)"
                    name="currentProblemFile"
                    handleChange={(e) => setTestingApplicationFile(e.target.files[0])}
                  />
                  
                </div>
                <div>
                  <UploadFile valor={false} URL={`${URL}attachment/${testingApplicationFile}`} />
                </div>
              </div>
          }
          <button className="button full mt-1" onClick={createUpdate ? handlerSubmit : handlerSubmitAc}> {createUpdate ? 'Guardar' : 'Actualizar'} Cambios</button>
        </div>
      </div>
    </>
  )
}

export default ModalPruebas