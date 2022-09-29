import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../../config/option'
import Modal from 'react-modal';
import localService from '../../config/Local'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
const Users = () => {

  const [state, setState] = useState(false)
  const [stateRetired, setStateRetired] = useState(false)
  const [usersACtive, setUserActive] = useState([])
  const [usersNotActive, setUserNotActie] = useState([])

  const [uuidUser, setUuidUser] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function use() {
      await listUsers(false,false)
    }
    use()
  }, [])

  const listUsers = async (st,retired) => {
    try {
      setState(st)
      setStateRetired(retired);
      const rest = await fetch(`${URL}users/${(st===false)?0:1}/${(retired===false)?0:1}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localService.getJsonValue('token')}`
        }
      })
      const userss = await rest.json()

      setUserActive(userss.data.filter(({ active, uuid }) => active !== 0 && uuid !== "108834285576603021875"))
      setUserNotActie(userss.data.filter(({ active }) => active === 0))
    } catch (error) {
      console.log(error)
    }


  }
  const CambiarEstado = (uuid, active, firsName, lastName) => {
    const data = {
      id: uuid,
      state: active === 1 ? 0 : 1
    }
    fetch(`${URL}users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(rest => rest.json())
      .then(async data => {
        alert(active === 1 ? `${firsName} ${lastName} se ha desactivado correctamente` : `${firsName} ${lastName} se ha activado correctamente`)
        await listUsers(false,false)
      })
      .catch(err => alert('No sea podido activar/desactivar el usuario seleccionado'))
  }

  const EliminarUsuario = (uuid) => {
    const data = {
      id: uuid
    }
    fetch(`${URL}users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localService.getJsonValue('token')}`
      },
      method: 'DELETE',
      body: JSON.stringify(data)
    })
      .then(rest => rest.json())
      .then(async data => {
        alert(data.ok === true ? `Se Ha eliminado Correctamente el usuario` : `No Se Ha eliminado Correctamente el usuario`)
        await listUsers(false,false)
      })
      .catch(err => alert('No se ha podido activar/desactivar el usuario seleccionado'))
  }

  var subtitle;
  Modal.setAppElement('#root')

  const  openModal=(uuid)=> {
    setUuidUser(uuid);
    setIsOpen(true);
  }

  const afterOpenModal=()=> {
    subtitle.style.color = '#000';
  }

  const closeModal =() => {
    setUuidUser("");
    setIsOpen(false);
  }

  return (
    <div className="ed-grid mt-5">
      <h2>Usuarios</h2>
      <div className="l-block"></div>
      <div className="ed-grid s-grid-3">
        <button onClick={() => {listUsers(true,false)}} className="button light-color full">Activos</button>
        <button onClick={() => {listUsers(false,false)}} className="button light-color full">Por confirmar</button>
        <button onClick={() => {listUsers(false,true)}} className="button light-color full">Retirados</button>
      </div>
      <div className="l-block"></div>
      <h4>
        {
          state ? 'Activos' : 'Por confirmar'
        }
      </h4>
      <div className="l-block"></div>
      <div className="table-container">
        <table >
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Admitir</th>
              {
                !state  ? (!stateRetired?<th>Eliminar</th> : "" ): ""
              }

            </tr>

          </thead>
          <tbody>
            {
              state  ?
                usersACtive.map(({ uuid, firstName, lastName, active }) => (
                  <tr key={uuid}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>
                      <div className="ed-container"><Link to="#" onClick={() => CambiarEstado(uuid, active, firstName, lastName)} className="button accent-color">Desactivar</Link></div>
                    </td>
                  </tr>
                ))
                : 
                (!stateRetired?
                  usersNotActive.map(({ uuid, firstName, lastName, active}) => (
                    <tr key={uuid}>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>
                        <div className="ed-container"><Link To="#" onClick={() => CambiarEstado(uuid, active, firstName, lastName)} className="button">Activar</Link></div>
                      </td>
                      <td>
                        <div className="ed-container"><Link to="#" onClick={() => openModal(uuid)} className="button accent-color">Eliminar</Link></div>
                      </td>
                    </tr>
                  ))
                  :
                  usersNotActive.map(({ uuid, firstName, lastName, active}) => (
                    <tr key={uuid}>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>
                        <div className="ed-container"><Link To="#" onClick={() => CambiarEstado(uuid, active, firstName, lastName)} className="button">Activar</Link></div>
                      </td>
                    </tr>
                  ))
                  )  
            }

          </tbody>
          <tbody></tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <strong><h2 ref={_subtitle => (subtitle = _subtitle)}>ELIMINAR USUARIO</h2></strong> <br />
        <strong>En verdad Desea Eliminar el Usuario?</strong><br />
        <div className="ed-grid s-grid-2">
          <Link to="#" onClick={closeModal} className="button accent-color">Cerrar</Link>
          <Link to="#" onClick={() => EliminarUsuario(uuidUser)} className="button ">Aceptar</Link>
        </div>
        
      </Modal>
    </div>
  )
}

export default Users
