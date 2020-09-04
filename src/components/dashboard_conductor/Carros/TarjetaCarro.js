import React from 'react'
import Button from '@material-ui/core/Button'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import './TarjetaCarro.css'

class TarjetaCarro extends React.Component{

    state = {
        "isPicked":this.props.car.isPicked,
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


    render(){
        const STYLE = `Tarjeta car`;
        document.body.classList.add('TarjetaCarro');
        const {Marca,Color,Placa,Modelo} = this.props.car;
        
        return(
            <div className={STYLE}>
                {this.state.isPicked &&<b>Seleccionada</b>}
                <DriveEtaIcon/>
                <p>Marca: {Marca}</p>
                <p>Modelo: {Modelo}</p>
                <p>Color: {Color}</p>
                <p>Placa: {Placa}</p>
                <Button variant="contained" color="primary">Editar</Button>
            </div>
            
        );
    }
}

export default TarjetaCarro;