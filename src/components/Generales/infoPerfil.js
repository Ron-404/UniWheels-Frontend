import React, { Component } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ReactStars from "react-rating-stars-component";

import { makeStyles} from '@material-ui/core/styles';

import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class InfoPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: false,
            open:false,
            user:this.props.user,
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        console.log("infoPerfil");
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        return (
            <TransitionsModal user={this.state.user}></TransitionsModal>
        )
    }
}

const useStyles = makeStyles((theme) => ({
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
  }));

const TransitionsModal = ((props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const { user } = props;
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleEdit = () => {
        document.location.href="/ActualizarUsuario";
      };
  
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Nombre: </h2>
                {user.name}
              <h2 id="transition-modal-description">Correo: </h2>
                {user.email}

                <div >
                <h2 id="transition-modal-calificacion">Calificación: </h2>
                <ReactStars
                    value={user.rating}
                    size={24}
                    color="#AFAFAF"
                    activeColor="#ffd700"
                    edit={false}
                />
                </div>
                <br></br>
                <Button color="primary" variant="contained"  className="submit" onClick={handleEdit}>
                    Editar
                </Button>

            </div>
          </Fade>
        </Modal>
      </div>
    );
  })



export default InfoPerfil;