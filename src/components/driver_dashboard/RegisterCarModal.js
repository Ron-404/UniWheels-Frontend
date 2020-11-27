import React, { Component } from 'react';
import './RegisterCarModal.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Swal from 'sweetalert2';
import Car from "./CarImage"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';

class RegisterCarModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadbrands: true,
      registerCar: true,
      'marca': '', 'modelo': '', 'color': '', 'placa': '',
      brands:
        [{ brand: 'Ford' },
        { brand: 'Nissan' }],
      modelos: [
        { modelo: 'Focus' },
        { modelo: 'Versa' }
      ], colores: [
        { color: 'blanco', id: "#AAAAAA" },
        { color: 'negro', id: "#000000" },
        { color: 'azul', id: "#0032FF" },
        { color: 'rojo', id: "#FF0000" },
        { color: 'amarillo', id: "#FFFF00" },
        { color: 'verde', id: "#008000" },
        { color: 'naranja', id: "#FF4500" },
        { color: 'morado', id: "#800080" }]

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // sacar brands de carros
    await axios.get(`https://the-vehicles-api.herokuapp.com/brands/`)
      .then(res => {
        const brands = res.data;
        this.setState({ brands });
        this.setState({ loadbrands: false });
      })
  }

  handleClickShowModels = async (id) => {
    await axios.get(`https://the-vehicles-api.herokuapp.com/models?brandId=` + id)
      .then(res => {
        const modelos = res.data;
        this.setState({ modelos });
      })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "marca") {
      this.handleClickShowModels(e.target.value.id) // enviar id para traer los modelos de ese id
    }
  }


  async handleSubmit() {
    this.setState({ registerCar: false });
    // falta hacer validaciones de campos vacios
    if (!(this.state.placa &&
      this.state.marca.brand &&
      this.state.color.color &&
      this.state.modelo.model)) {
      await Swal.fire(
        'Hay Campos Vacios ',
        'Llene todos los campos por favor ',
        'error'
      )
      this.setState({ registerCar: true });
    } else {
      // sacar user token y username de localEstorage
      var userInfo = JSON.parse(localStorage.getItem('user'));
      // hacer el post
      await axios.post(`https://uniwheels-backend.herokuapp.com/uniwheels/cars/add/` + userInfo.username,
        {
          placa: this.state.placa,
          marca: this.state.marca.brand,
          color: this.state.color.color,
          modelo: this.state.modelo.model
        },
        {
          headers: {
            Authorization: userInfo.token //the token is a variable which holds the token
          }
        }
      )
        .then(res => {
          if (res.status === 201) {
            Swal.fire(
              'Registro Exitoso',
              'su carro ha sido registrado exitosamente',
              'success'
            )
            this.setState({ registerCar: true });
          } else {
            Swal.fire(
              'Registro Fallido',
              'error del servidor, vuelva a registrarlo',
              'error'
            )
            this.setState({ registerCar: true });
          }
        }).catch(async function () {
          // aqui entra cuando el token es erroneo, toca pedirle que vuelva a loguearse
          await Swal.fire(
            'Sesion Finalizada',
            'Vuelva a loguearse',
            'error'
          )
          //clear local estorage
          localStorage.clear();
          // redireccionar a login
          window.location.replace("/login")

        })
    }

  }

  render() {

    return (
      <Box m="auto">
        <Box m="auto">
          <Typography color='initial' variant="h2">
            <strong>Registra Tu Automovil</strong>
          </Typography>
        </Box>
        <Grid>
          <Car color={this.state.color.id} />
        </Grid>

        <p>
          <p>
            <FormControl variant="filled" >
              <TextField
                id="standard-basic"
                label="Placa"
                name="placa"
                value={this.state.placa}
                onChange={this.handleChange}
              />
            </FormControl>
          </p>
          <FormControl variant="filled" >
            {this.state.loadbrands
              ?
              <div >
                <CircularProgress />
              </div>
              :
              <React.Fragment>
                <InputLabel htmlFor="m">Marca</InputLabel>
                <Select
                  value={this.state.marca}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'marca',
                    id: 'm',
                  }}
                >
                  {this.state.brands.map((option) => <MenuItem key={option.id} value={option}>{option.brand}</MenuItem>)}

                </Select>
              </React.Fragment>
            }
          </FormControl>
        </p>

        <p>
          <FormControl variant="filled" >
            <InputLabel htmlFor="mo">Modelo</InputLabel>
            <Select
              value={this.state.modelo}
              onChange={this.handleChange}
              inputProps={{
                name: 'modelo',
                id: 'mo',
              }}
            >
              {this.state.modelos.map((option) => <MenuItem key={option.id} value={option}>{option.model}</MenuItem>)}
            </Select>
          </FormControl>
        </p>

        <p>
          <FormControl variant="filled" >
            <InputLabel htmlFor="co">Color</InputLabel>
            <Select
              value={this.state.color}
              onChange={this.handleChange}
              inputProps={{
                name: 'color',
                id: 'co',
              }}
            >
              {this.state.colores.map((option) => <MenuItem key={option.color} value={option}>{option.color}</MenuItem>)}
            </Select>
          </FormControl>
        </p>

        {this.state.registerCar ?
          <Button onClick={() => { this.handleSubmit() }} variant="outlined" color="primary">
            Registrar
          </Button>
          :
          <div >
            <CircularProgress />
          </div>
        }


      </Box>)
  };


}

export default RegisterCarModal;
