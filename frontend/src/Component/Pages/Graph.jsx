import React from 'react'
import Iframe from 'react-iframe'

const Graph = () => {
  return (
    <div className="ed-grid margin-top">
      <div className="l-block"></div>
      <div>
        <h1>Graficas</h1>
      </div>
      <div>
        <div className="l-block"></div>
        <h2>Casos</h2>
      </div>
      <div className="ed-grid">
        <div className="l-block"></div>
        <div>
          <h3>Según casos activos</h3>
          <div className="l-block"></div>
          <Iframe src="http://psicoapp.online:3000/d-solo/hEHeWahGk/psicoapp?orgId=1&from=1606249974285&to=1606271574285&panelId=21"
            width="100%"
            className="myClassname"
          />
        </div>
        <div>
          <h3>Según casos cerrados (Hoy)</h3>
          <div className="l-block"></div>
          <Iframe src="http://psicoapp.online:3000/d-solo/hEHeWahGk/psicoapp?orgId=1&from=1606250021623&to=1606271621623&panelId=25"
            width="100%"
            className="myClassname"
          />
        </div>
        <div>
          <h3>Según casos cerrados (Mes)</h3>
          <div className="l-block"></div>
          <Iframe src="http://psicoapp.online:3000/d-solo/hEHeWahGk/psicoapp?orgId=1&from=1606250039395&to=1606271639395&panelId=26"
            width="100%"
            className="myClassname"
          />
        </div>
        <div>
          <h3>Según casos cerrados (Año)</h3>
          <div className="l-block"></div>
          <Iframe src="http://psicoapp.online:3000/d-solo/hEHeWahGk/psicoapp?orgId=1&from=1606250089940&to=1606271689940&panelId=27"
            width="100%"
            className="myClassname"
          />
        </div>
        <div>
          <h3>Según casos por Psicologo</h3>
          <div className="l-block"></div>
          <Iframe src="http://psicoapp.online:3000/d-solo/hEHeWahGk/psicoapp?orgId=1&from=1606250118130&to=1606271718130&panelId=2"
            width="100%"
            className="myClassname"
          />
        </div>

      </div>
      <div>
        <h2>Pacientes</h2>
      </div>
      <div className="ed-grid">
        <Iframe src="http://psicoapp.online:3000/d-solo/hEHeWahGk/psicoapp?orgId=1&from=1606248718312&to=1606270318312&panelId=16"
          width="100%"
          className="myClassname"
        />

      </div>
    </div>

  )
}

export default Graph
