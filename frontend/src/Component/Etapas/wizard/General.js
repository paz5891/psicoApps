import React, { useState, useEffect } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { URL } from '../../../config/option'
import CustomSelect from '../../helpers/Select';
import localService from '../../../config/Local';
const General = ({ currentStep, idCase }) => {

  const [caseInf, setCaseInf] = useState({})

  const [assignedUser, setAssignedUser] = useState([])
  const [pantient, setPantient] = useState([])
  const [ckeditorComment, setCkeditorComment] = useState('')
  const [assignedUserSelect, setassignedUserSelect] = useState('')
  const [pantientSelect, setPantientSelect] = useState('')


  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {

    fetch(`${URL}users`, {
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


    fetch(`${URL}cases/personpatient`,{
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

  async function cases() {
    fetch(`${URL}cases/viewcase/${idCase}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
    })
      .then(rest => rest.json())
      .then(data => {
        setassignedUserSelect({ label: data.data[0].nameAssignedUser, value: data.data[0].uuidAssignedUser })
        setPantientSelect({ label: data.data[0].idPersonPatient, value: data.data[0].uuidPersonPatient })

        setCkeditorComment(decodeHTML(data.data[0].reasonForConsultation))
        setCaseInf(data.data[0])
      })
      .catch(err => console.log(err))
  }

  if (currentStep !== 1) {
    return null
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

      fetch(`${URL}cases/${idCase}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        },
        body: JSON.stringify(caso)
      })
        .then(rest => rest.json())
        .then(data => {
          if (data.ok) {
            cases()
          }
        })
        .catch(err => console.error(err))
    } else {
      alert('Cambiar los valores para poder modificarlos')
    }
  }

  const rol = localService.getJsonValue('rol')

  return (
    <>
      <div className="ed-item border m-50 margin-top">
        <div className="ed-item ed-container">
          <h2>Datos del Caso</h2>
        </div>
        <h3 className="title">Identificador del caso:
          <p className="title-p">{caseInf.caseNumber}</p>
        </h3>
        <h3 className="title">Fecha de Creación:
          <p className="title-p">{fecha(caseInf.creationDate)}</p>
        </h3>
        <h3 className="title">Nombre del Psicólogo:
          <p className="title-p">{caseInf.nameAssignedUser} {caseInf.lastNameUser}</p>
        </h3>
        <h3 className="title">Identificador del Paciente:
          <p className="title-p">{caseInf.idPersonPatient}</p>
        </h3>
      </div>

      {
        rol === 'admin'
          ?
          <form onSubmit={onClickBtn} className="ed-item border m-50 ed-container margin-top">
            <div className="ed-item">
              <h2>Actualizar el Caso</h2>
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
                Razón de la Consulta
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={ckeditorComment}
                onChange={(event, editor) => {

                  const data = editor.getData();
                  setCkeditorComment(data)
                }}
              />
            </div>
            <div className="ed-item">
              <button className="button12 mt-1" >Actualizar Caso</button>
            </div>
          </form>
          :null
      }
    </>
  )
}

export default General
