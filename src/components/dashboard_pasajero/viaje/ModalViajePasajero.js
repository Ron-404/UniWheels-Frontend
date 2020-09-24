import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Star from '@material-ui/icons/Star';
import Divider from '@material-ui/core/Divider';
import ReactStars from "react-rating-stars-component";
import MapRouting from "../MapRouting";
import InfoUsuarios from "../../Generales/InfoUsuarios";

class ModalViajePasajero extends Component {

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
            viajeCurso: { inicio: "ECI", destino: "Prado", estado: "En curso" },
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
                                        <MapRouting width="350px" />
                                    </div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Origen: {viaje.viajeCurso.inicio}
                                        <br />
                                        Destino: {viaje.viajeCurso.destino}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {viaje.dueDate}
                                    </Typography>
                                    </CardContent>
                                {viaje.viajeCurso.estado === "finalizado"  && 
                                
                                    <IconButton edge="end" aria-label="delete">
                                        <Star />
                                        <Typography variant="h5" color="textPrimary" component="p">
                                            Calificar
                                        </Typography>
                                    </IconButton>
                                }
                                <div className={classes.demo}>
                                    <Typography variant="h5" color="textPrimary" component="p">
                                        Pasajeros:
                                    </Typography>
                                    <List>
                                        {viaje.pasajeros.map((pasajero, index) => {
                                            return (
                                                <div>
                                                    <Divider key={index}/>
                                                    <ListItem key={index+2}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <AccountCircle />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={pasajero.name}
                                                            secondary={
                                                                <p>
                                                                    <ReactStars
                                                                        value={pasajero.rating}
                                                                        size={24}
                                                                        color="#AFAFAF"
                                                                        activeColor="#ffd700"
                                                                        edit={false}
                                                                    />
                                                                </p>
                                                            }
                                                        />
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
    gridContainer: {
        flexGrow: 1,
    },

});


export default withStyles(styles, { withTheme: true })(ModalViajePasajero);