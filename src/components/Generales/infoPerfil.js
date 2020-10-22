import React, { Component } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ReactStars from "react-rating-stars-component";
import Swal from 'sweetalert2';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import Button from '@material-ui/core/Button';

class InfoPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            edit: false,
            showPassword: false,
            name:'',
            email:'',
            rating:0,
            password:'',
            confirPass:'',
            direction:'',
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirPass = this.handleConfirPass.bind(this);
        this.handleDirection = this.handleDirection.bind(this);
        this.handleSave = this.handleSave.bind(this);
        console.log("infoPerfil");
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleEdit(){
      this.setState({ edit: !this.state.edit });
    }

    handleName(e){
      this.setState({ name: e.target.value});
    }

    handleEmail(e){
      this.setState({ email: e.target.value});
    }

    handleRating(e){
      this.setState({ rating: e.target.value});
    }

    handlePassword(e){
      this.setState({ password: e.target.value});
    }

    handleConfirPass(e){
      this.setState({ confirPass: e.target.value});
    }

    handleDirection(e){
      this.setState({ direction: e.target.value});
    }

    handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    }

    handleSave(){
      var f = "@escuelaing.edu.co";

      if (this.state.email === '' ||
        this.state.user === '' ||
        this.state.university === '' ||
        this.state.address === '' ||
        this.state.confirmPassword === '' ||
        this.state.password === '') {
        Swal.fire("Algún espacio esta vacio", "Por favor llene todos los campos", "error");
      } 
      else if (!this.state.email.includes(f)) {
          Swal.fire("El correo no corresponde con uno institucional.", "Por favor ingrese un correo institucional.", "error");
          return;
      } 
      else if (this.state.password !== this.state.confirmPassword) {
          Swal.fire("Las contraseñas ingresadas no coinciden.", "Por favor ingrese de nuevo las contraseñas.", "error");
          return;
      } 
        else {
          //Conectar con la API updateUser
          //Revisar conexión de RegistrarUsuario
          Swal.fire(
            'Cuenta creada satisfactoriamente!',
            'Sera redireccionado a la pagina de inicio de sesion',
            'success'
          )
      }
    }

    componentDidMount(){
      //Traer info del api getUser
      this.setState({name: "Orlando"});
      this.setState({email: "orlando@escuelaing.edu.co"});
      this.setState({rating: 2});
    }

    render() {
        const {classes} = this.props;
        return (
          <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={this.state.open}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Nombre: </h2>
                {!this.state.edit ? this.state.name : 
                    <TextField variant="outlined" id="name" label="Nombre" type="text"
                        value={this.state.name} onChange={this.handleName} fullWidth autoFocus required />}
  
                <h2 id="transition-modal-description">Correo: </h2>
                  {!this.state.edit ? this.state.email :
                    <TextField variant="outlined" id="email" label="Correo" type="text"
                    value={this.state.email} onChange={this.handleEmail} fullWidth autoFocus required />}
  
                {this.state.edit ? 
                  <div>
                    <h2 id="transition-modal-description">Contraseña: </h2>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                      <OutlinedInput fullWidth label="Password"
                          id="outlined-adornment-password-login"
                          type={this.state.showPassword ? 'text' : 'password'}
                          value={this.state.password}
                          name="password"
                          autoComplete="off"
                          onChange={this.handlePassword}

                          endAdornment={
                              <InputAdornment position="end">
                                  <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={this.handleClickShowPassword}
                                      onMouseDown={this.handleMouseDownPassword}
                                      edge="end"
                                  >
                                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                              </InputAdornment>
                          }
                        />
                      </FormControl>
                    
                    
                    <h2 id="transition-modal-description">Confirmar Contraseña: </h2>
                    
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                      <OutlinedInput fullWidth label="Password"
                            id="outlined-adornment-password-login"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.confirmPassword}
                            name="confirmPass"
                            autoComplete="off"
                            onChange={this.handleConfirPass}

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                      </FormControl>
                    <h2 id="transition-modal-description">Dirección: </h2>
                    
                    <TextField variant="outlined" id="direction" label="Dirección" type="text"
                          onChange={this.handleDirection} fullWidth autoFocus required />
                  </div>
                  : null
                }

                {!this.state.edit ?  
                  <div>
                    <div >
                      <h2 id="transition-modal-calificacion">Calificación: </h2>
                      <ReactStars
                          value={this.state.rating}
                          size={24}
                          color="#AFAFAF"
                          activeColor="#ffd700"
                          edit={false}
                      />
                    </div>
                    <br></br>
                    <Button color="primary" variant="contained"  className="submit" onClick={this.handleEdit}>
                        Editar
                    </Button> 
                  </div> 
                  : 
                    <div>
                      <br></br>
                      <Button color="primary" variant="contained"  className="submit" onClick={this.handleSave}>
                        Guardar
                      </Button> 
                    </div>
                }
                
              </div>
            </Fade>
          </Modal>
        </div>
        )
    }
}

const styles = theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    h3:{
        marginBottom: "-30px",
        marginTop: "-5px"
    },
    margin: {
        margin: theme.spacing(0),
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing(1),
    }
  });


export default withStyles(styles, { withTheme: true })(InfoPerfil);