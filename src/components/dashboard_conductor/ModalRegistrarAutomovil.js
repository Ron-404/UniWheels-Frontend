import React, { Component } from 'react';
import car from './car.png';
import './ModalRegistrarAutomovil.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ModalRegistrarAutomovil extends Component {

      constructor(props) {
        super(props);
        this.state={'marca':'','modelo':'' ,'color':'',
                  marcas:
                  [{marca:'Ford'},
                  {marca:'Nissan'}],
                  modelos:[
                    {modelo:'Focus'},
                    {modelo:'Versa'}
                  ],colores:['blanco','negro','azul','rojo','amarillo','verde','naranja','morado']

                };



        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
      }

      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }


        handleSubmit(e) {

      }

      render() {
        return ( < div >
              <h1> Registra Tu Automovil </h1>
              <img src={car} className='Rautomovil' alt="imagen-auto"/>
              <p>
              <p>
              <FormControl variant="filled" >
                  <TextField id="standard-basic" label="Placa" />
              </FormControl>
              </p>
              <FormControl variant="filled" >
                <InputLabel htmlFor="m">Marca</InputLabel>
                <Select
                  native
                  value={this.state.marca}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'marca',
                    id: 'm',
                  }}
                >
                  <option aria-label="None" value="" />
                 { this.state.marcas.map((option) => <option key={option.marca} >{option.marca}</option>) }
                </Select>
              </FormControl>
              </p>

              <p>
              <FormControl variant="filled" >
                <InputLabel htmlFor="mo">Modelo</InputLabel>
                <Select
                  native
                  value={this.state.modelo}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'modelo',
                    id: 'mo',
                  }}
                >
                  <option aria-label="None" value="" />
                   { this.state.modelos.map((option) => <option key={option.modelo} >{option.modelo}</option>) }
                </Select>
              </FormControl>
              </p>

              <p>
              <FormControl variant="filled" >
                <InputLabel htmlFor="co">Color</InputLabel>
                <Select
                  native
                  value={this.state.color}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'color',
                    id: 'co',
                  }}
                >
                  <option aria-label="None" value="" />
                   { this.state.colores.map((color) => <option key={color} >{color}</option>) }
                </Select>
              </FormControl>
              </p>

              <Button onClick={() => { alert('Registro !') }} variant="outlined" color="primary">
                Registrar
              </Button>


          </div>)
        };


  }

export default ModalRegistrarAutomovil;
