import React, { Component } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Swal from 'sweetalert2';

import ReactStars from "react-rating-stars-component";

import { withStyles} from '@material-ui/core/styles';

import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

class ActualizarCarro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: false,
            open:true,
            car:this.props.car,
            marca: this.props.car.Marca,
            modelo: this.props.car.Modelo,
            color: this.props.car.Color,
            placa: this.props.car.Placa
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMarca = this.handleMarca.bind(this);
        this.handleModelo = this.handleModelo.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handlePlaca= this.handlePlaca.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleMarca(e){
        this.setState({ marca: e.target.value });
    }

    handleModelo(e){
        this.setState({ modelo: e.target.value });
    }
    handleColor(e){
        this.setState({ color: e.target.value });
    }
    handlePlaca(e){
        this.setState({ placa: e.target.value });
    }

    handleEdit(){
        this.handleClose();
        if(this.state.marca!== "" && this.state.modelo !== "" && this.state.color !== "" && this.state.placa !== ""){
            console.log("datos correctos");
            console.log(this.state.marca);
            console.log(this.state.modelo);
            console.log(this.state.color);
            console.log(this.state.placa);
            //Conectar con la API
            Swal.fire(
                'Datos Guardados',
                'Puedes verificar los cambios en la vista de "Mis Carros"',
                'success'
            )
        }
        else{
            Swal.fire(
                'Datos Erroneos',
                'Verifique los campos',
                'error'
            )
        }
      };
  

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <FormControl variant="outlined">
                                <h2 id="transition-modal-marca">Marca: </h2>
                                    <TextField id="textfield-marca" label={this.state.marca} onChange={this.handleMarca}  />
                                <h2 id="transition-modal-modelo">Modelo: </h2>
                                    <TextField id="textfield-modelo" label={this.state.modelo} onChange={this.handleModelo}/>
                                <h2 id="transition-modal-color">Color: </h2>
                                    <TextField id="textfield-color" label={this.state.color} onChange={this.handleColor}  />
                                <h2 id="transition-modal-placa">Placa: </h2>
                                    <TextField id="textfield-placa" label={this.state.placa} onChange={this.handlePlaca}/>

                                <br></br>
                                <Button color="primary" variant="contained"  className="submit" onClick={this.handleEdit}>
                                    Editar
                                </Button>
                            </FormControl>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

const styles = theme =>({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    h3:{
        marginBottom: "-30px",
        marginTop: "-5px"
    }
  });

export default withStyles(styles, { withTheme: true })(ActualizarCarro);