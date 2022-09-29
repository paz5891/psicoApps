import React, { useState, useEffect, createRef } from 'react'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { URL } from '../../config/option'
import UploadFile from '../helpers/UploadFile'
import Files from '../helpers/File';
import localService from '../../config/Local'
const modal = createRef()
const verModal = () => modal.current.classList.toggle('verModal')

const ListaDiagnosticos = ({ idCaso }) => {


  const [diagnostic, setDiagnosticos] = useState([])

  const [select, setSelect] = useState('0')
  const [getDSM, setDSM] = useState([])
  const [comment, setComment] = useState('')
  const [file, setFile] = useState('')
  const [uuidCaseDiagnosticStage, setUuidCaseDiagnosticStage] = useState('')
  const [isOperation, setIsOperation] = useState(true)
  const [changefile, setChangefile] = useState('')


  // const history = useHistory()
  const listDiagnosticos = async () => {
    try {
      const url = `${URL}diagnostic/${idCaso}`
      const diagnosticos = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
      })
      const diafJson = await diagnosticos.json()
      const { data } = diafJson
      if (data) {
        setDiagnosticos(data)
      } else {
        setDiagnosticos([])
      }
    } catch (error) {
      console.log(error)
      alert('Servicios desconectado')
    }
  }

  useEffect(() => {
    async function tot() {
      await listDiagnosticos()
    }
    tot()
  }, [])



  useEffect(() => {
    fetch(`${URL}diagnostic/disorders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(res => res.json())
      .then(data => setDSM(data.data))
  }, [])

  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const update = async (uuid) => {
    try {
      const diag = await fetch(`${URL}diagnostic/single/${uuid}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
      })
      const diafJson = await diag.json()

      const {ok, data} = diafJson


      const decode = decodeHTML(data[0].descriptionOfProblem)

      if(ok) {
        setSelect(data[0].uuidDSM5)
        setComment(decode)
        setFile(data[0].descriptionOfProblemFile)
        setUuidCaseDiagnosticStage(uuid)
        setChangefile(data[0].descriptionOfProblemFile)
        setIsOperation(false)
        verModal()
      }else {
        alert('Servicios desconectados')
      }

    } catch (error) {
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('uuidDSM5', select)
    formData.append('descriptionOfProblem', comment)
    formData.append('descriptionOfProblemFile', file)
    formData.append('uuidDiagnosedProblems', uuidCaseDiagnosticStage)
    formData.append('changefile', changefile)
    const urlCreate = `${URL}diagnostic/${idCaso}`
    const urlUpdate = `${URL}diagnostic/${idCaso}`



    fetch(isOperation ? urlCreate : urlUpdate, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: isOperation? 'POST': 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(async data => {
        if (data.ok) {
          verModal()
          await listDiagnosticos()
        }else {
          alert("Debe de rellenar todos los campos requeridos")
        }
      })
      .catch(err => console.log(err))
  }

  const abrirModal = ()=> {
    setSelect('0')
    setComment('')
    setFile('')
    setIsOperation(true)
    
    verModal()
  }
  return (
    <>
      <section className="ed-container margin-top">
        <div className="ed-item ed-container">
          <div className="ed-item">
            <h1 className="pantient-title">Diagnósticos</h1>
          </div>
          <div className="ed-item s-60 m-70 l-80">
            {/* <Search /> */}
          </div>
          <div className="ed-item s-40 m-30 l-20">
            {
             
              <button 
                onClick={abrirModal} 
                disabled={ localService.getJsonValue('rol') === 'admin'? true : false } 
                className="button full">Crear</button>
            }
          </div>
        </div>
      </section>
      <div className="ed-container">
        <div className="ed-item">
          <form className="form-modal " ref={modal} onSubmit={handleSubmit}>
            <div className="ed-item ">
              <p className="button dark-color" onClick={verModal}>X</p>
            </div>
            <div className="l-block"></div>
            <div className="ed-item ">
              <h2 className="s-center">Diagnóstico</h2>
            </div>
            <div className="ed-item form__item">
              <label>Diagnósticos <span className="require">(Requerido)</span></label>
              <select 
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option value="0">Seleccione diagnóstico</option>
                {
                  getDSM.map(({ uuid, name }) => (
                    <option key={uuid} value={uuid}>{name}</option>
                  ))
                }
              </select>
            </div>
            <div className="ed-item form__item">
              <label htmlFor="uuidReligion"  >Descripción del problema <span className="require">(Requerido)</span> </label> 
              <CKEditor
                editor={ClassicEditor}
                data={comment}
                onInit={editor => {
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setComment(data)
                }}
              />
            </div>
            <div className="ed-item">
              <Files
                file={file}
                label="Adjuntar archivo"
                name="file"
                handleChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="ed-item">
              <button className="button full mt-1">Guardar Diagnóstico</button>
            </div>
          </form>
        </div>
      </div>

      <main className="ed-container l-block">
        {
          diagnostic.length
            ?
            diagnostic.map(({ uuid, name,r_description, descriptionOfProblemFile }) => (
              <div key={uuid} className="ed-item s-100 m-50 l-1-3">
                <article className="s-shadow-bottom">
                  <div className="ed-container pd">
                    <div className="ed-item">
                      <h2 className="s-center">{name}</h2>
                    </div>
                    <div className="ed-item">
                      <p>{r_description}</p>
                    </div>
                    {
                      descriptionOfProblemFile 
                      ? 
                      <UploadFile 
                        istitle={`Archivo.${descriptionOfProblemFile.slice((descriptionOfProblemFile.lastIndexOf(".") - 1 >>> 0) + 2)}`} 
                        URL={`${URL}attachment/${descriptionOfProblemFile}`} 
                      />
                      : null
                    }
                  </div>
                  <footer className="s-bg-grey s-cross-center s-pxy-2 s-radius-br s-radius-bl">
                    <button 
                      onClick={()=>update(uuid)} 
                      className="button ghost accent-color s-to-right"
                      disabled={ localService.getJsonValue('rol') === 'admin'? true : false } 
                    >Editar</button>
                  </footer>
                </article>
              </div>
            ))
            : <p className="ed-item alert ">No hay diagnósticos creados!</p>
        }
      </main>
    </>
  )
}

export default ListaDiagnosticos
