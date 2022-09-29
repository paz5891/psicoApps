import React, { useState, useEffect } from 'react'
import Search from '../helpers/Search'
import './estilos.scss'
import { Link } from 'react-router-dom'
import { URL } from '../../config/option'
import localService from '../../config/Local'
const GridCasos = () => {

	const [Radio, setRadio] = useState(2)
	const [Filter, setFilter] = useState(2)
	const [pantient, setPantien] = useState([])

	const handleSearch = (e) => {
		setFilter(2)
		fetch(`${URL}cases/byfilter?filter=${e.target.value}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localService.getJsonValue('token')}`
			},
		})
			.then(res => res.json())
			.then(data => setPantien(data.data))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		let url = ''

		if (Filter === 0 || Filter === 4) {
			url = `${URL}cases/filter/${Filter}`
		}

		if (Filter === 1 || Filter === 2) {
			url = `${URL}cases/filter/${Filter}/${Radio}`
		}

		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localService.getJsonValue('token')}`
			},
		})
			.then(res => res.json())
			.then(data => setPantien(data.data))

	}, [Filter, Radio])

	const onClickConfirmarDesestimiento = (idCaso, isValor) => {
		fetch(`${URL}cases/desistment/confirm/${idCaso}?desist=${isValor}`,{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localService.getJsonValue('token')}`
			},
			method: 'PUT'
		})
			.then(resp => resp.json())
			.then(results => {
				if(results.ok) window.location = '/gridcasos'
			})
			.catch(err => console.log(err))
	}
	return (
		<>
			<section className="ed-container mt-8">
				<div className="ed-item ed-container">
					<div className="ed-item">
						<h1 className="pantient-title">Casos</h1>
					</div>
					<div className="ed-item s-60 m-70 l-80">
						<Search handleSearch={handleSearch} title='Buscar por el identificador del caso -por ejemplo: 2020-PSACSE01-00001' />
					</div>
					<div className="ed-item s-40 m-30 l-20">
						<Link to="/createcasos" className="button full">Crear Caso</Link>
					</div>
				</div>
			</section>

			<section className="ed-container">
				<div className="ed-item">
					<h3>Ordenar por:</h3>
				</div>
				<div className="ed-item s-50 ">
					<div className="card-filter">
						<button type="button" className={Filter === 2 ? 'btn-filter select' : 'btn-filter'} onClick={() => setFilter(2)}>Fecha</button>
						{
							localService.getJsonValue('rol') === 'admin' &&
							<button type="button" className={Filter === 4 ? 'btn-filter select' : 'btn-filter'} onClick={() => setFilter(4)} >Desistidos</button>
						}
						<button type="button" className={Filter === 1 ? 'btn-filter select' : 'btn-filter'} onClick={() => setFilter(1)} >Edad</button>
					</div>
				</div>
				<div className="ed-item s-50 flex flex-center flex-right">
					<div className="card-filter">
						<div className="ed-item ed-container">
							<button type="button" className={Radio === 1 ? 'btn-filter select' : 'btn-filter'} onClick={() => setRadio(1)} >Ascendente</button>
						</div>
						<div className="ed-item ed-container">
							<button type="button" className={Radio === 2 ? 'btn-filter select' : 'btn-filter'} onClick={() => setRadio(2)} >Descendente</button>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="ed-container">
					<div className="ed-item">
						<h3><strong>Lista de casos</strong></h3>
					</div>
					{
						pantient.length
							?
							pantient.map((data) => (
								<div key={data.caseNumber} className="ed-item s-100 m-50 l-1-3">
									<article className="s-shadow-bottom">
										<div className="ed-container">
											<div className="ed-item">
												<h3>{data.caseNumber}</h3>
												<p className="s-mb-0">Edad: {data.age}</p>
												<p className="s-mb-0">Fecha Creación: {data.creationDate}</p>
												<p className="s-mb-0">{data.firstNameAssigned}</p>
											</div>
										</div>
										<footer className="s-bg-grey s-cross-center s-pxy-2 s-radius-br s-radius-bl">
											{
												Filter !== 4 &&
												<p className="s-10">{data.stage}</p>
											}
											{
												Filter === 4 &&
												<button
													className="button ghost third-color btn-desestimiento s-to-right"
													onClick={() => onClickConfirmarDesestimiento(data.uuid, true)}
												>Aprobar</button>
											}
											{
												Filter === 4 &&
												<button
													className="button ghost btn-desestimiento s-to-right"
													onClick={() => onClickConfirmarDesestimiento(data.uuid, false)}
												>Denegar</button>

											}
											<Link to={'/etapas/' + data.uuid} className="button ghost accent-color s-to-right">Editar</Link>
										</footer>
									</article>
								</div>
							))
							: <p className="ed-item alert ">No hemos encontrado lo que buscas!</p>
					}
				</div>
			</section>
		</>
	)
}

export default GridCasos
