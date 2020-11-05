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
import UsersInfo from "../../General/UsersInfo";

class PassengerTripModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            width: window.innerWidth,
            shape: []
        }
    }

    // resize box
    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };

    componentDidMount() {
        // resize box
        window.addEventListener('resize', this.updateDimensions);
        window.onresize = this.updateDimensions;
    }
    // resize box
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        const { classes } = this.props;
        const trip = {
            tripInProgress: { from: "ECI", to: "Prado", stateTrip: "En curso" },
            driver: { name: "Santiago Carrillo", email: "sancarbar@gmail", rating: 4 },
            dueDate: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
            passengers:
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
                                            Conductor: <UsersInfo user={trip.driver} />
                                            <br />
                                            Estado: En curso
                                        </Typography>
                                    }
                                />
                                
                                <CardContent>
                                    <div>
                                        <MapRouting ini={{lat:4.782659,lng:-74.041970}} des={{lat:4.749564,lng:-74.042032}} />
                                    </div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Origen: {trip.tripInProgress.from}
                                        <br />
                                        Destino: {trip.tripInProgress.to}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="span">
                                        {trip.dueDate}
                                    </Typography>
                                    </CardContent>
                                {trip.tripInProgress.stateTrip === "finalizado"  && 
                                
                                    <IconButton edge="end" aria-label="delete">
                                        <Star />
                                        <Typography variant="h5" color="textPrimary" component="span">
                                            Calificar
                                        </Typography>
                                    </IconButton>
                                }
                                <div className={classes.demo}>
                                    <Typography variant="h5" color="textPrimary" component="span">
                                        Pasajeros:
                                    </Typography>
                                    <List>
                                        {trip.passengers.map((pasajero, index) => {
                                            return (
                                                <div key={index}>
                                                    <Divider />
                                                    <ListItem >
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
        width: "300px",
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


export default withStyles(styles, { withTheme: true })(PassengerTripModal);