import React, { Component } from 'react';
import SockJsClient from 'react-stomp'; 

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MapRouting from "./MapRouting";

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

class TripOfferedDriver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userInfo: "",
            trips: [],
            shape: []
        }
        this.handleOfferTrips = this.handleOfferTrips.bind(this);
    }


    async componentDidMount(){
        // sacar info usuario localestorage
        this.setState({ userInfo: userLocalestorage });

        setTimeout( () =>{
            try {
                this.sendMessage();
            } catch (e) {
                this.componentDidMount()
            }
          }, 200)

    }

    handleOfferTrips(response){
        console.log("response " + response);
        this.setState({trips : response});
    }
    
    //traer viajes actuales
    sendMessage = () => {
        this.clientRef.sendMessage('/wss/offerTravel.prueba', JSON.stringify({}));
    }
      
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.gridContainer} spacing={2}>
                <SockJsClient
                    url='https://uniwheels-backend.herokuapp.com/wss'
                    topics={['/uniwheels/drivers']}
                    onConnect={console.log("Connection established!")}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={(response) => this.handleOfferTrips(response)}
                    ref={ (client) => { this.clientRef = client }}
                    debug={true}
                />
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        { 
                            this.state.trips.map((trip, index) => {
                            return (
                                <Grid key={index} item>
                                    {console.log("trips: ",trip)}
                                    <Card className={classes.root}>
                                    
                                        <CardHeader
                                            action = {this.renderModalInfoPersona}
                                            title={
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Conductor: {trip.username}
                                                </Typography>
                                            }
                                        />
                                        
                                        <CardContent>
                                            <MapRouting ini ={{lat:trip.direccionInicio[0],lng: trip.direccionInicio[1]}} des={{lat:trip.direccionFin[0],lng: trip.direccionFin[1]}}/>
                                            <br />
                                            <Typography gutterBottom variant="h8" component="h3">
                                                Inicio: {trip.direccionInicio[3]} - {trip.direccionInicio[2]} 
                                                <br />
                                                Destino: {trip.direccionFin[3]} - {trip.direccionFin[2]} 
                                                <br />
                                                Precio: ${trip.precio}
                                            </Typography>
                                            <Button className={classes.boton} variant="contained" size="small" >
                                                Solicitar Ahora
                                            </Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        }                         
                        )}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        width: 300,
        height: 480,
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


export default withStyles(styles, { withTheme: true })(TripOfferedDriver);

