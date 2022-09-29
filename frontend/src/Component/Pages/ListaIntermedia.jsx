import React, { useState, createRef, useEffect } from 'react'

import { URL } from '../../config/option'
import { Link, useParams } from 'react-router-dom';
import ListaActividades from '../Pages/ListaActividades';
import ComboInput from '../Organisms/ComboInput';
import localService from '../../config/Local'

const modal = createRef()
const verModal = () => modal.current.classList.toggle('verModal2')

const ListaIntermedia = () => {
  const { idCasos } = useParams()
  const [therapeuticPlan, setTherapeuticPlan] = useState('')
  const [therapeuticPlanFile, setTherapeuticPlanFile] = useState('')

  useEffect(() => {
    async function todo() {
      await getCasoIntermedio()
    }
    todo()
  }, [])

  const getCasoIntermedio = async () => {
    fetch(`${URL}cases/intermediate/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        setTherapeuticPlan(data.data[0].therapeuticPlan)
        setTherapeuticPlanFile(data.data[0].therapeuticPlanFile)
      })
      .catch(err => console.error(err))
  }

  const onChangePla = (data) => {

    fetch(`${URL}cases/intermediate/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'POST',
      body: JSON.stringify({ therapeuticPlan: data })
    })
      .then(rest => rest.json())
      .then(data => { })
      .catch(err => console.error(err))
  }

  const onChangePlaFile = (data) => {

    const formData = new FormData()
    formData.append('therapeuticPlanFile', data)
    fetch(`${URL}cases/intermediate/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'POST',
      body: formData
    })
      .then(rest => rest.json())
      .then(async data => {
        if (data.ok) await getCasoIntermedio()
      })
      .catch(err => console.error(err))
  }

  const handleArchivo = () => {
    fetch(`${URL}attachment/${therapeuticPlanFile}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        if (data.ok) {
          window.open(data.url, '_blank');
        }
      })
      .catch(err => console.log(err))

  }

  return (
    <>
      <section className="ed-grid  margin-top">
        <h1 className="pantient-title s-cols-2">Intermedia</h1>
        <div className="">
          {
            therapeuticPlanFile &&
            <button to='#' className="button light-color icon-download" onClick={() => handleArchivo()}> Descargar archivo</button>
          }
        </div>
      </section>
      <main className="ed-grid l-block">
        <div className="card">
          <div className="card__data s-border s-radius-br s-radius-bl s-pxy-2">
            <div className="ed-grid">
              <h2 className="t5">Plan Terapéutico</h2>
              <div>
                <button
                  className="button small"
                  onClick={verModal}
                  disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                >{therapeuticPlan ? 'Actualizar' : 'Crear'}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ed-grid mt">
          {
            (therapeuticPlan || therapeuticPlanFile) &&
            <div>
              <ListaActividades />
            </div>
          }
        </div>
      </main>
      <div className="contenedor-modar" ref={modal}>
        <div className="form-modal2">
          <p className="button dark-color btn-cerrar" onClick={verModal}>X</p>
          <ComboInput
            labelCKeditor='Plan Terapéutico'
            colorCombo={true}
            getCkeditor={therapeuticPlan}
            nameCK='therapeuticPlan'
            handleBlurCK={(data) => onChangePla(data.value)}
            getfile={therapeuticPlanFile}
            handleChangeFile={(e) => onChangePlaFile(e.target.files[0])}
            requiredCkeditor={true}
            requiredFile={true}
          />
          <button className="button mt" onClick={() => verModal()}>Continuar</button>
        </div>
      </div>
    </>
  )
}

export default ListaIntermedia
