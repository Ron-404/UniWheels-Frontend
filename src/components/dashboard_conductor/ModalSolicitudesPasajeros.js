import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './ModalSolicitudesPasajeros.css';

class ModalSolicitudesPasajeros extends Component{

    render(){
      return(<SimpleTable/>)
    }
}


class RowPas extends Component {
    constructor(props){
        super(props);
        this.state = {
           estadoBoton: 'aceptar',row:props.crow
        }
        this.key=props.keys;
    }

    changeEstado(e){
      var row = {...this.state.row};
      if(this.state.estadoBoton==='aceptar'){
        row.estado='En espera por recoger';
        this.setState({row});
        this.setState({estadoBoton:'se recogio'});
      }else if(this.state.estadoBoton==='se recogio'){
        row.estado='En el auto';
        this.setState({row});
        this.setState({estadoBoton:'pasajero'});
      }
    }
    cancel(e){
      var row = {...this.state.row};
      row.estado='En espera por conductor';
      this.setState({row});
      this.setState({estadoBoton:'aceptar'});
    }

    render(){
        let btn_class='';
        if(this.state.estadoBoton==='aceptar'){
          btn_class= 'buttonyellow';
        }else if(this.state.estadoBoton==='se recogio'){
          btn_class='buttongreen';
        }else{
          btn_class='buttonblack';
        }
        let row=this.state.row;
        return (
          <TableRow key={row.name}>

            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right" className={[btn_class,'noborder'].join(' ')}>{row.estado}</TableCell>
            <TableCell align="right">{row.lugar}</TableCell>
            <TableCell align="right">
                  <Button className={btn_class}
                   onClick={this.changeEstado.bind(this)} variant="outlined" color="primary">
                    {this.state.estadoBoton}
                  </Button>
                   {this.state.estadoBoton==='se recogio' ?       <Button className="cancelbutton marginbuttonleft"
                         onClick={this.cancel.bind(this)} variant="outlined" color="primary">
                            Cancelar
                        </Button>  : null}
                    {this.state.estadoBoton==='pasajero' ?        <Button className="buttongreen marginbuttonleft"
                        onClick={this.cancel.bind(this)} variant="outlined" color="primary">
                           Llegó
                       </Button> : null}
            </TableCell>
          </TableRow>
          
        )
    }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, estado, lugar) {
  return { name, estado, lugar };
}

const rows = [
  createData('Juan','En espera por conductor','Toberin Cll 151 #20-17'),
  createData('Victor','En espera por conductor','Cedritos Cll 134 #15-48'),
  createData('Mario','En espera por conductor','Mazuren Cll 134 #40-5'),
];

const SimpleTable=((props)=> {
  const classes = useStyles();


  return (
    <TableContainer component={Paper}>
          <Typography variant="h3" id="tableTitle" component="div">
            Solicitudes de Pasajeros
          </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pasajero</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Lugar</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {rows.map((row,index) => (
                  <RowPas crow={row} key={index}/>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})
export default ModalSolicitudesPasajeros;
