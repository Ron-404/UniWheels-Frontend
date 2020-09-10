import React, { Component } from 'react';
import {Avatar,Button,CssBaseline,FormControl,Input,InputLabel,Paper,Typography} from '@material-ui/core/';
import LockIcon from '@material-ui/icons/LockOutlined';
import './Registrar.css'

class RegistrarUsuario extends Component {
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
    document.body.classList.add('registrar');
    return (
      <React.Fragment >
        <CssBaseline />
        <div className="layout registrar">
          <Paper className="paper registrar">
            <Avatar className="avatar registrar">
              <LockIcon />
            </Avatar>
            <Typography variant="h4">CREA TU CUENTA</Typography>
            <form className="form registrar" onSubmit={this.handleSubmit} >
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
              <Button  onClick={this.onSubmit} fullWidth variant="contained" color="primary" className="submit registrar">
                Registrar
              </Button>
            </form>
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  onSubmit = () =>{
    const { history } = this.props;
    history.push('/login');
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
  handleSubmit(e) {
    var f = "@escuelaing.edu.co";
    e.preventDefault();
    if(!this.state.email.includes(f)){
      alert("El correo no corresponde con uno institucional");
      return;
    }else if(this.state.password !== this.state.confirmPassword){
      alert("Las contraseñas ingresadas no coinciden.");
      return;
    }else{
      return;
    }
  }
}
export default RegistrarUsuario;
