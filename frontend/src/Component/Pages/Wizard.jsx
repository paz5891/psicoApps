import React, { useEffect, useState, createRef } from 'react'
import { Link, Route, useParams } from 'react-router-dom'
import { URL } from '../../config/option'

import Carousel from 'react-elastic-carousel'
import EtapaIniciall from './EtapaIniciall'
import ComboInput from '../Organisms/ComboInput'
import ModalPruebas from './Modal.pruebas'
import EtapaDiagnosticol from '../Pages/EtapaDiagnosticol'
import EtapaIntermedial from './EtapaIntermedial'
import EtapaCierrel from './EtapaCierrel'
import CustomSelect from '../helpers/Select'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Citas from './Citas'
import Moment from 'react-moment'
import UploadFile from '../helpers/UploadFile'
import localService from '../../config/Local'

const menu = createRef()
const menuDerecho = () => menu.current.classList.toggle('ver-informacion')



const modal = createRef()
const verModal = () => modal.current.classList.toggle('verModal2')

const modalDesistemiento = createRef()
const verModalDesistemiento = () => modalDesistemiento.current.classList.toggle('ver-desistir')

const modal2 = createRef()
const verModal2 = () => modal2.current.classList.toggle('verModal12')

const modalPruebas = createRef()
const verModalPruebas = () => modalPruebas.current.classList.toggle('verModalPruebas')

const modalComentarioinput = createRef()
const verModalinput = () => modalComentarioinput.current.classList.toggle('verModal2')

const modalComentarioinputac = createRef()
const verModalinputac = () => modalComentarioinputac.current.classList.toggle('verModal2')

const modalComentarios1 = createRef()
const verModalComentarios = () => modalComentarios1.current.classList.toggle('verComentarios')

