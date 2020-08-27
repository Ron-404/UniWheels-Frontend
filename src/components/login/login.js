import React from 'react';
import './login.css';
import {  withStyles,TextField, MenuItem, Paper, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';


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

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {user:'',password:'',rol:''};
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRolChange = this.handleRolChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(e){
        this.setState({
            user: e.target.value
        });
    };

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        });
    };

    handleRolChange(e){
        this.setState({
            rol: e.target.value
        });
    };

    handleSubmit(e){
        e.preventDefault();
    };

    render() { 
        const { classes } = this.props;       
        return (
            <div className="fondo">
                 <div>
                    <form onSubmit={this.handleSubmit} className="form" >
                        <br></br>
                        <h2>Iniciar Sesión</h2>
                        <br></br>
                        <div className="text">
                            <div>
                                <TextField  id="username" label="Username" type="email" 
                                    onChange={this.handleUserChange} fullWidth autoFocus required />
                            </div>
                            <br></br>
                            <div >
                                <TextField id="username" label="Password" type="password" 
                                    onChange={this.handlePasswordChange} fullWidth required />
                            </div >
                            <br></br>
                            <div>
                                <TextField id="select" label="Rol" select required fullWidth
                                    onChange={this.handleRolChange}>
                                    <MenuItem value="usuario">Usuario</MenuItem>
                                    <MenuItem value="conductor">Conductor</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div>
                            <Button type="submit" color="primary" variant="contained"  className="submit">
                                Entrar    
                            </Button>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="rigth">
                        <Link color="secondary" href="./login.js" className={classes.link} aria-current="page">
                            <HomeIcon  className={classes.icon} color="primary"/>Registrate</Link>
                        </div>
                        <br></br>
                        <br></br>
                    </form>
                </div>
            </div>
           
        );
    }
}

export default withStyles(styles)(Login);
