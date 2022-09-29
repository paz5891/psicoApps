import React, { useState, useEffect, createRef } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../../config/option'
import ComboInput from '../Organisms/ComboInput';
import Moment from 'react-moment'
import localService from '../../config/Local'

const modal = createRef()
const verModal = () => modal.current.classList.toggle('verModal2')

const modal2 = createRef()
const verModal2 = () => modal2.current.classList.toggle('verModal2')

const citas = createRef()
const modalCitas = () => citas.current.classList.toggle('verCitas')

const citas2 = createRef()
const modalCitas2 = () => citas2.current.classList.toggle('verCitas')

const citas3 = createRef()
const modalCitas3 = () => citas3.current.classList.toggle('verCitas')

const ListaActividades = () => {
  const { idCasos } = useParams()

  const [aspectToWork, setAspectToWork] = useState('')
  const [aspectToWorkFile, setAspectToWorkFile] = useState('')
  const [objetives, setObjetives] = useState('')
  const [objetivesFile, setObjetivesFile] = useState('')
  const [goals, setGoals] = useState('')
  const [goalsFile, setGoalsFile] = useState('')
  const [focus, setFocus] = useState('')
  const [focusFile, setFocusFile] = useState('')
  const [techniques, setTechniques] = useState('')
  const [techniquesFile, setTechniquesFile] = useState('')

  const [aspectToWork1, setAspectToWork1] = useState('')
  const [aspectToWorkFile1, setAspectToWorkFile1] = useState('')
  const [objetives1, setObjetives1] = useState('')
  const [objetivesFile1, setObjetivesFile1] = useState('')
  const [goals1, setGoals1] = useState('')
  const [goalsFile1, setGoalsFile1] = useState('')
  const [focus1, setFocus1] = useState('')
  const [focusFile1, setFocusFile1] = useState('')
  const [techniques1, setTechniques1] = useState('')
  const [techniquesFile1, setTechniquesFile1] = useState('')

  const [actividades, setActividades] = useState([])
  const [uuidActividad, setUuidActividad] = useState('')
  const [uuidTerapeuticas, setUuidTerapeuticas] = useState('')

  const [citasCasos, setCitasCasos] = useState([])

  const [uuid, setUuid] = useState('')
  const [uuidT, setUuidT] = useState('')
  const [title, setTitle] = useState('Todos')
  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    async function todos() {
      await ejecutarActividades()
    }
    todos()
  }, [])

  const ejecutarActividades = async () => {
    fetch(`${URL}cases/intermediate/therapeuticplan/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setActividades(data.data))
      .catch(err => console.log(err))
  }

  const refresCitas = async () => {

    fetch(`${URL}cases/meet?therapeutic=${uuidT}`, {
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
  }

  const handlerDeleteCitas = uuid => {
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


  const handlerActualizarCita = () => {

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
      .then(async results => {
        if (results.ok) {
          await refresCitas()
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

  const handlerSubmit = () => {
    const forData = new FormData()
    forData.append('aspectToWork', aspectToWork1)
    forData.append('aspectToWorkFile', aspectToWorkFile1)
    forData.append('objetives', objetives1)
    forData.append('objetivesFile', objetivesFile1)
    forData.append('goals', goals1)
    forData.append('goalsFile', goalsFile1)
    forData.append('focus', focus1)
    forData.append('focusFile', focusFile1)
    forData.append('techniques', techniques1)
    forData.append('techniquesFile', techniquesFile1)

    fetch(`${URL}cases/intermediate/therapeuticplan/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'POST',
      body: forData
    })
      .then(resp => resp.json())
      .then(async data => {
        setAspectToWork("");
        setAspectToWork1("");
        setAspectToWorkFile("");
        setAspectToWorkFile1("");
        setObjetives("");
        setObjetives1("");
        setObjetivesFile("");
        setObjetivesFile1("");
        setGoals("");
        setGoals1("");
        setGoalsFile("");
        setGoalsFile1("");
        setFocus("");
        setFocus1("");
        setFocusFile("");
        setFocusFile1("");
        setTechniques("");
        setTechniques1("");
        setTechniquesFile("");
        setTechniquesFile1("");
        verModal()
        await ejecutarActividades()
      })
      .catch(err => console.log(err))
  }
  const handlerSubmit2 = (data) => {
    const { name, value } = data

    fetch(`${URL}cases/intermediate/therapeuticplan/${idCasos}/${uuidActividad}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: JSON.stringify({ [name]: value })
    })
      .then(rest => rest.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const handlerSubmit3 = (value, name) => {
    const formData = new FormData()

    formData.append(`${name}`, value)

    fetch(`${URL}cases/intermediate/therapeuticplan/${idCasos}/${uuidActividad}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: formData
    })
      .then(rest => rest.json())
      .then(data => {
        handlerActualizar2(uuidActividad)
      })
      .catch(err => console.log(err))

  }

  const handlerActualizar = uuid => {
    fetch(`${URL}cases/intermediate/therapeuticplan/${idCasos}/${uuid}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        setAspectToWork(data.data[0].aspectToWork)
        setAspectToWorkFile(data.data[0].aspectToWorkFile)
        setObjetives(data.data[0].objetives)
        setObjetivesFile(data.data[0].objetivesFile)
        setGoals(data.data[0].goals)
        setGoalsFile(data.data[0].goalsFile)
        setFocus(data.data[0].focus)
        setFocusFile(data.data[0].focusFile)
        setTechniques(data.data[0].techniques)
        setTechniquesFile(data.data[0].techniquesFile)
        setUuidActividad(uuid)
        verModal2()
      })
      .catch(err => console.log(err))
  }

  const handlerActualizar2 = uuid => {
    fetch(`${URL}cases/intermediate/therapeuticplan/${idCasos}/${uuid}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        setAspectToWork(data.data[0].aspectToWork)
        setAspectToWorkFile(data.data[0].aspectToWorkFile)
        setObjetives(data.data[0].objetives)
        setObjetivesFile(data.data[0].objetivesFile)
        setGoals(data.data[0].goals)
        setGoalsFile(data.data[0].goalsFile)
        setFocus(data.data[0].focus)
        setFocusFile(data.data[0].focusFile)
        setTechniques(data.data[0].techniques)
        setTechniquesFile(data.data[0].techniquesFile)
        setUuidActividad(uuid)
      })
      .catch(err => console.log(err))
  }

  const handlerCerrarContinuar = async () => {
    await ejecutarActividades()
    verModal2()
  }
  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handlerCitas = (uuid) => {
    setUuidTerapeuticas(uuid)
    modalCitas()
  }

  const handlerCita = (event) => {
    event.preventDefault()

    const { titulo, fechaInicial, fechaFinal } = event.target

    const data = {
      uuidTherapeuticPlanActivity: uuidTerapeuticas,
      title: titulo.value,
      beginDate: fechaInicial.value,
      endDate: fechaFinal.value,
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
          modalCitas()
        }
      })
      .catch(err => console.log(err))
  }

  const handlerGetCitas = (uuid) => {
    fetch(`${URL}cases/meet?therapeutic=${uuid}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      }
    })
      .then(resp => resp.json())
      .then(resulst => {
        setUuid(uuid)
        if (resulst.ok) {
          setUuidT(uuid)
          setCitasCasos(resulst.data)
          modalCitas3()
        } else {
          setCitasCasos([])
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className="pantient-title">Actividades del Plan Terapéutico</h2>
      <button
        className="button accent-color small mt"
        disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
        onClick={verModal}
      >Agrear Actividades</button>
      <div className="ed-grid">
        <div className="ed-grid m-grid-2 l-grid-3">
          {
            actividades.map(({ uuid, aspectToWork }, index) => (
              <div className="contianercard-tera" key={uuid}>
                <div className="card mt">
                  <div className="card__data s-border s-radius-br s-radius-bl s-pxy-2">
                    <h2 className="t5 s-mb-2 s-center">Actividades {index + 1}</h2>
                    <div className="ed-grid s-grid-2">
                      <button
                        className="button"
                        disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                        onClick={() => handlerActualizar(uuid)}>Editar</button>
                      <button
                        className="button second-color"
                        disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                        onClick={() => handlerCitas(uuid)}>Crear citas</button>
                    </div>
                  </div>
                </div>
                <div className="Contenido-tera">
                  <h2 className="title-contenido-tera">Apectos a trabajar</h2>
                  <MyComponent data={decodeHTML(aspectToWork)} />
                </div>
              </div>
            ))
          }
        </div>
        <div className="ed-grid">
          <div className="l-block"></div>
          <h2>Citas de las actividades</h2>
          <div className="ed-grid m-grid-2 l-grid-3">

          {
            actividades.map(({ uuid }, index) => (
              <div className="ed-grid" key={uuid}>
                <div key={uuid} className="taps-actividad" onClick={() => handlerGetCitas(uuid)}>Actividad {index + 1}</div>
              </div>
            ))
          }
          </div>
          <div className="citas-modal" ref={citas3}>

            <div className="citas-card" >
              <div className="btn-cerrar-modal-citas position" onClick={modalCitas3}>
                cerrar
                    </div>
              {
                citasCasos.map(({ uuid, title, beginDate, endDate }) => (
                  <article key={uuid} className="ed-grid">
                    <div className="ed-grid s-grid-4 l-grid-3">
                      <p className="s-cols-3 l-cols-2 Titulo16">{title}</p>
                      <div className="ed-grid s-grid-2">
                        <span className="icon-pencil-square-o block" onClick={() => dataUpdate(uuid)}></span>
                        <span className="icon-trashcan block" onClick={() => handlerDeleteCitas(uuid)}></span>
                      </div>
                    </div>
                    <div className="ed-grid">
                      <p><Moment format="YYYY/MM/DD">
                        {beginDate}
                      </Moment> al <Moment format="YYYY/MM/DD">
                          {endDate}
                        </Moment></p>
                    </div>
                  </article>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="contenedor-modar" ref={modal}>
        <div className="form-modal2">
          <p className="button dark-color btn-cerrar" onClick={verModal}>X</p>
          <h2 className="title-modal">Crear Plan Terapéutico</h2>
          <div className="form_modal">
            <ComboInput
              labelCKeditor="Aspectos a trabajar"
              getCkeditor={aspectToWork1}
              nameCK='aspectToWork1'
              handleBlurCK={(event) => setAspectToWork1(event.value)}
              colorCombo={true}
              requiredCkeditor={true}
              getfile={aspectToWorkFile1}
              requiredFile={false}
              handleChangeFile={(e) => setAspectToWorkFile1(e.target.files[0])}
            />
            <ComboInput
              labelCKeditor="Objetivos"
              getCkeditor={objetives1}
              nameCK='objetives1'
              handleBlurCK={(event) => setObjetives1(event.value)}
              colorCombo={false}
              requiredCkeditor={false}
              getfile={objetivesFile1}
              nameFile='objetivesFile1'
              requiredFile={false}
              handleChangeFile={(e) => setObjetivesFile1(e.target.files[0])}
            />
            <ComboInput
              labelCKeditor="Metas"
              getCkeditor={goals1}
              nameCK='goals1'
              handleBlurCK={(event) => setGoals1(event.value)}
              colorCombo={true}
              requiredCkeditor={false}
              getfile={goalsFile1}
              nameFile='goalsFile1'
              requiredFile={false}
              handleChangeFile={(e) => setGoalsFile1(e.target.files[0])}
            />
            <ComboInput
              labelCKeditor="Atención"
              getCkeditor={focus1}
              nameCK='focus1'
              handleBlurCK={(event) => setFocus1(event.value)}
              colorCombo={false}
              requiredCkeditor={false}
              getfile={focusFile1}
              nameFile='focusFile1'
              requiredFile={false}
              handleChangeFile={(e) => setFocusFile1(e.target.files[0])}
            />
            <ComboInput
              labelCKeditor="Tecnicas"
              getCkeditor={techniques1}
              nameCK='techniques1'
              handleBlurCK={(event) => setTechniques1(event.value)}
              colorCombo={true}
              requiredCkeditor={false}
              getfile={techniquesFile1}
              nameFile='techniquesFile1'
              requiredFile={false}
              handleChangeFile={(e) => setTechniquesFile1(e.target.files[0])}
            />
            <button className="button full mt" onClick={handlerSubmit}>Continuar</button>

          </div>
        </div>
      </div>

      <div className="contenedor-modar" ref={modal2}>
        <div className="form-modal2">
          <p className="button dark-color btn-cerrar" onClick={handlerCerrarContinuar}>X</p>
          <h2 className="title-modal">Actualizar Plan Terapéutico</h2>
          <div className="form_modal ed-grid">
            <ComboInput
              labelCKeditor="Aspectos a trabajar"
              getCkeditor={aspectToWork}
              nameCK='aspectToWork'
              handleBlurCK={handlerSubmit2}
              colorCombo={true}
              requiredCkeditor={false}
              getfile={aspectToWorkFile}
              nameFile='aspectToWorkFile'
              requiredFile={false}
              handleChangeFile={(e) => handlerSubmit3(e.target.files[0], 'aspectToWorkFile')}
              isArchivo={true}
            />
            <ComboInput
              labelCKeditor="Objetives"
              getCkeditor={objetives}
              nameCK='objetives'
              handleBlurCK={handlerSubmit2}
              colorCombo={false}
              requiredCkeditor={false}
              getfile={objetivesFile}
              nameFile='objetivesFile'
              requiredFile={false}
              handleChangeFile={(e) => handlerSubmit3(e.target.files[0], 'objetivesFile')}
              isArchivo={true}
            />
            <ComboInput
              labelCKeditor="Metas"
              getCkeditor={goals}
              nameCK='goals'
              handleBlurCK={handlerSubmit2}
              colorCombo={true}
              requiredCkeditor={false}
              getfile={goalsFile}
              nameFile='goalsFile'
              requiredFile={false}
              handleChangeFile={(e) => handlerSubmit3(e.target.files[0], 'goalsFile')}
              isArchivo={true}
            />
            <ComboInput
              labelCKeditor="Atención"
              getCkeditor={focus}
              nameCK='focus'
              handleBlurCK={handlerSubmit2}
              colorCombo={false}
              requiredCkeditor={false}
              getfile={focusFile}
              nameFile='focusFile'
              requiredFile={false}
              handleChangeFile={(e) => handlerSubmit3(e.target.files[0], 'focusFile')}
              isArchivo={true}
            />

            <ComboInput
              labelCKeditor="Técnicas"
              getCkeditor={techniques}
              nameCK='techniques'
              handleBlurCK={handlerSubmit2}
              colorCombo={true}
              requiredCkeditor={false}
              getfile={techniquesFile}
              nameFile='techniquesFile'
              requiredFile={false}
              handleChangeFile={(e) => handlerSubmit3(e.target.files[0], 'techniquesFile')}
              isArchivo={true}
            />

            <button className="button full mt" onClick={handlerCerrarContinuar}>Continuar</button>
          </div>
        </div>
      </div>
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
            <input name="titulo" type="text" placeholder="Ingrese el título de la cita" />
          </div>
          <div className="form__item">
            <label htmlFor="#">Fecha Inicio</label>
            <input name="fechaInicial" type="date" />
          </div>
          <div className="form__item">
            <label htmlFor="#">Fecha Final</label>
            <input name="fechaFinal" type="date" />
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
            <button type="submit" onClick={handlerActualizarCita} className="button">Guardar Cambios</button>
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
    </>
  )
}

export default ListaActividades

function MyComponent({ data }) {

  function createMarkup() {
    return { __html: data };
  }

  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
