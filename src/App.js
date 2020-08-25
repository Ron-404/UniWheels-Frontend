import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashBoardPasajero from './components/dashboard_pasajero/DashBoardPasajero';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact ></Route>
          <Route path='/dashBoardPasajero' component={DashBoardPasajero} exact ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
