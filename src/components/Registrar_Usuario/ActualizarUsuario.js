import React, { Component } from 'react';
import {Avatar,Button,CssBaseline,FormControl,Input,InputLabel,Paper,Typography} from '@material-ui/core/';
import LockIcon from '@material-ui/icons/LockOutlined';
import './Registrar.css'
import Swal from 'sweetalert2';
import axios from 'axios';

class ActualizarUsuario extends Component {
  constructor(props){
    super(props);
    this.state={user:'', email:'', university:'', address:'', password:'', confirmPassword:''}
    this.handleUser = this.handleUser.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUniversity = this.handleUniversity.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    document.body.classList.add('actualizar');
    return (
      <React.Fragment >
        <CssBaseline />
        <div className="layout registrar">
          <Paper className="paper registrar">
            <Avatar className="avatar registrar">
              <LockIcon />
            </Avatar>
            <Typography variant="h4">ACTUALIZA TUS DATOS</Typography>
            <form className="form registrar" >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="User">Usuario</InputLabel>
                <Input id="user" name="user" onChange={this.handleUser} autoComplete="user" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Correo</InputLabel>
                <Input id="email" name="email" onChange={this.handleEmail} autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="User">Universidad</InputLabel>
                <Input id="university" name="university" onChange={this.handleUniversity} autoComplete="university" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="address">Dirección</InputLabel>
                <Input name="address" id="address" onChange={this.handleAddress} autoComplete="current-password"/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input name="password" type="password" id="password" onChange={this.handlePassword} autoComplete="current-password"/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confimar Contraseña</InputLabel>
                <Input name="confirmPassword" type="password" id="confirmPassword" onChange={this.handleConfirmPassword} autoComplete="current-password"/>
              </FormControl>
              <Button  onClick={this.handleSubmit} fullWidth variant="contained" color="primary" className="submit registrar">
                Actualizar
              </Button>
            </form>
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  handleUser(e) {
    this.setState({
      user: e.target.value
    });
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleUniversity(e) {
    this.setState({
      university: e.target.value
    });
  }
  handleAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }
  async handleSubmit(e) {
    const { history } = this.props;
    var f = "@escuelaing.edu.co";
    console.log(this.state.email);
    e.preventDefault();
    if(this.state.email === '' ||
            this.state.user === '' ||
            this.state.university === '' ||
            this.state.address === '' ||
            this.state.confirmPassword === '' ||
            this.state.password === ''){
      Swal.fire("Algún espacio esta vacio", "Por favor llene todos los campos", "error");
    }else if(!this.state.email.includes(f)){
      Swal.fire("El correo no corresponde con uno institucional.", "Por favor ingrese un correo institucional.", "error");
      return;
    }else if(this.state.password !== this.state.confirmPassword){
      Swal.fire("Las contraseñas ingresadas no coinciden.", "Por favor ingrese de nuevo las contraseñas.", "error");
      return;
    }else{

        /**
         * let res = await axios.post('https://uniwheels-backend.herokuapp.com/auth/addUser', {
                        username : this.state.user,
                        nombreCompleto : this.state.user,
                        email :  this.state.email,
                        universidad : this.state.university,
                        password : this.state.password,
                        direccionResidencia : this.state.address,
                        numero : '',
                        carros : [],
                        viajesConductor : [],
                        viajesPasajero : []
                      },
                      )
                      .then(function (response) {
                        console.log(response.status);
                        console.log(response.data);
                          if(response.status===200){
                            Swal.fire(
                                'Cuenta creada satisfactoriamente!',
                                'Sera redireccionado a la pagina de inicio de sesion',
                                'success'
                            )
                            
                            history.push('/login');
                          }else{
                            Swal.fire("Signup failed!", "try again later", "error");
                          }
                        
                      })
                      .catch(function (error) {
                        console.log(error);
                        console.log(res)
                      });
         */
        document.location.href="/login";
      return;
    }
  }
}
export default ActualizarUsuario;