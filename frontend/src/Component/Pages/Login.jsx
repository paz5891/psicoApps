import React, {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import {urlDomino} from '../../config/option'
import localService from '../../config/Local';

const Login = ()=>  {
  
  const [stateRequest, setStateRequest] = useState('')

  const responseGoogle = (response) => {

    if(response.code) {
      fetch(`${urlDomino}auth/google`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({code: response.code})
      })
      .then(res => {

        if (res.status === 400) {
          //TOKEN 
          return res.json()
        }
        if (res.status === 404) {
          // USER NO ENCONTRADO 
          return res.json()
        }
        if (res.status === 406) {
          // CUENTA INACTIVA
          return res.json()
        }
        //1
        if (res.status === 401) {
          // CUENTA NO VALIDA
          return res.json()
        }
        //1
        if (res.status === 201) {
          // CUENTA EN PROCESO
          alert('Su cuenta se encuentra en proceso de activación.')
        }
        if (res.status === 200) {
          return res.json()
        }
      })
      .then(data => {
        if(data.ok) {
          localService.setJsonValue('token',data.data.token);
          localService.setJsonValue('rol',data.data.rol);
          window.location = '/gridcasos'
        }else {
          alert(data.message)
        }
      })
      .catch(err => {
        console.log('Error',err)
        setStateRequest({ requestFailed: true })
      })
    }
  }

  return (
    
      <div className="ed-grid mt-8">
        <div className="l-block s-center">Iniciar Sesión</div>
        <div className="s-center">
          <GoogleLogin
            clientId="143496961981-ujnpieglv56e3etvkuph88s9s8ihp6t6.apps.googleusercontent.com"
            responseType="code"
            redirectUri="postmessage"
            buttonText="Iniciar sesión con google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
 
  )

}

export default Login

