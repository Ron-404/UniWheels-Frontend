import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Star from '@material-ui/icons/Star';
import Divider from '@material-ui/core/Divider';
import ReactStars from "react-rating-stars-component";

import MapaViajeInicioDestino from "./MapaViajeInicioDestino";

import InfoUsuarios from "../../Generales/InfoUsuarios";

class ModalViajeConductor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            shape: []
        }
    }

    render() {
        const { classes } = this.props;
        const viaje = {

            viajeCurso: { inicio: "eci", destino: "prado", estado: "en curso" },
            conductor: { name: "Santiago Carrillo", email: "sancarbar@gmail", rating: 4 },
            dueDate: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
            pasajeros:
                [
                    { name: "andres Vasquez", email: "avasquez@gmail", rating: 4 },
                    { name: "pasajero prueba", email: "prueba@gmail", rating: 3 },
                ]

        };
        return (
            <Grid container className={classes.gridContainer} spacing={2}>

                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>

                        <Grid item>
                            <Card className={classes.root}>

                                <CardHeader
                                    action={this.renderModalInfoPersona}
                                    title={
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Conductor: <InfoUsuarios user={viaje.conductor} />
                                            <br />
                                            Estado: En curso
                                        </Typography>
                                    }
                                />

                                <CardContent>
                                    <div>
                                        <MapaViajeInicioDestino />
                                    </div>
                                    

                                    <Typography gutterBottom variant="h5" component="h2">
                                        inicio: {viaje.viajeCurso.inicio}
                                        <br />
                                                    destino: {viaje.viajeCurso.destino}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {viaje.dueDate}
                                    </Typography>


                                </CardContent>

                                <CardActions className={classes.botonSolc}>
                                    <Button className={classes.boton} variant="contained" size="small" >
                                        Finalizar Viaje
                                        </Button>
                                </CardActions>

                                <div className={classes.demo}>
                                    <Typography variant="h5" color="textPrimary" component="p">
                                        Pasajeros:
                                    </Typography>
                                    <List>
                                        {viaje.pasajeros.map((pasajero, index) => {
                                            return (
                                                <div>
                                                    <Divider />
                                                    <ListItem key={index}>

                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <AccountCircle />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={pasajero.name}
                                                            secondary={
                                                                <ReactStars
                                                                    value={pasajero.rating}
                                                                    size={24}
                                                                    color="#AFAFAF"
                                                                    activeColor="#ffd700"
                                                                    edit={false}
                                                                />
                                                            }

                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="delete">
                                                                <Star />
                                                                <Typography variant="h5" color="textPrimary" component="p">
                                                                    Calificar
                                            </Typography>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>

                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            )
                                        })}
                                    </List>

                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}



const styles = theme => ({
    root: {
        width: "400px",
        height: "100%",
        marginBottom: "50px",
        backgroundColor: "#E0E3E5"
    },
    demo: {
        backgroundColor: "#FF5733",
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


export default withStyles(styles, { withTheme: true })(ModalViajeConductor);