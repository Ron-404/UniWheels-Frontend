import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Car from "../CarImage"
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateCar from './UpdateCar';
import Swal from 'sweetalert2';

class ModalListaCarros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: "",
            cargarListaCarros: false,
            listaDeCarros: [],
            edit: false,
            selectedCar: null
        }
    }

    componentDidMount= async () => {
        // sacar info usuario localestorage
        var userLocalestorage = await JSON.parse(localStorage.getItem('user'));
        this.setState({ userInfo: userLocalestorage })
        // sacar listas de carros
        await axios.get(`https://uniwheels-backend.herokuapp.com/uniwheels/getCarros/` + userLocalestorage.username,
            {
                headers: {
                    Authorization: userLocalestorage.token //the token is a variable which holds the token
                }
            }
        )
            .then(res => {
                const listaDeCarros = res.data;
                this.setState({ listaDeCarros });
                this.setState({ cargarListaCarros: true });
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

    selectIdColor = (c) => {
        if (c === 'blanco') return "#AAAAAA";
        else if (c === 'negro') return "#000000";
        else if (c === 'azul') return "#0032FF";
        else if (c === 'rojo') return "#FF0000";
        else if (c === 'amarillo') return "#FFFF00";
        else if (c === 'verde') return "#008000";
        else if (c === 'naranja') return "#FF4500";
        else if (c === 'morado') return "#800080";
    }

    editData = async (n) => {
        this.setState({ selectedCar: n });
        if (this.state.edit) {
            await this.setState({ edit: false });
            this.setState({ edit: true });
        } else {
            this.setState({ edit: true });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.gridContainer} spacing={2}>

                <Grid item xs={12}>
                    {this.state.cargarListaCarros ?

                        <Grid container justify="center" spacing={2}>
                            {this.state.listaDeCarros.map((carro, index) => {
                                return (
                                    <Grid key={index} item>
                                        <Card className={classes.root}>

                                            <CardHeader
                                                title={
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Placa: {carro.placa}
                                                    </Typography>
                                                }
                                            />

                                            <CardContent>

                                                <Car color={this.selectIdColor(carro.color)} />

                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Marca: {carro.marca}
                                                    <br />
                                                Modelo: {carro.modelo}
                                                    <br />
                                                Color: {carro.color}
                                                </Typography>

                                            </CardContent>

                                            <CardActions className={classes.botonSolc}>
                                                <Button onClick={this.editData.bind(this, index)} className={classes.boton} variant="contained" size="small" >
                                                    Editar
                                            </Button>
                                            </CardActions>
                                        </Card>

                                    </Grid>

                                )
                            })}
                            {this.state.edit ? <UpdateCar car={this.state.listaDeCarros[this.state.selectedCar]} updateListCar={this.componentDidMount} /> : null}
                        </Grid>
                        :
                        <CircularProgress />
                    }
                </Grid>
            </Grid>
        )
    }
}



const styles = theme => ({
    root: {
        width: 300,
        height: 350,
        marginBottom: "50px",
        backgroundColor: "#FF5733"
    },
    botonSolc: {
        justifyContent: "center",
    },
    boton: {
        color: "#FFFFFF",
        backgroundColor: "#0071EA",
        margin: "auto"
    },
    gridContainer: {
        flexGrow: 1,
    },

});


export default withStyles(styles, { withTheme: true })(ModalListaCarros);