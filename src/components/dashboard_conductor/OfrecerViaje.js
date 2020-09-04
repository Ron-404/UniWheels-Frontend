import React from 'react';
import './OfrecerViaje.css';
import {  withStyles,
    TextField, 
    MenuItem, 
    Button, 
    Grid,
} from '@material-ui/core';

import viaje from './viaje.jpg';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      link: {
        display: 'flex',
      },
      icon: {
        marginRight: theme.spacing(0.5),
        width: 25,
        height: 25,
      },
});

class OfrecerViaje extends React.Component {

    constructor(props){
        super(props);
        this.state = {origen:'',destino:'',precio:0};
        this.handleOrigenChange = this.handleOrigenChange.bind(this);
        this.handleDestinoChange = this.handleDestinoChange.bind(this);
        this.handlePrecioChange = this.handlePrecioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // HACK delete styles
    componentWillUnmount(){
        document.body.classList.remove("OfrecerViaje")
    }

    handleOrigenChange(e){
        this.setState({
            origen: e.target.value
        });
    };

    handleDestinoChange(e){
        this.setState({
            destino: e.target.value
        });
    };

    handlePrecioChange(e){
        this.setState({
            precio: e.target.value
        });
    };

    handleSubmit(e){
        e.preventDefault();
        if(this.state.precio<0 || this.state.origen === this.state.destino){
            alert("Los datos ingresados son incorrectos");
        }
        else{
            alert("Viaje iniciado");
        }
    };

    render() {
        document.body.classList.add('OfrecerViaje');
        return (
            <Grid container>
                <Grid item xs={12} sm={6}>
                            <div className="div-image-viaje OfrecerViaje">
                                <img src={viaje} height="300" width="500" alt="img-registro"/>
                            </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                            <form onSubmit={this.handleSubmit} className="form-OfrecerViaje">
                                <br></br>
                                <h2>Mi viaje</h2>
                                <br></br>
                                <div className="text OfrecerViaje">
                                    <div className="text-form-cond OfrecerViaje">
                                        <TextField id="select" label="¿Donde estás?" select required fullWidth
                                            onChange={this.handleOrigenChange}>
                                            <MenuItem value="usuario">Mi Casa</MenuItem>
                                            <MenuItem value="conductor">ECI</MenuItem>
                                        </TextField>
                                    </div>
                                    <br></br>
                                    <div className="text-form-cond OfrecerViaje">
                                        <TextField id="otlined-select" label="¿Para donde vás?" select required fullWidth
                                            onChange={this.handleDestinoChange}>
                                            <MenuItem value="usuario">Mi casa</MenuItem>
                                            <MenuItem value="conductor">ECI</MenuItem>
                                        </TextField>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div className="text-form-cond">
                                        <TextField id="outlined-number" label="Precio" type="number" InputLabelProps={{ shrink: true,}}  
                                            variant="outlined"  onChange={this.handlePrecioChange}  fullWidth   autoFocus
                                            required/>
                                    </div>
                                    <br></br>
                                </div>
                                <br></br>
                                <br></br>
                                <div>
                                    <Button type="submit" color="primary" variant="contained"  className="submit">
                                        Iniciar
                                    </Button>
                                </div>
                                <br></br>
                                <br></br>
                            </form>
                            </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(OfrecerViaje);
