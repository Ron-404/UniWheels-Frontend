import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashBoardPasajero from './components/dashboard_pasajero/DashBoardPasajero';
import DashBoardConductor from './components/dashboard_conductor/DashBoardConductor';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact ></Route>
          <Route path='/dashboardPasajero' component={DashBoardPasajero} exact ></Route>
          <Route path='/dashboardConductor' component={DashBoardConductor} exact ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
