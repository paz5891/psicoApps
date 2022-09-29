import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Styles.pantient.scss'
import { URL } from '../../config/option'
import Search from '../helpers/Search'
import localService from '../../config/Local'

const Pantient = () => {

	const [pantient, setPantient] = useState([])

	useEffect(()=> {
		getPantient()
	},[])

	const getPantient = async () => {
		fetch(`${URL}persons/grid/1`, {
			headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
		})
		.then(res => res.json())
		.then( data => {setPantient(data.data)
		})
		.catch( err => console.error(err))
	}

	const handleDelete = (id,e) => {
		const url = `${URL}persons/${id}`
		fetch(url , {
			headers: {
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
			method: 'DELETE'
		})
			.then(res => res.json())
			.then( data => {
				if(data.ok) {
					getPantient()
				}
			})
			.catch( err => console.error(err))
	}

	const handleSearch = (e) => {

		if(e.target.value) {
			fetch(`${URL}persons/gridbyid/${e.target.value}`, {
				headers: {
					Authorization: `Bearer ${localService.getJsonValue('token')}`
				},
			})
			.then(rest => rest.json())
			.then(data => setPantient(data.data))
		}else {
			getPantient()
		}

	}

	return (
		<>	
			<section className="ed-container mt-8">
				<div className="ed-item ed-container">
					<div className="ed-item">
						<h1 className="pantient-title">Pacientes</h1>
					</div>
					<div className="ed-item s-60">
						<Search handleSearch={handleSearch} title="Buscar Pacientes -por ejemplo: 2021-PASP25-00050-" />
					</div>
					<div className="ed-item s-40">
						<Link to="/createpantient" className="button full">Crear Paciente</Link>
					</div>
				</div>
			</section>
			<div className="ed-container">
		    {
					pantient.length !== 0
					?
					pantient.map(({id, mobilePhone, addressLine1, email}) => (
						<div key={id} className="ed-item m-50 l-1-3">
							<article className="s-shadow-bottom">
								<div className="ed-grid m-grid-5 s-gap-2 m-pxy-2 s-bg-white s-radius-tl s-radius-tr">
									<div className="s-pxy-2 m-pxy-0 m-cols-3">
										<h3>{id}</h3>
										<p className="s-mb-0">{email}</p>
										<p className="s-mb-0">{addressLine1}</p>
										<p className="s-mb-0">{mobilePhone}</p>
									</div>
								</div>
								<footer className="s-bg-grey s-cross-center s-pxy-2 s-radius-br s-radius-bl">
									<button className="button third-color" onClick={ (e)=>handleDelete(id, e) }>Borrar</button>
									<Link to={'/updatepantient/'+id} className="s-to-right"><button className="button accent-color">Editar</button></Link>
								</footer>
							</article>
						</div>
					))
					:
					<div className="ed-item">
						<p className="alert">
						Ningún registro encontrado!
						</p> 
					</div>
				}
			</div>
		</>
	)
}

export default Pantient
