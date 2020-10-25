import React from 'react';
import './OfrecerViaje.css';
import {
    withStyles,
    TextField,
    MenuItem,
    Button,
    Grid,
    CircularProgress,
} from '@material-ui/core';

import Swal from 'sweetalert2';
import axios from 'axios';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 25,
        height: 25,
    },
});

const zonas = [
    { id: "1", name: "1 Salidas Norte de Bogotá" },
    { id: "2", name: "2 Suba Occidental" },
    { id: "3", name: "3 Suba Oriental" },
    { id: "4", name: "4 Usaquén Central" },
    { id: "5", name: "5 Inicio Autopista Norte Oriental" },
    { id: "6", name: "6 Calle 80 - Av 68" },
    { id: "7", name: "7 Engativá" },
    { id: "8", name: "8 Centro" },
    { id: "9", name: "9 Fontibon" },
    { id: "10", name: "10 Salitre - Teusaquillo" },
    { id: "11", name: "11 Kennedy" },
    { id: "12", name: "12 Bosa" },
    { id: "13", name: "13 San Cristobal - Ciudad Bolivar" },
    { id: "14", name: "14 Chía y alrededores" },
    { id: "15", name: "15 Cajicá y Alrededores" },
    { id: "16", name: "16 Cota y Alrededores" }
]
const userLocalestorage = JSON.parse(localStorage.getItem('user'));
var stompClient;

function socketConnect(user) {
    console.log("Connecting to WebSocket... ");
    let socket = new SockJS("https://uniwheels-backend.herokuapp.com/wss");
    stompClient = Stomp.over(socket);
    const header = { Authorization: user.token };
    stompClient.connect(header, function (frame) {
        console.log("connected to: " + frame);
    });
    return stompClient;
}

class OfrecerViaje extends React.Component {

    constructor(props) {
        super(props);
        this.state = { clientConnected: false, messages: [], origen: '', destino: '', precio: 0, cargaUniversidades: false, universidades: [], userInfo: "" };
        this.handleOrigenChange = this.handleOrigenChange.bind(this);
        this.handleDestinoChange = this.handleDestinoChange.bind(this);
        this.handlePrecioChange = this.handlePrecioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stompClient = null;
    }

    // HACK delete styles
    componentWillUnmount() {
        document.body.classList.remove("OfrecerViaje");
    }
    async componentDidMount() {
        // sacar info usuario localestorage
        var userLocalestorage = await JSON.parse(localStorage.getItem('user'));
        this.setState({ userInfo: userLocalestorage })

        // llamar socket
        this.stompClient = socketConnect(userLocalestorage);


        // sacar listas de universidades
        await axios.get(`https://uniwheels-backend.herokuapp.com/uniwheels/getUniversidades`,
            {
                headers: {
                    Authorization: userLocalestorage.token //the token is a variable which holds the token
                }
            }
        )
            .then(res => {
                const universidades = res.data;
                this.setState({ universidades });
                this.setState({ cargaUniversidades: true });
            })
            .catch(async function () {
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
            });
    }

    send = () => {
        if (this.stompClient != null) {
            this.stompClient.send("/wss/ofrecerViaje/" + userLocalestorage.username, {}, JSON.stringify({ ruta: "pa la casita", precio: "10000", origen: "Chico", destino: "Kennedy", carro: "ABC123" }));
        }
    }

    handleOrigenChange(e) {
        this.setState({
            origen: e.target.value
        });
    };

    handleDestinoChange(e) {
        this.setState({
            destino: e.target.value
        });
    };

    handlePrecioChange(e) {
        this.setState({
            precio: e.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.precio < 0 || this.state.origen === this.state.destino) {
            alert("Los datos ingresados son incorrectos");
        }
        else {
            alert("Viaje iniciado");
        }
    };

    render() {
        document.body.classList.add('OfrecerViaje');
        return (
            <Grid container>

                {/* prueba de coneccion de socket */}


                {this.state.clientConnected && console.log("connect: ", this.state.clientConnected)}

                <Grid item xs={12} sm={6} id="zonamapa">
                    <iframe id="mapazona" title="zonas" src="https://www.google.com/maps/d/embed?mid=1eCm1IraFBJkNpkpOQ-DnlR7ePFC1KbZT" width="640" height="480"></iframe>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <form onSubmit={this.handleSubmit} >
                        <br></br>
                        <h2>Mi viaje</h2>
                        <br></br>
                        <div className="text OfrecerViaje">
                            {
                                this.state.cargaUniversidades ?

                                    <div className="text-form-cond OfrecerViaje">
                                        <TextField id="select" label="¿En que universidad estás?" select required fullWidth
                                            onChange={this.handleOrigenChange}>
                                            {this.state.universidades.map((universidad, index) => (<MenuItem key={index} value={universidad.nombre}>{universidad.nombre}</MenuItem>))}
                                        </TextField>
                                    </div>

                                    :

                                    <CircularProgress />
                            }
                            <br></br>
                            <div className="text-form-cond OfrecerViaje">
                                <TextField id="otlined-select" label="¿Para donde vás?" select required fullWidth
                                    onChange={this.handleDestinoChange}>
                                    {zonas.map((zona) => (<MenuItem value={zona.id}>{zona.name}</MenuItem>))}
                                </TextField>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="text-form-cond">
                                <TextField id="outlined-number" label="Precio" type="number" InputLabelProps={{ shrink: true, }}
                                    variant="outlined" onChange={this.handlePrecioChange} fullWidth autoFocus
                                    required />
                            </div>
                            <br></br>
                        </div>
                        <div>
                            <Button onClick={this.send} color="primary" variant="contained" className="submit">
                                Iniciar
                            </Button>
                        </div>
                        <br></br>
                        <br></br>
                    </form>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(OfrecerViaje);
