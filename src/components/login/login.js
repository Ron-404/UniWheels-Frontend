import React from 'react';
import './login.css';
import {  withStyles,TextField, MenuItem, Button, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import logo from '../../logo.png';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      link: {
          width: 20,
          color: '#3f51b5',
      },
      icon: {
        marginRight: theme.spacing(0.5),
        width: 45,
        height: 45,
        color: '#3f51b5',
      },
});

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {user:'',password:'',rol:'',dashboardConductor: false, dashboardPasajero: false};
    }

    componentWillUnmount(){
        document.body.classList.remove("login")
    }

    handleUserChange = (e) =>{
        this.setState({
            user: e.target.value
        });
    };

    handlePasswordChange = (e)=>{
        this.setState({
            password: e.target.value
        });
    };

    handleRolChange = (e)=>{
        this.setState({
            rol: e.target.value
        });
    };

    handleSubmit = ()=>{
        const { history } = this.props;
        if(this.state.rol === 'pasajero'){
            history.push('/dashboardPasajero');
                
        }
        else{
            history.push('/dashboardConductor');
        }
    };

    render() {
        const { classes } = this.props;
        document.body.classList.add('login');
        return (
            <div className="fondo login">
                 <div>
                    <form className="form login" >
                        <br></br>
                        <div>
                            <img src={logo} width="60px" height="60px" margin="auto" alt="Logo"/>
                        </div>
                        <h2>Iniciar Sesión</h2>
                        <br></br>
                        <div className="text login">
                            <div>
                                <TextField  id="username" label="Username" type="email"
                                    onChange={this.handleUserChange} fullWidth autoFocus required />
                            </div>
                            <br></br>
                            <div >
                                <TextField id="username" label="Password" type="password"
                                    onChange={this.handlePasswordChange} fullWidth required />
                            </div >
                            <br></br>
                            <div>
                                <TextField id="select" label="Rol" select required fullWidth
                                    onChange={this.handleRolChange}>
                                    <MenuItem value="pasajero">Pasajero</MenuItem>
                                    <MenuItem value="conductor">Conductor</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Grid>
                            <div>
                            <Button color="primary" variant="contained"  className="submit" onClick={this.handleSubmit}>
                                Entrar
                            </Button>
                            </div>
                            <div id="boton-registrar">
                                <HowToRegIcon className={classes.icon}/>
                                <Link color="secondary" className={classes.link} aria-current="page"
                                    to={{pathname: "/RegistrarUsuario"}}>
                                    Registrate
                                </Link>
                            </div>
                        </Grid>
                        <br></br>
                        <br></br>
                    </form>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(Login);
