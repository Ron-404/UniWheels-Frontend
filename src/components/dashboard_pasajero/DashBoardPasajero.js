import React, { Component } from 'react';
import clsx from 'clsx';

import { withStyles } from "@material-ui/core/styles";

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
    Link,
} from '@material-ui/core/';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TelegramIcon from '@material-ui/icons/Telegram';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import logo from '../../logo.png';
import Solicitudes from './Solicitudes';
import ViajesOfrecidosConductores from "../dashboard_pasajero/ViajesOfrecidosConductores";
import ModalViajePasajero from './viaje/ModalViajePasajero';

class DashBoardPasajero extends Component {

    constructor(props) {
        super(props);
        this.state = {

            anchorEl: null,
            mobileMoreAnchorEl: null,
            isMenuOpen: false,
            isMobileMenuOpen: false,
            isRequestsOpen: false,
            isViajesOpen: false,

            selectedIndex: false,
            vista1: false,
            vista2: false,
            vista3: false,
            vista4: false,
            open: false
        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
        this.handleClickRequests = this.handleClickRequests.bind(this);
        this.handleClickRequestsViajes = this.handleClickRequestsViajes.bind(this);
    }

    handleProfileMenuOpen(event) {
        this.setState({ anchorEl: event.currentTarget, isMenuOpen: true });
        this.handleMobileMenuClose();
    };

    handleMobileMenuClose() {
        this.setState({ mobileMoreAnchorEl: null, isMobileMenuOpen: false });
    };

    handleMenuClose() {
        this.setState({ anchorEl: null, isMenuOpen: false });
        this.handleMobileMenuClose();
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

    handleClickRequests(){
        this.setState({ isRequestsOpen : !this.state.isRequestsOpen})
    }

    handleClickRequestsViajes(){
        this.setState({ isViajesOpen : !this.state.isViajesOpen})
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        document.body.classList.add('dashBoardConductor');
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
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
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
                                <MenuItem onClick={this.handleMenuClose}>Perfil</MenuItem>
                                <MenuItem onClick={this.handleMenuClose}>Cerrar Sesion</MenuItem>
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
                                    <p>Perfil</p>

                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
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
                        <ListItem button onClick={this.handleClickRequests}>
                            <ListItemIcon>
                                <TelegramIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mis Solicitudes" />
                            {this.state.isRequestsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.isRequestsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem
                                    className={classes.nested}
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={this.handleListItemClick.bind(this, 0)}
                                >
                                    <ListItemIcon>
                                        <CheckCircleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Activas" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={this.handleClickRequestsViajes}>
                            <ListItemIcon>
                                <EmojiTransportationIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mis Viajes" />
                            {this.state.isViajesOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.isViajesOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem
                                    className={classes.nested}
                                    button
                                    selected={this.state.selectedIndex === 1}
                                    onClick={this.handleListItemClick.bind(this, 1)}
                                >
                                    <ListItemIcon>
                                        <CheckCircleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Actual" />
                                </ListItem>
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
                                    <Typography variant="h3">
                                        Viajes Disponibles:
                                    </Typography>
                                    <ViajesOfrecidosConductores/>
                                </div>}
                            <div>
                                {this.state.vista1 &&
                                    <Solicitudes />
                                }

                            </div>
                            <div>
                                {this.state.vista2 &&
                                    <div>
                                        <div>
                                            <Typography variant="h3">
                                                Viaje Actual:
                                            </Typography>
                                        </div>
                                        <div> 
                                            <ModalViajePasajero/>
                                        </div>
                                    </div>}
                            </div>
                            <div>
                                {this.state.vista3 &&
                                    <Typography variant="h6">
                                        Vista 3
                                </Typography>
                                }
                            </div>
                            <div>
                                {this.state.vista4 &&
                                    <Typography variant="h6" noWrap>
                                        Vista 4
                                </Typography>
                                }
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
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#000000"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuTitle: {
        marginLeft: "5px",
        color: "#FFFFFF"
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
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
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});


export default withStyles(styles, { withTheme: true })(DashBoardPasajero);