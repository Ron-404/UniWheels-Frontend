import React, { Component } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import ReactStars from "react-rating-stars-component";
import Swal from 'sweetalert2';

import { makeStyles} from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';

class InfoPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //name: false,
            open: true,
            edit: false,
            //user:[],
            name:'',
            email:'',
            rating:0,
            password:'',
            confirPass:'',
            direction:'',
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirPass = this.handleConfirPass.bind(this);
        this.handleDirection = this.handleDirection.bind(this);
        this.handleSave = this.handleSave.bind(this);
        console.log("infoPerfil");
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleEdit(){
      this.setState({ edit: !this.state.edit });
    }

    handleName(e){
      this.setState({ name: e});
    }

    handleEmail(e){
      this.setState({ email: e});
    }

    handleRating(e){
      this.setState({ rating: e});
    }

    handlePassword(e){
      this.setState({ password: e});
    }

    handleConfirPass(e){
      this.setState({ confirPass: e});
    }

    handleDirection(e){
      this.setState({ direction: e});
    }

    handleSave(){
      var f = "@escuelaing.edu.co";

      if (this.state.email === '' ||
        this.state.user === '' ||
        this.state.university === '' ||
        this.state.address === '' ||
        this.state.confirmPassword === '' ||
        this.state.password === '') {
        Swal.fire("Algún espacio esta vacio", "Por favor llene todos los campos", "error");
      } 
      else if (!this.state.email.includes(f)) {
          Swal.fire("El correo no corresponde con uno institucional.", "Por favor ingrese un correo institucional.", "error");
          return;
      } 
      else if (this.state.password !== this.state.confirmPassword) {
          Swal.fire("Las contraseñas ingresadas no coinciden.", "Por favor ingrese de nuevo las contraseñas.", "error");
          return;
      } 
        else {
          //Conectar con la API updateUser
          //Revisar conexión de RegistrarUsuario
          Swal.fire(
            'Cuenta creada satisfactoriamente!',
            'Sera redireccionado a la pagina de inicio de sesion',
            'success'
          )
      }
    }

    componentDidMount(){
      //Traer info del api getUser
      this.handleName("Orlando");
      this.handleEmail("orlando@escuelaing.edu.co");
      this.handleRating(2);
    }

    render() {
        const {classes} = this.props;
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
                <h2 id="transition-modal-title">Nombre: </h2>
                {!this.state.edit ? this.state.name : 
                   <Input id="user" name="user" value={this.state.name} onChange={this.handleName} autoComplete="user" autoFocus /> }
  
                <h2 id="transition-modal-description">Correo: </h2>
                  {!this.state.edit ? this.state.email :
                    <Input id="email" name="email" value={this.state.email} onChange={this.handleEmail} autoComplete="email" autoFocus />}
  
                {this.state.edit ? 
                  <div>
                    <h2 id="transition-modal-description">Contraseña: </h2>
                    <Input id="pass" type="password" name="pass" value={this.state.password} onChange={this.handlePassword} autoComplete="pass" autoFocus />
                    <h2 id="transition-modal-description">Confirmar Contraseña: </h2>
                    <Input id="confirmPass" type="password" name="confirmPass" value={this.state.confirmPass} onChange={this.handleConfirPass} autoComplete="confirmPass" autoFocus />
                    <h2 id="transition-modal-description">Dirección: </h2>
                    <Input id="direction" name="direction" value={this.state.direction} onChange={this.handleDirection} autoComplete="direction" autoFocus />
                  </div>
                  : null
                }

                {!this.state.edit ?  
                  <div>
                    <div >
                      <h2 id="transition-modal-calificacion">Calificación: </h2>
                      <ReactStars
                          value={this.state.rating}
                          size={24}
                          color="#AFAFAF"
                          activeColor="#ffd700"
                          edit={false}
                      />
                    </div>
                    <br></br>
                    <Button color="primary" variant="contained"  className="submit" onClick={this.handleEdit}>
                        Editar
                    </Button> 
                  </div> 
                  : 
                    <div>
                      <br></br>
                      <Button color="primary" variant="contained"  className="submit" onClick={this.handleSave}>
                        Guardar
                      </Button> 
                    </div>
                }
                  
  
              </div>
            </Fade>
          </Modal>
        </div>
        )
    }
}

const styles = theme => ({
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

  /** 
const TransitionsModal = ((props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [edit, setEdit] = React.useState(false);

    const { user } = props;
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleName = (e) => {
      this.setState({
        [user.name] : e.target.value
      });
    }

    const handleEdit = () => {
        //document.location.href="/ActualizarUsuario";
        setEdit(true);
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
              {!edit ? user.name : 
                 <Input id="user" name="user" value={user.name} onChange={handleName} autoComplete="user" autoFocus /> }

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

*/

export default withStyles(styles, { withTheme: true })(InfoPerfil);