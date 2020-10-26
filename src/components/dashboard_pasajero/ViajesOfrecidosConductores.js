import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MapRouting from "./MapRouting";

import InfoUsuarios from "../Generales/InfoUsuarios";

const viajes = [
    { viaje: { inicio: "eci", destino: "prado" }, conductor: { name: "Santiago Carrillo", email: "sancarbar@gmail", rating: 4 }, dueDate: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() },
    { viaje: { inicio: "eci", destino: "prado" }, conductor: { name: "Andres Vasquez", email: "sancarbar@gmail", rating: 3 }, dueDate: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() },
    { viaje: { inicio: "eci", destino: "prado" }, conductor: { name: "Juanito equisde", email: "sancarbar@gmail", rating: 1 }, dueDate: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() },
]
const placesIni = [
    {lat:4.782659,lng:-74.041970},
    {lat:4.782659,lng:-74.041970},
    {lat:4.782659,lng:-74.041970},
]

const placesDes = [
    {lat:4.730125,lng:-74.068478},
    {lat:4.730725,lng:-74.034664},
    {lat:4.749564,lng:-74.042032},
]

class ViajesOfrecidosConductores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            shape: []
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

                                            <MapRouting ini ={placesIni[index]} des={placesDes[index]}/>

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

