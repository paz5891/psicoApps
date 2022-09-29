import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import Header from './Component/Organisms/Header';
import Protected from './Routes/Protected';
import Public from './Routes/Public';
import Login from './Component/Pages/Login';
import PagesRol from './Component/Pages/PagesRol';
import Page404 from './Component/Pages/Page404';
import GridCasos from './Component/GridCasos/GridCasos';
import CreatePantientv1 from './Component/Pantient/CreatePantientv1'
import Pantient from './Component/Pantient/Pantient';
import CreateCasos from './Component/CreateCasos/CreateCasos';
import Etapas from './Component/Etapas/Etapas';
import Users from './Component/Pages/Users';

import './App.scss';
import Wizard from './Component/Pages/Wizard';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Switch>
        <Protected path='/gridcasos' exact isRol={true} component={GridCasos} />
        <Protected path='/pantient' isRol={true} component={Pantient}  />
        <Protected path='/createpantient/:idpantients?'isRol={true} component={CreatePantientv1} />
        <Protected path='/updatepantient/:idpantients' isRol={true} component={CreatePantientv1} />
        <Protected path='/etapas1/:idCasos' isRol={true} component={Etapas} />
        <Protected path='/etapas/:idCasos' isRol={true} component={Wizard} />
        <Protected path='/createcasos' exact rolUser='admin' isRol={false} component={CreateCasos}  />
        <Protected path='/users' exact rolUser='admin' isRol={false}  component={Users}  />
        
        <Public path="/login" exact component={Login} />

        <Route path="/segurity" exact component={PagesRol} />

        <Route path="/" exact>
          <Redirect to="/gridcasos" />
        </Route>
        <Route component={Page404} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
