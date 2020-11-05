import React from 'react';
import './login.css';
import { withStyles, TextField, MenuItem, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import logo from '../../logo.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    formControl: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(0),
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
});

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loginConfirm: true, user: '', password: '', rol: '', dashboardConductor: false, dashboardPasajero: false, showPassword: false };
    }

    componentWillUnmount() {
        document.body.classList.remove("login")
    }

    handleUserChange = (e) => {
        this.setState({
            user: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleRolChange = (e) => {
        this.setState({
            rol: e.target.value
        });
    };
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleSubmit = async () => {
        const { history } = this.props;
        this.setState({ loginConfirm: false });
        let redirrect = "";
        if (this.state.rol && this.state.user && this.state.password) {
            if (this.state.rol === 'pasajero') {
                redirrect = '/passengerDashboard';
            } else {
                redirrect = '/driverDashboard';
            }
            let rol = this.state.rol;
            await axios.post('https://uniwheels-backend.herokuapp.com/auth/login', {
                username: this.state.user,
                password: this.state.password,
                token: ""
            })
                .then(async function (response) {
                    // console.log(response.data);
                    if (response.status === 200) {
                        await Swal.fire(
                            'Bienvenido ',
                            'Sera redireccionado al dashboard de ' + rol,
                            'success'
                        )
                        // guardar token e username logueado en localestorage
                        var user = response.data;
                        await localStorage.setItem('user', JSON.stringify(user));
                        // redireccionar
                        history.push(redirrect);
                    } else {
                        Swal.fire(
                            'Datos Erroneos',
                            'Verifique los campos',
                            'error'
                        )

                    }

                }).catch(function (error) {
                    console.log(error);
                    Swal.fire(
                        'Campos Erroneos',
                        'Verifique los campos',
                        'error'
                    )
                });
            
        } else {
            Swal.fire(
                'Campos no validos',
                'Verifique los campos',
                'error'
            )
        }
        this.setState({ loginConfirm: true });
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
                            <img src={logo} width="60px" height="60px" margin="auto" alt="Logo" />
                        </div>
                        <h2>Iniciar Sesión</h2>
                        <br></br>
                        <div className="text login">
                            <div>
                                <TextField variant="outlined" id="username" label="Username" type="email"
                                    onChange={this.handleUserChange} fullWidth autoFocus required />
                            </div>
                            <br></br>
                            <div >
                                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput fullWidth label="Password"
                                        id="outlined-adornment-password-login"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        name="password"
                                        autoComplete="off"
                                        onChange={this.handlePasswordChange}

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

                            </div >
                            <br></br>
                            <div>
                                <TextField variant="outlined" id="select" label="Rol" select required fullWidth
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
                                {this.state.loginConfirm ?
                                    <Button color="primary" variant="contained" className="submit" onClick={this.handleSubmit}>
                                        Entrar
                                    </Button>
                                    :
                                    <div><CircularProgress /></div>
                                }
                            </div>
                            <div id="boton-registrar">
                                <HowToRegIcon className={classes.icon} />
                                <Link color="secondary" className={classes.link} aria-current="page"
                                    to={{ pathname: "/RegisterUser" }}>
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
