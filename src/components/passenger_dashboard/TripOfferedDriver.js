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

import MapRouting from "./MapRouting";

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
        var userLocalestorage = JSON.parse(localStorage.getItem('user'));
        this.clientRef.sendMessage('/wss/offerTravel.'+userLocalestorage.username, JSON.stringify({}));
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
                <Box m="auto">
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
                    </Box>
                </Grid>
               
            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        width:"100%",
        maxWidth: "400px",
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

