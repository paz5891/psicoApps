import React, { useState, useEffect, createRef } from 'react'
import { URL } from '../../../config/option'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import localService from '../../../config/Local'
const modal = createRef()
const verModal = () => modal.current.classList.toggle('verModal')

const EtapaCierre = ({ currentStep, }) => {

  const [conclusion, setConclusion] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const [conclusion1, setConclusion2] = useState('')
  const [recommendation1, setRecommendation2] = useState('')
  const { idCasos } = useParams()
  const [isForm, setIsForm] = useState(true)


  useEffect(() => {
    async function cerrar() {
      await getCierre()
    }
    cerrar()
  }, [])

  const getCierre = async () => {
    fetch(`${URL}cases/close/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      }
    })
      .then(resp => resp.json())
      .then(result => {
        if (result.ok) {
          setRecommendation2( decodeHTML(result.data.recommendation))
          setConclusion2( decodeHTML( result.data.conclusion ))
          setIsForm(false)
        }
      })
      .catch(err => console.log(err))
  }

  const handlerSubmit = () => {

    const data = {
      conclusion,
      recommendation
    }

    fetch(`${URL}cases/close/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(async result => {
        if (result.ok) {
          await getCierre()
        }
      })
      .catch(error => console.log(error))
  }

  const handlerSubmitAcualizar = () => {

    const data = {
      conclusion,
      recommendation
    }

    fetch(`${URL}cases/close/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(async result => {
        if (result.ok) {
          await getCierre()
        }
      })
      .catch(error => console.log(error))
  }

  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (currentStep !== 5) {
    return null
  }
  return (
    <>
      <div className={isForm ? 'ed-grid form-cierre margin-top dblock' : 'ed-grid form-cierre margin-top dnone'} >
        <div>
          <h2 className="s-center">Cierre del caso</h2>
        </div>
        <div>
          <label htmlFor="">Conclusión</label>
          <CKEditor
            editor={ClassicEditor}
            data={conclusion}
            data=""
            onInit={editor => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              setConclusion(data)
            }}
          />
        </div>
        <div>
          <label htmlFor="">Recomendación</label>
          <CKEditor
            editor={ClassicEditor}
            data={recommendation}
            onInit={editor => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              setRecommendation(data)
            }}
          />

        </div>
        <div>
          <button 
            className="button full mt third-color" 
            onClick={handlerSubmit}
            disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
          >Cerrar Caso</button>
        </div>
      </div>
      {
        !isForm &&
        <div className="margin-top ed-grid full">
          <div className="ed-grid s-grid-2 m-grid-3 l-grid-4">
            <h1 className="m-cols-2 l-cols-3">Cierre del caso</h1>
            <button 
              className="button" 
              disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
              onClick={verModal}
            >Actualizar</button>
          </div>
          <div className="ed-grid m-grid-2 margin-top">
            <div className="border">
              <h2>Conclusión</h2>
              <MyComponent data={conclusion1} />

            </div>
            <div >
              <h2>Recomendación</h2>
              <MyComponent data={recommendation1} />

            </div>
          </div>
        </div>
      }
      <form className="form-modal " ref={modal}>
            <div className="ed-item ">
              <p className="button dark-color" onClick={verModal}>X</p>
            </div>
            <div className="l-block"></div>
            <div className="ed-item ">
              <h2 className="s-center">Actualizar</h2>
            </div>
            <div className="ed-item form__item">
              <label htmlFor="">Conclusión</label>
              <CKEditor
                editor={ClassicEditor}
                data={conclusion1}
                onInit={editor => {
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setConclusion(data)
                }}
              />
            </div>
            <div className="ed-item form__item">
              <label htmlFor=""  >Recomendación</label>
              <CKEditor
                editor={ClassicEditor}
                data={recommendation1}
                onInit={editor => {
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setRecommendation(data)
                }}
              />
            </div>
           
            <div className="ed-item">
              <button 
                className="button full mt-1"
                onClick={handlerSubmitAcualizar}
                >Actualizar etapa de cierre</button>
            </div>
          </form>

    </>
  )
}

function MyComponent({ data }) {

  function createMarkup() {
    return { __html: data };
  }

  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export default EtapaCierre
