import React, { Component } from 'react';
import SockJsClient from 'react-stomp';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2';

import TextField from '@material-ui/core/TextField';

import MapRouting from "./MapRouting";

const userLocalestorage = JSON.parse(localStorage.getItem('user'));

class TripOfferedDriver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userInfo: "",
            trips: [],
            shape: [],
            filterDistrict: ""
        }
        this.handleOfferTrips = this.handleOfferTrips.bind(this);
    }


    async componentDidMount() {
        // sacar info usuario localestorage
        this.setState({ userInfo: userLocalestorage });

        setTimeout(() => {
            try {
                this.sendMessage();
            } catch (e) {
                this.componentDidMount()
            }
        }, 200)

    }

    handleOfferTrips(response,topic){
        if(topic === '/uniwheels/drivers'){
            this.setState({trips : response});
        }
        else{
            //Revisar mensaje del conductor 
            //Si acepta lo dirigimos al componente viaje actual
        }
    }

    handleAll = (e) => {
        this.setState({ [e.target.name]: e.target.value.toLowerCase() })
    }

    //traer viajes actuales
    sendMessage = () => {
        var userLocalestorage = JSON.parse(localStorage.getItem('user'));
        this.clientRef.sendMessage('/wss/offerTravel.' + userLocalestorage.username, JSON.stringify({}));
    }

    filterTrips = (trip) => {
        if (
            trip.direccionInicio[3].toLowerCase().includes(this.state.filterDistrict) ||
            trip.direccionFin[3].toLowerCase().includes(this.state.filterDistrict) ||
            trip.direccionInicio[2].toLowerCase().includes(this.state.filterDistrict) ||
            trip.direccionFin[2].toLowerCase().includes(this.state.filterDistrict)
        ) {
            return true;
        } else {
            return false
        }
    }

    sendRequestTrip = (trip) =>{
        var userLocalestorage = JSON.parse(localStorage.getItem('user'));
        try{
            this.clientRef.sendMessage('/wss/passengerRequest.'+trip.username, JSON.stringify({pasajeroUsername: userLocalestorage.username, direccion: trip.direccionInicio[2]}));
            Swal.fire(
                'Petición enviada!',
                'Espera a que el conductor responda',
                'success'
            )
            //Función que redirige al componente de viaje actual
            this.props.redirectCurrentTrip();
        }catch(error){
            Swal.fire(
                'Error',
                'Error del servidor, no se pudo hacer la petición',
                'warning'
            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.gridContainer} spacing={2}>
                <SockJsClient
                    url='https://uniwheels-backend.herokuapp.com/wss'
                    topics={['/uniwheels/drivers','/uniwheels/passengerRequest']}
                    onConnect={console.log("Connection established!")}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={(response,topic) => this.handleOfferTrips(response,topic)}
                    ref={ (client) => { this.clientRef = client }}
                    debug={true}
                />

                <Grid item xs={12}>
                    <Box m="auto">
                        <div className={classes.Form_root}>
                            <TextField name="filterDistrict" value={this.state.filterDistrict} onChange={this.handleAll} id="outlined-basics" type="text" label="Buscar viaje disponible" variant="outlined" />
                        </div>
                        <Grid container justify="center" spacing={2}>
                            {
                                !(this.state.trips.filter(tri => this.filterTrips(tri)).length > 0) && this.state.trips &&
                                <React.Fragment>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <br/>
                                        No hay viajes relacionados con su busqueda: <strong>{this.state.filterDistrict}</strong>
                                    </Typography>
                                </React.Fragment>

                            }
                            {
                                !(this.state.trips) &&
                                <React.Fragment>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <br/>
                                        No hay viajes disponibles
                                    </Typography>
                                </React.Fragment>

                            }
                            {
                                this.state.trips.filter(tri => this.filterTrips(tri)).map((trip, index) => {
                                    return (
                                        <Grid key={index} item>
                                            {console.log("trips: ", trip)}
                                            <Card className={classes.root}>

                                                <CardHeader
                                                    action={this.renderModalInfoPersona}
                                                    title={
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            <strong>Conductor:</strong> {trip.username}
                                                        </Typography>
                                                    }
                                                />

                                                <CardContent>
                                                    <MapRouting ini={{ lat: trip.direccionInicio[0], lng: trip.direccionInicio[1] }} des={{ lat: trip.direccionFin[0], lng: trip.direccionFin[1] }}/>
                                                    <br />
                                                    <Typography gutterBottom variant="subtitle1" component="h3">
                                                        <strong>Inicio:</strong> {trip.direccionInicio[3]} - {trip.direccionInicio[2]}
                                                        <br />
                                                        <strong>Destino:</strong> {trip.direccionFin[3]} - {trip.direccionFin[2]}
                                                        <br />
                                                        <strong>Precio:</strong> ${trip.precio}
                                                    </Typography>
                                                    <Button className={classes.boton} variant="contained" size="small" onClick={this.sendRequestTrip.bind(this,trip)} >
                                                        Solicitar Ahora
                                            </Button>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                }
                                )}
                        </Grid>
                    </Box>
                </Grid>

            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: "400px",
        marginBottom: "50px",
        backgroundColor: "#FF5733"
    },
    Form_root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    botonSolc: {
        justifyContent: "center",
    },
    boton: {
        color: "#FFFFFF",
        backgroundColor: "#0071EA",
    },
    gridContainer: {
        flexGrow: 1,
    },

});


export default withStyles(styles, { withTheme: true })(TripOfferedDriver);

