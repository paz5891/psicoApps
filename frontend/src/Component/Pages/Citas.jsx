import React, { useState, useEffect, createRef } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../../config/option'

import Moment from 'react-moment'
import localService from '../../config/Local'
const citas = createRef()
const modalCitas = () => citas.current.classList.toggle('verCitas')
const citas2 = createRef()
const modalCitas2 = () => citas2.current.classList.toggle('verCitas')

const Citas = ({ isValor = true }) => {
  const { idCasos } = useParams()

  const [citasCasos, setCitasCasos] = useState([])

  const [uuid, setUuid] = useState('')
  const [title, setTitle] = useState('Todos')
  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')


  useEffect(() => {

    fetch(`${URL}cases/meet?case=${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      }
    })
      .then(resp => resp.json())
      .then(resulst => {
        if (resulst.ok) {
          setCitasCasos(resulst.data)
        } else {
          setCitasCasos([])
        }
      })
      .catch(err => console.log(err))
  }, [])

  const refresCitas = async () => {

    fetch(`${URL}cases/meet?case=${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      }
    })
      .then(resp => resp.json())
      .then(async resulst => {
        if (resulst.ok) {

          setCitasCasos(resulst.data)
        } else {
          alert('Citas no encontradas 1')
        }
      })
      .catch(err => console.log(err))
  }

  const handlerDelete = uuid => {
    fetch(`${URL}cases/meet/${uuid}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(async results => {
        if (results.ok) {
          await refresCitas()
        } else {
          alert('Error al eliminar la cita')
        }
      })
      .catch(err => console.log(err))
  }

  const handlerCita = event => {
    event.preventDefault()
    const { titulo, fechaInicial, fechaFinal, horaInicial, horaFinal } = event.target
    if (titulo.value !== "" && fechaInicial.value !== "" && fechaFinal.value !== "" && horaInicial.value !== "" && horaFinal.value !== "") {
      const data = {
        title: titulo.value,
        beginDate: fechaInicial.value + " " + horaInicial.value,
        endDate: fechaFinal.value + " " + horaFinal.value,
        latitude: '',
        longitude: ''
      }

      fetch(`${URL}cases/meet/${idCasos}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(resp => resp.json())
        .then(results => {
          if (results.ok) {
            refresCitas()
            modalCitas()
          }
        })
        .catch(err => console.log(err))
    } else {
      alert("Debe de rellenar todos los campos para agendar una cita");
    }
  }

  const handlerActualizar = () => {

    const data = {
      title,
      beginDate,
      endDate,
      latitude: '',
      longitude: ''
    }

    fetch(`${URL}cases/meet/${uuid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(results => {
        if (results.ok) {
          refresCitas()
          modalCitas2()
        }
      })
      .catch(err => console.log(err))
  }

  const converFecha = async (fecha1) => {
    return new Promise((resolve) => {

      const fecha = new Date(fecha1)

      let dia = fecha.getDate() + 1
      let mes = fecha.getMonth() + 1
      const anio = fecha.getFullYear()

      if (dia < 10) {
        dia = `0${dia}`
      }
      if (mes < 10) {
        mes = `0${mes}`
      }
      resolve(`${anio}-${mes}-${dia}`)
    })
  }

  const dataUpdate = uuid => {
    fetch(`${URL}cases/meet/${idCasos}/${uuid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      }
    })
      .then(resp => resp.json())
      .then(async results => {
        if (results.ok) {
          setUuid(uuid)
          setTitle(results.data[0].title)
          setBeginDate(await converFecha(results.data[0].beginDate))
          setEndDate(await converFecha(results.data[0].endDate))
          modalCitas2()
        } else {
          alert('No se podra actualizar')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="l-block"></div>
      <div className="ed-grid s-grid-6 l-grid-4">
        <h2 className="Titulos20 s-cols-4 l-cols-2">Citas</h2>
        <span className="icon-plus s-cols-2 block" onClick={modalCitas}>Agregar Cita</span>
      </div>
      <div className="l-block"></div>

      {
        citasCasos.length >= 0 &&
        citasCasos.map(({ uuid, title, beginDate, endDate }) => (
          <article key={uuid} className="ed-grid">
            <div className="ed-grid s-grid-4 l-grid-3">
              <p className="s-cols-3 l-cols-2 Titulo16">{title}</p>
              <div className="ed-grid s-grid-2">
                <span className="icon-pencil-square-o block" onClick={() => dataUpdate(uuid)}></span>
                <span className="icon-trashcan block" onClick={() => handlerDelete(uuid)}></span>
              </div>
            </div>
            <div className="ed-grid">
              <p><Moment format="DD/MM/YYYY HH:mm">
                {beginDate}
              </Moment> al <Moment format="DD/MM/YYYY HH:mm">
                  {endDate}
                </Moment></p>
            </div>
          </article>
        ))
      }

      <div className="citas-modal" ref={citas}>
        <form className="citas-card" onSubmit={handlerCita}>
          <div className="btn-cerrar-modal-citas position" onClick={modalCitas}>
            cerrar
          </div>
          <div className="ed-grid s-grid-2 l-grid-3 xl-grid-4">
            <h2 className="Title20 l-cols-2 xl-cols-3">Agendar Cita</h2>
            <button type="submit" className="button">Guardar Cita</button>
          </div>
          <div className="form__item">
            <label htmlFor="#" className="label">Título</label>
            <input name="titulo" type="text" placeholder="Ingrese el título de la cita" required />
          </div>
          <div className="form__item">
            <label htmlFor="#">Fecha Inicio</label>
            <div className="ed-grid s-grid-2 l-grid-2 xl-grid-2">
              <input name="fechaInicial" type="date" required />
              <input name="horaInicial" type="time" required />
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="#">Fecha Final</label>
            <div className="ed-grid s-grid-2 l-grid-2 xl-grid-2">
              <input name="fechaFinal" type="date" required />
              <input name="horaFinal" type="time" required />
            </div>
          </div>
        </form>
      </div>
      <div className="citas-modal" ref={citas2}>
        <div className="citas-card">
          <div className="btn-cerrar-modal-citas position" onClick={modalCitas2}>
            cerrar
          </div>
          <div className="ed-grid s-grid-2 l-grid-3 xl-grid-4">
            <h2 className="Title20 l-cols-2 xl-cols-3">Actualizar Cita</h2>
            <button type="submit" onClick={handlerActualizar} className="button">Guardar Cambios</button>
          </div>
          <div className="form__item">
            <label htmlFor="#" className="label">Título</label>
            <input
              name="titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ingrese el título de la cita"
            />
          </div>
          <div className="form__item">
            <label htmlFor="#">Fecha Inicio</label>
            <input
              name="fechaInicial"
              value={beginDate}
              type="date"
              onChange={(e) => setBeginDate(e.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="#">Fecha Final</label>
            <input
              name="fechaFinal"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Citas
