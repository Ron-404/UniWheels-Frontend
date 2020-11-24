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

import TravelMap from "./TravelMap";

import UsersInfo from "../../General/UsersInfo";

import { Box } from '@material-ui/core';

import Swal from 'sweetalert2';
import axios from 'axios';

class DriverTripModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            width: window.innerWidth,
            currentTrip: [],
        }
    }
    // resize box
    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };

    async componentDidMount() {
        // resize box
        window.addEventListener('resize', this.updateDimensions);
        window.onresize = this.updateDimensions;
        // sacar info usuario localestorage
        var userLocalestorage = await JSON.parse(localStorage.getItem('user'));
        this.setState({ userInfo: userLocalestorage })
        // sacar listas de carros
        await axios.get(`https://uniwheels-backend.herokuapp.com/uniwheels/travel/driver/` + userLocalestorage.username,
            {
                headers: {
                    Authorization: userLocalestorage.token //the token is a variable which holds the token
                }
            }
        )
            .then(res => {
                const currentTrip = [res.data];
                console.log("currentTrip: ", currentTrip)
                this.setState({ currentTrip });
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
    // resize box
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
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
            <Box m="auto">
                <Grid container className={classes.gridContainer} spacing={2}>

                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {
                                (this.state.currentTrip[0]) ?
                                <Grid item>
                                    <Card style={{
                                        width: this.state.width - 70,
                                        height: "100%",
                                        marginBottom: "50px",
                                        backgroundColor: "#E0E3E5"
                                    }}>

                                        <CardHeader
                                            action={this.renderModalInfoPersona}
                                            title={
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    <strong>Conductor:</strong> <UsersInfo user={viaje.conductor} />
                                                    <br />
                                                    <strong>Estado:</strong> {this.state.currentTrip[0].estado}
                                        </Typography>
                                            }
                                        />

                                        <CardContent>

                                            <TravelMap ini={{ lat: this.state.currentTrip[0].direccionInicio[0], lng: this.state.currentTrip[0].direccionInicio[1] }} des={{ lat: this.state.currentTrip[0].direccionFin[0], lng: this.state.currentTrip[0].direccionFin[1] }} />
                                                    <br />
                                                    <Typography gutterBottom variant="subtitle1" component="h3">
                                                        <strong>Inicio:</strong> {this.state.currentTrip[0].direccionInicio[3]} - {this.state.currentTrip[0].direccionInicio[2]}
                                                        <br />
                                                        <strong>Destino:</strong> {this.state.currentTrip[0].direccionFin[3]} - {this.state.currentTrip[0].direccionFin[2]}
                                                        <br />
                                                        <strong>Precio:</strong> ${this.state.currentTrip[0].precio}
                                            </Typography>


                                        </CardContent>

                                        <CardActions className={classes.botonSolc}>
                                            <Button className={classes.boton} variant="contained" size="small" >
                                                Finalizar Viaje
                                        </Button>
                                        </CardActions>

                                        <div className={classes.demo}>
                                            <Typography variant="h5" color="textPrimary" component="span">
                                                Pasajeros:
                                    </Typography>
                                            <List>
                                                {viaje.pasajeros.map((pasajero, index) => {
                                                    return (
                                                        <Box m="auto" key={index}>
                                                            <Divider />
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <AccountCircle />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={pasajero.name}
                                                                    secondary={
                                                                        <span>
                                                                            <ReactStars
                                                                                value={pasajero.rating}
                                                                                size={24}
                                                                                color="#AFAFAF"
                                                                                activeColor="#ffd700"
                                                                                edit={false}
                                                                            />
                                                                        </span>
                                                                    }

                                                                />
                                                                <ListItemSecondaryAction>
                                                                    <IconButton edge="end" aria-label="delete">
                                                                        <Star />
                                                                        <Typography variant="h5" color="textPrimary" component="span">
                                                                            Calificar
                                                                        </Typography>
                                                                    </IconButton>
                                                                </ListItemSecondaryAction>

                                                            </ListItem>
                                                            <Divider />
                                                        </Box>
                                                    )
                                                })}
                                            </List>

                                        </div>
                                    </Card>
                                </Grid>

                                :
                                <React.Fragment>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <br/>
                                        Actualmente no tiene un viaje en proceso
                                    </Typography>
                                </React.Fragment>
                            }


                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}



var styles = theme => (
    {
        root: {

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


export default withStyles(styles, { withTheme: true })(DriverTripModal);