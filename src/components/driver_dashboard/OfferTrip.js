import React from 'react';
import './OfferTrip.css';
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

const zones = [
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
        stompClient.subscribe("/uniwheels/drivers",function(response){
            let data = response.body;
            console.log("Data: " + data);
        })
    });
    return stompClient;
}

class OfferTrip extends React.Component {

    constructor(props) {
        super(props);
        this.state = { clientConnected: false, messages: [], from: '', to: '', price: 0, loadUniversities: false, universities: [], cars: [],currentCar: "", userInfo: "", route:""};
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCarChange = this.handleCarChange.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
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
        this.setState({ userInfo: userLocalestorage });
        console.log("user :",userLocalestorage);
        // llamar socket
        this.stompClient = socketConnect(userLocalestorage);


        // sacar listas de universities
        await axios.get(`https://uniwheels-backend.herokuapp.com/uniwheels/getUniversidades`,
            {
                headers: {
                    Authorization: userLocalestorage.token //the token is a variable which holds the token
                }
            }
        )
            .then(res => {
                const universities = res.data;
                this.setState({ universities });
                this.setState({ loadUniversities: true });
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


        // sacar listas de cars
        var user = this.state.userInfo;
        console.log(user);
        if( user !== ""){
            const username = user.username;
            await axios.get(`https://uniwheels-backend.herokuapp.com/uniwheels/getCarros/`+username,
            {
                headers: {
                    Authorization: userLocalestorage.token //the token is a variable which holds the token
                }
            }
        )
            .then(res => {
                const cars = res.data;
                this.setState({ cars : cars });
                if(cars.length === 0){
                    alert("Debes registrar un carro para iniciar un viaje");
                }
                    
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
        
    }

    send = () => {  

        if(this.state.to !== "" && this.state.from !== "" && this.state.price !== ""
            && this.state.userInfo !== "" && this.state.currentCar !== "" && this.state.route !== ""){
                console.log("username" + userLocalestorage.username);
            if (this.stompClient != null) {
                this.stompClient.send("/wss/offerTravel."+userLocalestorage.username,{}, JSON.stringify({ route: this.state.route, price: this.state.price , from: this.state.from , to: this.state.to , car: this.state.currentCar }));
                //Mostrar notificación de viaje iniciado
            }
        }
        else{
            Swal.fire(
                'Datos Incorrectos',
                'Error al ingresar los datos, vuelva a intentarlo',
                'error'
            )
        }

    }

    handleFromChange(e) {
        this.setState({
            from: e.target.value
        });
    };

    handleToChange(e) {
        this.setState({
            to: e.target.value
        });
    };

    handlePriceChange(e) {
        this.setState({
            price: e.target.value
        });
    };

    handleCarChange(e){
        this.setState({
            currentCar: e.target.value
        });
    };

    handleRouteChange(e){
        this.setState({
            route: e.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.price < 0 || this.state.from === this.state.to) {
            alert("Los datos ingresados son incorrectos");
        }
        else if(this.state.currentCar === ""){
            alert("Debe seleccionar un carro");
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
                    <iframe id="mapazona" title="zones" src="https://www.google.com/maps/d/embed?mid=1eCm1IraFBJkNpkpOQ-DnlR7ePFC1KbZT" width="640" height="480"></iframe>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <form onSubmit={this.handleSubmit} >
                        <br></br>
                        <h2>Mi viaje</h2>
                        <br></br>
                        <div className="text OfrecerViaje">
                            <div className="text-form-cond OfrecerViaje">
                            <TextField variant="outlined" id="Ruta" label="Nombre de la ruta" type="text"
                                    onChange={this.handleRouteChange} fullWidth autoFocus required />
                            </div>
                            <br></br>
                            {
                                this.state.loadUniversities ?

                                    <div className="text-form-cond OfrecerViaje">
                                        <TextField id="select" label="¿En que universidad estás?" select required fullWidth
                                            onChange={this.handleFromChange}>
                                            {this.state.universities.map((universidad, index) => (<MenuItem key={index} value={universidad.nombre}>{universidad.nombre}</MenuItem>))}
                                        </TextField>
                                    </div>

                                    :

                                    <CircularProgress />
                            }

                            <br></br>

                            {
                                this.state.cars.length > 0 ?

                                    <div className="text-form-cond OfrecerViaje">
                                        <TextField id="select" label="¿Qué carro vas a usar?" select required fullWidth
                                            onChange={this.handleCarChange}>
                                            {this.state.cars.map((car, index) => (<MenuItem key={index} value={car.marca +" "+ car.modelo}>{car.marca +" "+ car.modelo}</MenuItem>))}
                                        </TextField>
                                    </div>

                                    :

                                    <CircularProgress />
                            }



                            <br></br>
                            <div className="text-form-cond OfrecerViaje">
                                <TextField id="otlined-select" label="¿Para donde vás?" select required fullWidth
                                    onChange={this.handleToChange}>
                                    {zones.map((zona) => (<MenuItem value={zona.id}>{zona.name}</MenuItem>))}
                                </TextField>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="text-form-cond">
                                <TextField id="outlined-number" label="Precio" type="number" InputLabelProps={{ shrink: true, }}
                                    variant="outlined" onChange={this.handlePriceChange} fullWidth autoFocus
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

export default withStyles(styles)(OfferTrip);
