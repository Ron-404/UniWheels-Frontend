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
import './PassangerRequestModal.css';

class PassangerRequestModal extends Component{

    render(){
      return(<SimpleTable/>)
    }
}


class RowPas extends Component {
    constructor(props){
        super(props);
        this.state = {
           stateBoton: 'acept',row:props.crow
        }
        this.key=props.keys;
    }

    changeEstado(e){
      var row = {...this.state.row};
      if(this.state.stateBoton==='acept'){
        row.estado='waiting to be picked up';
        this.setState({row});
        this.setState({stateBoton:'picked up'});
      }else if(this.state.stateBoton==='picked up'){
        row.estado='In the car';
        this.setState({row});
        this.setState({stateBoton:'passanger'});
      }
    }
    cancel(e){
      var row = {...this.state.row};
      row.estado='searching driver';
      this.setState({row});
      this.setState({stateBoton:'acept'});
    }

    render(){
        let btn_class='';
        if(this.state.stateBoton==='acept'){
          btn_class= 'buttonyellow';
        }else if(this.state.stateBoton==='picked up'){
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
                    {this.state.stateBoton}
                  </Button>
                   {this.state.stateBoton==='picked up' ?       <Button className="cancelbutton marginbuttonleft"
                         onClick={this.cancel.bind(this)} variant="outlined" color="primary">
                            Cancelar
                        </Button>  : null}
                    {this.state.stateBoton==='passanger' ?        <Button className="buttongreen marginbuttonleft"
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
  createData('Juan','searching driver','Toberin Cll 151 #20-17'),
  createData('Victor','searching driver','Cedritos Cll 134 #15-48'),
  createData('Mario','searching driver','Mazuren Cll 134 #40-5'),
];

const SimpleTable=((props)=> {
  const classes = useStyles();


  return (
    <TableContainer component={Paper}>
          <Typography variant="h3" id="tableTitle" component="div">
            Solicitudes de passangers
          </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>passanger</TableCell>
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
export default PassangerRequestModal;
