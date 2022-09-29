import React, { useState, useEffect } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SelectU from 'react-select';
import { useHistory } from 'react-router-dom';

import { URL } from '../../config/option'

import './Casos.scss'
import localService from '../../config/Local';

const CreateCasos = () => {
	const history = useHistory()

	const [ckeditorComment, setCkeditorComment] = useState('')
	const [AssignedUser, setAssignedUser] = useState([])
	const [personPatient, setPersonPatient] = useState([])
	const [uuidAssignedUser, setUuidAssignedUser] = useState('')
	const [uuidPersonPatient, setUuidPersonPatient] = useState('')
	const [getWorkCount, setWorkCount] = useState("0/1000");
	const [getWordOverflow, setWordOverflow] = useState(false);
	const [error, setError] = useState({});

	const validate = () => {
		let err = {}
		if (!uuidAssignedUser || uuidAssignedUser === "0") {
			err.psychologist = "El psicólogo es requerido"
		}
		if (!uuidPersonPatient || uuidPersonPatient === "0") {
			err.patient = "El paciente es requerido"
		}
		if (!ckeditorComment) {
			err.reason = "La razón de la consulta es requerida "
		}
		return err
	}

const handleSubmit = (e) => {
  e.preventDefault();
  const errs = validate();
  setError(errs);
  const band = Object.keys(errs).length === 0;
  if (!band && !getWordOverflow) return;
  const caso = {
    uuidOwnerUser: "uuid4",
    uuidAssignedUser: uuidAssignedUser,
    uuidPersonPatient: uuidPersonPatient,
    reasonForConsultation: ckeditorComment,
  };

  fetch(`${URL}cases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localService.getJsonValue("token")}`,
    },
    body: JSON.stringify(caso),
  })
    .then((rest) => rest.json())
    .then((data) => {
      if (data.ok) {
        history.push(`/etapas/${data.data}`);
      }
    })
    .catch((err) => console.error(err));
};

	useEffect(() => {
		fetch(`${URL}users/1/0`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localService.getJsonValue('token')}`
			}
		})
			.then(rest => rest.json())
			.then(data => {
				const assignedUser = []

				data.data.map(({ uuid, firstName, lastName }) => 
					assignedUser.push({ label: `${firstName} ${lastName}`, value: uuid })
				)
				setAssignedUser(assignedUser)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		fetch(`${URL}cases/personpatient`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localService.getJsonValue('token')}`
			}
		})
			.then(rest => rest.json())
			.then(data => {
				const pantientArray = []

				data.data.map(({ id, uuid }) => 
					pantientArray.push({ label: id, value: uuid })
				)

				setPersonPatient(pantientArray)
			})
			.catch(err => console.log(err))
	}, [])

	function WorkCounter(data) {
		if (data.length <= 1000) {
			setWorkCount(data.length + "/1000");
			setWordOverflow(false);
		} else {
			setWordOverflow(true);
			setWorkCount("SE EXCEDIO EL LIMITE DE PALABRAS");
		}
	}

	return (
		<>
			<div className="ed-container mt-8">
				<div className="ed-item">
					<h1>Crear caso</h1>
					<hr />
				</div>
				<div className="ed-item">
					<form onSubmit={handleSubmit} className="form">
						<div className="ed-item">
							<label htmlFor="">
								Asignar psicólogo
						</label>
							<select onChange={opt => setUuidAssignedUser(opt.target.value)}>
								<option value={0}>Seleccionar psicólogo</option>
								{AssignedUser.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}
							</select>
							{error.psychologist && (<p className="alert">{error.psychologist}</p>)}	
						</div>

						<div className="ed-item">
							<label htmlFor="">
								Asignar paciente
						</label>
							<select onChange={opt => setUuidPersonPatient(opt.target.value)}>
								<option value={0}>Seleccionar paciente</option>
								{personPatient.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}
							</select>
							{error.patient && (<p className="alert">{error.patient}</p>)}
						</div>

						<div className="ed-item">
							<label htmlFor="">
								Razón de la consulta
						</label>
							<CKEditor
								editor={ClassicEditor}
								data=''
								onInit={() => {
								}}
								onChange={(_event, editor) => {
									const data = editor.getData();
									setCkeditorComment(data);
									WorkCounter(data)
								}}
							/>

						{error.reason && (<p className="alert">{error.reason}</p>)}
						</div>
						<div className="ed-item" style={{ textAlign: "right", color: "black", fontWeight: "bolder" }}>
							Cantidad de palabras: {getWorkCount}
						</div>
						<div className="ed-item">
							<div className="l-block"></div>
							<button className="button1 mt-1" type='submit'>Crear Caso</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default CreateCasos
