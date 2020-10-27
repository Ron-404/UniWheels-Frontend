import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MapRouting from "./MapRouting";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import InfoUsuarios from "../Generales/InfoUsuarios";


var viajes = []

const placesIni = [
    {lat:4.782759,lng: -74.041757},
    {lat:4.730725,lng:-74.034664},
    {lat:4.749564,lng:-74.042032},
]

const placesDes = [
    {lat:4.761791,lng:-74.045695},
    {lat:4.725453,lng:-74.068611},
    {lat:4.749031,lng:-74.095855},
    {lat:4.715535,lng: -74.040589},
    {lat:4.770427,lng: -74.041994},
    {lat:4.682908,lng: -74.080549},
    {lat:4.710511,lng:-74.112041},
    {lat:4.619751,lng:-74.067846},
    {lat:4.678589,lng:-74.143212},
    {lat:4.656140,lng:-74.101287},
    {lat:4.622150,lng:-74.137102},
    {lat:4.615749,lng:-74.160834},
    {lat:4.578822,lng: -74.131480},
    {lat:4.863296,lng:-74.053489},
    {lat:4.956239,lng:-74.010661},
    {lat:4.798722,lng:-74.071049}
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
        stompClient.subscribe("/uniwheels/conductores",function(response){
            let data=response.body;
            console.log("connected to: " + data);
            viajes = data;
            console.log("vaijes" + viajes);
        })
    });
    return stompClient;
}

class ViajesOfrecidosConductores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            shape: []
        }
    }

    async componentDidMount(){
         // sacar info usuario localestorage
         var userLocalestorage = await JSON.parse(localStorage.getItem('user'));
         this.setState({ userInfo: userLocalestorage })

        // llamar socket
        this.stompClient = socketConnect(userLocalestorage);

        //Send inicial para traer los viajes que ya están 
        if (this.stompClient != null) {
            //this.stompClient.send("/wss/ofrecerViaje/" + userLocalestorage.username, {}, JSON.stringify({ ruta: "", precio: "" , origen: "" , destino: "", carro: "" }));
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.gridContainer} spacing={2}>

                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {viajes.map((viaje, index) => {
                            return (
                                <Grid key={index} item>
                                    <Card className={classes.root}>
                                    
                                        <CardHeader
                                            action = {this.renderModalInfoPersona}
                                            title={
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Conductor: <InfoUsuarios user={viaje.conductor}/>
                                                </Typography>
                                            }
                                        />
                                    
                                        <CardContent>

                                            <MapRouting ini ={placesIni[0]} des={placesDes[index]}/>

                                            <Typography gutterBottom variant="h5" component="h2">
                                                inicio: {viaje.viaje.inicio}
                                                <br />
                                                    destino: {viaje.viaje.destino}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {viaje.dueDate}
                                            </Typography>

                                            <Button className={classes.boton} variant="contained" size="small" >
                                                Solicitar Ahora
                                            </Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        width: 300,
        height: 470,
        marginBottom: "50px",
        backgroundColor: "#FF5733"
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


export default withStyles(styles, { withTheme: true })(ViajesOfrecidosConductores);