const Wizard = () => {
  const { idCasos } = useParams()
  const [caseInf, setCaseInf] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [estado, setEstado] = useState(0)
  const [attachment, setAttachment] = useState('')
  const [comment, setComment] = useState('')
  const [admin] = useState(localService.getJsonValue('rol') === 'admin' ? true : false)

  const [assignedUser, setAssignedUser] = useState([])
  const [pantient, setPantient] = useState([])

  const [ckeditorComment, setCkeditorComment] = useState('')
  const [assignedUserSelect, setassignedUserSelect] = useState('')
  const [pantientSelect, setPantientSelect] = useState('')

  const [attachment1, setAttachment1] = useState('')
  const [comment1, setComment1] = useState('')
  const [idCommet, setIdCommet] = useState('')
  const [commentList, setCommentList] = useState([])

  const [getWorkCount, setWorkCount] = useState("0/1000");
  const [getWordOverflow, setWordOverflow] = useState(false);

  const [getdataPermission,setdataPermission] = useState(false);
  const [getdataPermissionMessage,setdataPermissionMessage] = useState("Cargando...");
  useEffect(() => {
    Slider()

    return () => false

  }, [])

  const Slider = () => {
    return (
      <Carousel breakPoints={breakPoints} initialFirstItem={currentStep}>
        <button disabled={localService.getJsonValue('rol') === 'admin' ? false : false} onClick={() => setCurrentStep(0)} className="button full">Etapa Inicial</button>
        <button disabled={localService.getJsonValue('rol') === 'admin' ? false : false} onClick={() => setCurrentStep(1)} className="button full">Etapa Diagnóstico</button>
        <button disabled={localService.getJsonValue('rol') === 'admin' ? false : false} onClick={() => setCurrentStep(2)} className="button full">Etapa Intermedia</button>
        <button disabled={localService.getJsonValue('rol') === 'admin' ? false : false} onClick={() => setCurrentStep(3)} className="button full">Etapa de Cierre</button>
      </Carousel>
    )
  }

  useEffect(() => {

    fetch(`${URL}users/1/0`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        const assigned = []
        data.data.map(({ uuid, firstName, lastName }) => {
          assigned.push({ label: `${firstName} ${lastName}`, value: uuid })
        })
        setAssignedUser(assigned)
      })
      .catch(err => console.log(err))


    fetch(`${URL}cases/personpatient`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        const assigned = []
        data.data.map(({ uuid, id }) => {
          assigned.push({ label: id, value: uuid })
        })
        setPantient(assigned)
      })
      .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    async function cas() {
      await cases();
    }
    cas()
  }, [])

  useEffect(() => {
    fetch(`${URL}cases/${idCasos}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(resp => resp.json())
      .then(results => { setCommentList(results.data) })
      .catch(err => console.log(err))

    fetch(`${URL}cases/stage/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(resp => resp.json())
      .then(results => CambioEstado(results.phase - 2))
      .catch(err => console.log(err))

  }, [])

  const getComentarios = () => {
    fetch(`${URL}cases/${idCasos}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(resp => resp.json())
      .then(results => { setCommentList(results.data) })
      .catch(err => console.log(err))
  }

  const onClickBtn = (e) => {
    e.preventDefault()

    if (assignedUserSelect && pantientSelect && ckeditorComment) {
      const caso = {
        uuidOwnerUser: 'uuid4',
        uuidAssignedUser: assignedUserSelect.value,
        uuidPersonPatient: pantientSelect.value,
        reasonForConsultation: ckeditorComment,
        uuidStage: caseInf.uuidStage,
        desisted: 0
      }

      fetch(`${URL}cases/${idCasos}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
        body: JSON.stringify(caso)
      })
        .then(rest => rest.json())
        .then(async data => {
          if (data.ok) {
            await cases()
            verModal2()
          }
        })
        .catch(err => console.error(err))
    } else {
      alert('Cambiar los valores para poder modificarlos')
    }
  }

  const desistirCaso = () => {
    fetch(`${URL}/cases/desistment/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT'
    })
      .then(resp => resp.json())
      .then(result => {
        if (result.ok) {
          alert('Se ha desistido correctamente')
          window.location = '/gridcasos'
        } else {
          alert(result.message)
        }
      })
      .catch(err => console.log(err))

  }

  async function cases() {
    fetch(`${URL}cases/viewcase/${idCasos}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        if (data.ok !== false) {

          setassignedUserSelect({ label: data.data[0].nameAssignedUser, value: data.data[0].uuidAssignedUser })
          setPantientSelect({ label: data.data[0].idPersonPatient, value: data.data[0].uuidPersonPatient })
          setCkeditorComment(decodeHTML(data.data[0].reasonForConsultation))
          setCaseInf(data.data[0])
        }
          setdataPermission(data.ok)
          setdataPermissionMessage(data.message)

      })
      .catch(err => console.log(err))
  }

  const fecha = (creationDate) => {
    var fechaCreacion = new Date(creationDate);

    var mes = fechaCreacion.getMonth() + 1;
    var dia = fechaCreacion.getDate();
    var anio = fechaCreacion.getFullYear();

    if (mes < 10) {
      mes = `0${mes}`
    }

    if (dia < 10) {
      dia = `0${dia}`
    }

    return `${dia}-${mes}-${anio}`
  }

  const _prev = () => {
    setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1)
  }

  // logica del cambio de etapas
  const _next = () => {
    if (admin) {
      CambioEstado(currentStep)
    } else {
      if (currentStep === 0) {
        fetch(`${URL}cases/verifyinitialstage/${idCasos}`, {
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
                alert('Por favor de completar todos campos requeridos')
              } else if (data.phase === 2) {
                verModal()
                setEstado(data.phase - 2)
              }
            }
          })
          .catch(err => console.error(err))
      }

      if (currentStep === 1) {
        fetch(`${URL}cases/verifydiagnostic/${idCasos}`, {
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
              setComment('')
              setAttachment(null)
              verModal()
              setEstado(resusts.phase - 2)

            }
          })
          .catch(err => console.log(err))

      }

      if (currentStep === 2) {
        fetch(`${URL}cases/verifyintermediate/${idCasos}`, {
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
              setComment('')
              setAttachment(null)
              verModal()
              setEstado(resusts.phase - 2)

            }
          })
          .catch(err => console.log(err))
      }

      if (currentStep >= 3) {
        CambioEstado(currentStep)
      }
    }
  }

  //Cambio de estado
  const CambioEstado = (currentStep) => {
    currentStep = currentStep >= 4 ? 5 : currentStep + 1
    setCurrentStep(currentStep)
  }

  // Boton siguiente
  const previousButton = () => {
    if (currentStep !== 0) {
      return (
        <button
          className="button light-color margin-left mt-1"
          disabled={localService.getJsonValue('rol') === 'admin' ? false : false}
          type="button"
          onClick={_prev}
        >
          Regresar
        </button>
      )
    }
    return null;
  }

  const nextButton = () => {
    if (currentStep < 3) {
      return (
        <button
          className="button margin-left mt-1"
          type="button" onClick={_next}>
          Siguiente
        </button>
      )
    }
    return null;
  }

  const handlerCambio = () => {

    const formData = new FormData

    formData.append('attachment', attachment)
    formData.append('comment', comment)

    fetch(`${URL}cases/stagehistory/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'POST',
      body: formData
    })
      .then(rest => rest.json())
      .then(data => {
        if (data.ok) {
          getComentarios()
          verModal()
          CambioEstado(estado)
        } else {
          alert('No se ha aguardado correctamente')
        }
      })
      .catch(err => console.log(err))
  }
  const handlerComentario = () => {

    const formData = new FormData

    formData.append('attachment', attachment1)
    formData.append('comment', comment1)

    fetch(`${URL}cases/stagehistory/${idCasos}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'POST',
      body: formData
    })
      .then(rest => rest.json())
      .then(data => {
        if (data.ok) {
          setAttachment1('')
          setComment1('')
          getComentarios()
          verModalinput()
        } else {
          alert('No se ha aguardado correctamente')
        }
      })
      .catch(err => console.log(err))
  }
  const handlerComentarioActualizar = () => {

    const formData = new FormData

    formData.append('attachment', attachment1)
    formData.append('comment', comment1)

    fetch(`${URL}cases/comments/${idCommet}`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: formData
    })
      .then(rest => rest.json())
      .then(data => {
        if (data.ok) {
          setAttachment1(null)
          setComment1('')
          getComentarios()
          verModalinputac()
        } else {
          alert('No se ha aguardado correctamente')
        }
      })
      .catch(err => console.log(err))
  }

  const levantarModal = (idcomment) => {
    fetch(`${URL}cases/comments/${idcomment}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(resp => resp.json())
      .then(results => {
        if (results.ok) {
          setAttachment1(results.data[0].attachment)
          setComment1(results.data[0].comment)
          setIdCommet(idcomment)
          verModalinputac()
        }
      })
      .catch(err => console.log(err))
  }

  function WorkCounter(data) {
    if (data.length <= 1000) {
      setWorkCount(data.length + "/1000");
      setWordOverflow(false);
    } else {
      setWordOverflow(true);
      setWorkCount("SE EXCEDIO EL LIMITE DE PALABRAS");
    }
  }
  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleArchivo = (file) => {
    fetch(`${URL}attachment/${file}`, {
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
  if (getdataPermission == false) {
    return (
      <div className="mt-5">
        <div className="l-cols-12 xl-cols-12" >
          <div style={{textAlign:"center",color:"black"}}><h2>{getdataPermissionMessage}</h2> </div>
        </div>
        
      </div>
      
    );
  } else {
    return (
      <div className="ed-grid max-grid l-grid-6 xl-grid-9 mt-5">

        <div className="menu-derecho l-cols-2 xl-cols-2" ref={menu}>
          <div className={admin ? 'ed-grid s-grid-3' : 'ed-grid'}>
            {
              admin &&
              <button
                className="button btn-actualiar-caso s-cols-2"
                onClick={verModal2}
              >Actualizar caso</button>

            }
            <span
              className="ver-menu-caso-info posicion"
              onClick={menuDerecho}
            >cerrar</span>
          </div>
          <p className="fecha-caso margin">Fecha de Creación: {fecha(caseInf.creationDate)}</p>
          <h2 className="Titulos20">Datos del caso</h2>
          <div className="contendor-menu">
            <h3 className="Titulo16">Identificador del paciente</h3>
            <p>{caseInf.idPersonPatient}</p>
          </div>
          <div className="contendor-menu">
            <h3 className="Titulo16">Nombre del Psicólogo</h3>
            <p>{caseInf.nameAssignedUser}</p>
            <p>{caseInf.lastNameUser}</p>
            <h3 className="Titulo16">Identificador del Psicólogo</h3>
            <p>{caseInf.caseNumber}</p>
          </div>
          <div className="l-block"></div>
          <Citas />
        </div>

        {/* Parte del Wizard */}
        <main className="l-cols-4 xl-cols-7 wizard">
          <div>
            <div className="ed-grid s-grid-2 l-grid-1">
              <span
                className="ver-menu-caso-info "
                onClick={menuDerecho}
              >Información del Caso</span>
              {
                currentStep !== 3 &&
                <button
                  className="button third-color posicion"
                  disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                  onClick={verModalDesistemiento}
                >Desistir el caso</button>
              }

              <div className=" card-desisteri" ref={modalDesistemiento}>
                <h1 className="s-center title-desis">Esta seguro de desistir el caso </h1>
                <div className="l-block"></div>
                <div className="ed-grid s-grid-2">
                  <button
                    className="button "
                    disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                    onClick={desistirCaso}
                  >Confirmar</button>
                  <button
                    className="button third-color"
                    disabled={localService.getJsonValue('rol') === 'admin' ? true : false}
                    onClick={verModalDesistemiento}
                  >Cancelar</button>
                </div>
              </div>
            </div>
            <div className="ed-grid">
              <p className="icon-commenting-o comentarios" onClick={verModalComentarios}> Agregar Comentario</p>
            </div>
            <div className="ed-grid margin2">
              <Slider />
            </div>
          </div>

          {/* Funcionalidad de las etapas */}
          <div className="ed-grid">
            {
              currentStep === 0 &&
              <EtapaIniciall currentStep={currentStep} />

            }

            {
              currentStep === 1 &&
              <EtapaDiagnosticol currentStep={currentStep} />
            }

            {
              currentStep === 2 &&
              <EtapaIntermedial currentStep={currentStep} />
            }
            {
              currentStep === 3 &&
              <EtapaCierrel currentStep={currentStep} />
            }

          </div>

          {/* Botones */}
          <div className="mb">
            {previousButton()}
            {nextButton()}
            {
              currentStep === 0 &&
              <button className="button accent-color mt-1" type="button" onClick={verModalPruebas}>
                Ver pruebas
              </button>
            }
          </div>
          <div className="contenedor-modar2" ref={modal}>
            <div className="form-modal22">
              <p className="button dark-color btn-cerrar" onClick={verModal}>X</p>
              <h2 className="title-modal">Escriba su comentario.</h2>
              <div className="form_modal">
                <ComboInput
                  labelCKeditor="Comentario"
                  getCkeditor={comment}
                  nameCK='comment'
                  handleBlurCK={(event) => setComment(event.value)}
                  colorCombo={true}
                  requiredCkeditor={true}
                  getfile={attachment}
                  requiredFile={true}
                  handleChangeFile={(e) => setAttachment(e.target.files[0])}
                />
                <button className="button full mt" onClick={handlerCambio} >Continuar a la etapa</button>
              </div>
            </div>
          </div>
          <div className="contenedor-modar2" ref={modalComentarioinput}>
            <div className="form-modal22">
              <p className="button dark-color btn-cerrar" onClick={verModalinput}>X</p>
              <h2 className="title-modal">Escriba su comentario</h2>
              <div className="form_modal">
                <ComboInput
                  labelCKeditor="Comentario"
                  getCkeditor={comment1}
                  nameCK='comment'
                  handleBlurCK={(event) => setComment1(event.value)}
                  colorCombo={true}
                  requiredCkeditor={false}
                  getfile={attachment1}
                  requiredFile={false}
                  handleChangeFile={(e) => setAttachment1(e.target.files[0])}
                />
                <button className="button full mt" onClick={handlerComentario} >Guardar Comentario</button>
              </div>
            </div>
          </div>
          <div className="contenedor-modar2" ref={modalComentarioinputac}>
            <div className="form-modal22">
              <p className="button dark-color btn-cerrar" onClick={verModalinputac}>X</p>
              <h2 className="title-modal">Actualizar comentario</h2>
              <div className="form_modal">
                <ComboInput
                  labelCKeditor="Comentario"
                  getCkeditor={comment1}
                  nameCK='comment'
                  handleBlurCK={(event) => setComment1(event.value)}
                  colorCombo={true}
                  requiredCkeditor={false}
                  getfile={attachment1}
                  requiredFile={false}
                  handleChangeFile={(e) => setAttachment1(e.target.files[0])}
                />
                <button className="button full mt" onClick={handlerComentarioActualizar} >Guardar Cambios</button>
              </div>
            </div>
          </div>
          <div className="modalPruebas" ref={modalPruebas}>
            <ModalPruebas verModalPruebas={verModalPruebas} />
          </div>

          <form onSubmit={onClickBtn} className="form-modal-3" ref={modal2}>
            <div className="ed-item">
              <p className="cerrar" onClick={verModal2}>cerrar</p>
            </div>
            <div className="ed-item">
              <h2>Actualizar el caso</h2>
            </div>
            <div className="ed-item">
              <label htmlFor="">
                Psicólogo Asignado
            </label>


              <CustomSelect
                placeholder={`${caseInf.nameAssignedUser} ${caseInf.lastNameUser}`}
                options={assignedUser}
                handleSelect={setassignedUserSelect}
              />


            </div>
            <div className="ed-item">
              <label htmlFor="">
                Paciente Asignado
            </label>
              <CustomSelect
                placeholder={caseInf.idPersonPatient}
                options={pantient}
                handleSelect={setPantientSelect}
              />
            </div>
            <div className="ed-item">
              <label htmlFor="">
                Razón de la consulta
                </label>
              <CKEditor
                editor={ClassicEditor}
                data={ckeditorComment}
	    	onBlur={(_, editor) => {
		    const data = editor.getData();
		    setCkeditorComment(data);
                    WorkCounter(data)
              	}}
              />
            </div>
            <div className="ed-item" style={{ textAlign: "right", color: "black", fontWeight: "bolder" }}>
              Cantidad de Palabras: {getWorkCount}
            </div>
            <div className="ed-item">
              <button className="button12 mt-1" >Actualizar Caso</button>
            </div>
          </form>

          <div className="pantalla-comentarios " ref={modalComentarios1}>
            <div className="ed-container">
              <div className="ed-item comentarios-cerrar" onClick={verModalComentarios}>
                cerrar
              </div>
              <div className="ed-item flex">
                <button className="button posicion" onClick={verModalinput}>Agregar comentarios</button>
              </div>
              <div className="ed-item">
                <div className="l-block"></div>
                <h3 className="icon-commenting-o" > Comentarios</h3>
              </div>
              <div className="ed-item ed-grid m-grid-2 l-grid-3 magin-button" >
                {
                  commentList.map(({ uuid, comment, attachment, dateEvent }) => (
                    <div className="ed-item coment-container" key={uuid}>
                      <div className="fecha-comentario">
                        <Moment format="DD/MM/YYYY" >
                          {dateEvent}
                        </Moment>
                      </div>
                      <div className="content-comment">
                        <MyComponent data={decodeHTML(comment)} />
                      </div>
                      <div className="file-commet ed-grid s-grid-2">
                        <Link to='#' className="button full light-color icon-download" onClick={() => handleArchivo(attachment)}>Descargar Documento</Link>
                        <Link to='#' className="button full light-color " onClick={() => levantarModal(uuid)}>Editar</Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

        </main>
      </div>
    )
  }

}

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

function MyComponent({ data }) {

  function createMarkup() {
    return { __html: data };
  }

  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export default Wizard
