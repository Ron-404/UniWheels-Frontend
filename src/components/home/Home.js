import React, { Component } from 'react';
import logo from '../../logo.png';
import './Home.css';

import road from './road.jpg';
import drive from './drive.jpg';
import route from './route.png';
import money from './money.png';
import connect from './connect.png';
import Grid from '@material-ui/core/Grid';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
          <div >
            <section id="home">
              <div id="banner">
                <img id="bannerimg" src={drive} alt="banner uniwheels"/>
                <header>
                  <div>
                  <h1> Uni-Wheels </h1>
                  </div>
                  <div>
                    <img src={logo} id="logito" alt="logo" />
                  </div>
                    <div className="header-right">
                     <a href="/">Login</a>
                     <a href="/">Registro</a>
                     <a href="#about">Acerca</a>
                   </div>
                </header>
                <div id="slogan" className="centered">
                    <p>LA MEJOR FORMA DE LLEGAR A LA UNIVERSIDAD </p>
                </div>
                  </div>
              </section>
              <section id="about">
                <div id="info" className="gridcont">
                   <Grid container spacing={3}>
                     <Grid item xs={6}>
                        <h2> ¿Quienes somos? </h2>
                       <p>Somos una aplicación que te da la oportunidad de llegar a tu casa o a tu universidad fácil y comodamente. Interactuando con miembros de la comunidad universitaria de Bogotá, donde tu decides si quieres ser conductor o ser pasajero.</p>
                     </Grid>
                     <Grid item xs={6} className="cuadro">
                       <img src={road} alt="cuadro uniwheels"/>
                     </Grid>
                 </Grid>
                </div>
              </section>
              <section id="ls">
                  <div id="otros" className="gridcont">
                     <Grid container spacing={3}>
                       <Grid item xs>
                          <h3> Muevete de forma segura y confiable </h3>
                          <p> Tu conductor será un miembro de una universidad de la ciudad. </p>
                          <img src={route} className="valores" alt="container descripcion"/>
                       </Grid>
                       <Grid item xs>
                          <h3> Ahorra Dinero </h3>
                          <p> Pagaras un valor similar al del transporte público. </p>
                            <img src={money} className="valores" alt="banner descripcion ahorro"/>
                       </Grid>
                       <Grid item xs>
                          <h3> Conectate con mas Personas</h3>
                          <p> Podrás conocer a muchas personas de la comunidad universitaria de Bogotá. </p>
                          <img src={connect} className="valores" alt="banner descripcion personas"/>
                       </Grid>
                   </Grid>
                  </div>

              </section>
              <a id="upbutton"  href="/#"> <i className="fa fa-arrow-circle-up"></i></a>

          </div>
        )
    }
}



export default Home;
