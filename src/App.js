import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashBoardPasajero from './components/dashboard_pasajero/DashBoardPasajero';
import DashBoardConductor from './components/dashboard_conductor/DashBoardConductor';
import RegistrarUsuario from './components/Registrar_Usuario/RegistrarUsuario';
import Home from './components/home/Home';
import Login from './components/login/login';

function App() {
  return (
    <div className="App">
      {/* HACK reload stiles to diferent view forceRefresh={true}*/}
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route path='/' component={Home} exact ></Route>
          <Route path='/home' component={Home} exact ></Route>
          <Route path='/dashboardPasajero' component={DashBoardPasajero} exact ></Route>
          <Route path='/dashboardConductor' component={DashBoardConductor} exact ></Route>
          <Route path='/RegistrarUsuario' component={RegistrarUsuario} exact ></Route>
          <Route path='/login' component={Login} exact ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
