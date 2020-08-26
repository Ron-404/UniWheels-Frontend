import React, { Component } from 'react';
import logo from '../../logo.png';
import './Home.css';
import bannerimg from './banner.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
          <div >

            <div id="banner">

              <img id="bannerimg" src={bannerimg}/>
              <header>
                <div>
                <h1> Uni-Wheels </h1>
                </div>
                <div>
                  <img src={logo} id="logito" alt="logo" />
                </div>
                    <div className="header-right">
                     <a href="/">Inicio</a>
                     <a href="#contact">Contacto</a>
                     <a href="#about">Acerca</a>
                   </div>
              </header>
              <div id="acerca" className="centered">
                  <p>LA MEJOR FORMA DE LLEGAR A LA UNIVERSIDAD </p>
              </div>
            </div>



          </div>
        )
    }
}



export default Home;
