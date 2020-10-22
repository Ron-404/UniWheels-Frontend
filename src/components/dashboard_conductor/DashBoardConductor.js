import React, { Component } from 'react';
import clsx from 'clsx';
import ModalListaCarros from './Carros/ModalListaCarros'

import { withStyles } from "@material-ui/core/styles";
import Swal from 'sweetalert2';
import ModalRegistrarAutomovil from './ModalRegistrarAutomovil';
import ModalSolicitudesPasajeros from './ModalSolicitudesPasajeros';

import {
    Menu,
    MenuItem,
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Collapse,
} from '@material-ui/core/';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import DriveEta from '@material-ui/icons/DriveEta';
import Input from '@material-ui/icons/Input';
import ListIcon from '@material-ui/icons/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import GroupIcon from '@material-ui/icons/Group';
import Link from '@material-ui/core/Link';
import OfrecerViaje from './OfrecerViaje';
import ModalViajeConductor from './viaje/ModalViajeConductor';
import InfoPerfil from "../Generales/infoPerfil";

import logo from '../../logo.png';

class DashBoardConductor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            anchorEl: null,
            mobileMoreAnchorEl: null,
            isMenuOpen: false,
            isMobileMenuOpen: false,
            isCarsOpen: false,
            isTravelsOpen: false,

            selectedIndex: false,
            vista1: false,
            vista2: false,
            vista3: false,
            vista4: false,
            open: false,
            verPerfil: false
        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
        this.handleClickCars = this.handleClickCars.bind(this);
        this.handleClickTravels = this.handleClickTravels.bind(this);
    }

    async componentDidMount() {

        // verificar usuario de localestorage
        // si no esta es que no se a loegueado redireccionarlo a login
        if (!JSON.parse(localStorage.getItem('user'))) {
            await Swal.fire(
                'No está autentificado',
                'Por favor inicie sesion para usar esta funcionalidad',
                'error'
            )
            // eliminar localStorage
            await localStorage.clear();
            // redireccionar a login
            window.location.replace("/login")
        }
    }

    handleProfileMenuOpen(event) {
        this.setState({ anchorEl: event.currentTarget, isMenuOpen: true });
        this.handleMobileMenuClose();
    };

    handleMobileMenuClose() {
        this.setState({ mobileMoreAnchorEl: null, isMobileMenuOpen: false });
    };

    async handleMenuClose(index) {
        const { history } = this.props;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        this.setState({ anchorEl: null, isMenuOpen: false });
        this.handleMobileMenuClose();

        if (index === 1) { //modal perfil usuario
            if (this.state.verPerfil) {
                await this.setState({ verPerfil: false });
                this.setState({ verPerfil: true });
            } else {
                this.setState({ verPerfil: true });
            }
        }

        if (index === 2) { // cambio dashboard
            swalWithBootstrapButtons.fire({
                title: 'Está seguro de ser pasajero?',
                text: "como pasajero podra tomar viajes y llegar como a su destino!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Seguro!',
                cancelButtonText: 'No, Regresar!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/dashboardPasajero');
                }
            })

        }

        if (index === 3) {
            swalWithBootstrapButtons.fire({
                title: 'Está seguro de cerrar sesion?',
                text: "sera redirigido a la pagina principal",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Seguro!',
                cancelButtonText: 'No, Regresar!',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // limpiar localStorage
                    await localStorage.clear();
                    history.push('/home');
                }
            })
        }
    };

    handleMobileMenuOpen(event) {
        this.setState({ mobileMoreAnchorEl: event.currentTarget, isMobileMenuOpen: true });
    };

    handleListItemClick(index) {
        this.setState({ selectedIndex: index })
        if (index === 0) {
            this.setState({
                vista1: !this.state.vista1,
                vista2: false,
                vista3: false,
                vista4: false,
            });
        }
        else if (index === 1) {
            this.setState({
                vista2: !this.state.vista2,
                vista1: false,
                vista3: false,
                vista4: false,
            });
        }
        else if (index === 2) {
            this.setState({
                vista3: !this.state.vista3,
                vista1: false,
                vista2: false,
                vista4: false,
            });
        }
        else if (index === 3) {
            this.setState({
                vista4: !this.state.vista4,
                vista1: false,
                vista2: false,
                vista3: false,
            });
        }
        this.handleDrawerClose();

    };
    handleClickCars() {
        this.setState({ isCarsOpen: !this.state.isCarsOpen })
    }

    handleClickTravels() {
        this.setState({ isTravelsOpen: !this.state.isTravelsOpen })
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <img src={logo} width="40px" height="40px" margin="auto" alt="Logo" />

                        <Typography variant="h6" noWrap href="/home">
                            <Link href="/home">
                                <div className={classes.menuTitle}>
                                    UNIWHEELS
                                </div>
                            </Link>
                        </Typography>


                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={'primary-search-account-menu'}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                id={'primary - search - account - menu'}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={this.state.isMenuOpen}
                                onClose={this.handleMenuClose}
                            >
                                <MenuItem onClick={this.handleMenuClose.bind(this, 1)}>Perfil</MenuItem>
                                {this.state.verPerfil ? <InfoPerfil /> : null}
                                <MenuItem onClick={this.handleMenuClose.bind(this, 2)}>Ser Pasajero</MenuItem>
                                <MenuItem onClick={this.handleMenuClose.bind(this, 3)}>Cerrar Sesion</MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={'primary-search-account-menu-mobile'}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                            <Menu
                                anchorEl={this.state.mobileMoreAnchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                id={'primary - search - account - menu - mobile'}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={this.state.isMobileMenuOpen}
                                onClose={this.handleMobileMenuClose}
                            >
                                <MenuItem onClick={this.handleProfileMenuOpen}>

                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <span>Perfil</span>

                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    open={this.state.open}
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {classes.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Divider />
                        <ListItem button onClick={this.handleClickCars}>
                            <ListItemIcon>
                                <DriveEta />
                            </ListItemIcon>
                            <ListItemText primary="Mis Carros" />
                            {this.state.isCarsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.isCarsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {['Registrar Carro', 'Ver mis Carros'].map((text, index) => (
                                    <ListItem
                                        className={classes.nested}
                                        button key={text}
                                        selected={this.state.selectedIndex === index}
                                        onClick={this.handleListItemClick.bind(this, index)}
                                    >
                                        <ListItemIcon>{index % 2 === 0 ? <Input /> : <ListIcon />}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem button onClick={this.handleClickTravels}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mis Viajes" />
                            {this.state.isTravelsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.isTravelsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {['Ofrecer Viaje', 'Solcitudes'].map((text, index) => (
                                    <ListItem
                                        className={classes.nested}
                                        button key={text}
                                        selected={this.state.selectedIndex === index + 2}
                                        onClick={this.handleListItemClick.bind(this, index + 2)}
                                    >
                                        <ListItemIcon>{index % 2 === 0 ? <EmojiTransportationIcon /> : <ListIcon />}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Box>

                        <div>

                            {!this.state.vista1 && !this.state.vista2 && !this.state.vista3 && !this.state.vista4 &&
                                <div>
                                    <article>
                                        <Typography variant="h3">
                                            Viaje Actual:
                                        </Typography>
                                    </article>
                                    <div>
                                        <ModalViajeConductor />
                                    </div>
                                </div>}
                            <div>
                                {this.state.vista1 ? <ModalRegistrarAutomovil /> : null}
                            </div>
                            <div>
                                {this.state.vista2 ? <ModalListaCarros /> : null}
                            </div>
                            <div>
                                {this.state.vista3 ? <OfrecerViaje /> : null}
                            </div>
                            <div>
                                {this.state.vista4 ? <ModalSolicitudesPasajeros /> : null}
                            </div>

                        </div>
                    </Box>
                </main>
            </div>


        )
    }
}
const drawerWidth = 240;


const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#000000"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuLogo: {
        position: "relative",
    },
    menuTitle: {
        marginLeft: "5px",
        color: "#FFFFFF",
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});


export default withStyles(styles, { withTheme: true })(DashBoardConductor);
