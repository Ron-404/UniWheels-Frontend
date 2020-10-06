import React from 'react'
import Button from '@material-ui/core/Button'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import './TarjetaCarro.css'
import ActualizarCarro from './ActualizarCarro';

class TarjetaCarro extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "isPicked":this.props.car.isPicked,
            edit: false
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.editData = this.editData.bind(this);
    }

    // HACK delete styles
    componentWillUnmount(){
        document.body.classList.remove("TarjetaCarro")
    }

    iChooseThis = (bool) =>{
        const {selectCar} = this.props;
        selectCar(this.props.car);
        this.setState({
            "isPicked":bool
        })
    }

    editData(){
        this.setState({
            edit : !this.state.edit
        });
    }

    render(){
        const STYLE = `Tarjeta car`;
        document.body.classList.add('TarjetaCarro');
        //console.log(this.props.car);
        const {Marca,Color,Placa,Modelo} = this.props.car;
        
        return(
            <div className={STYLE}>
                {this.state.isPicked &&<b>Seleccionada</b>}
                <DriveEtaIcon/>
                <p>Marca: {Marca}</p>
                <p>Modelo: {Modelo}</p>
                <p>Color: {Color}</p>
                <p>Placa: {Placa}</p>
                <Button variant="contained" color="primary" onClick={this.editData}>Editar</Button>
                {this.state.edit ? <ActualizarCarro car={this.props.car}/> : null}
            </div>
            
        );
    }
}

export default TarjetaCarro;