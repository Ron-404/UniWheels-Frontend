import React, { Component } from 'react';
import clsx from 'clsx';

import { withStyles } from "@material-ui/core/styles";

import {
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
    ListItemText
} from '@material-ui/core/';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../logo.png';

class DashBoardPasajero extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }

    async componentDidMount() {

    }

    handleListItemClick(index) {
        this.setState({selectedIndex : index})
        if(index === 0){
            this.setState({
                vista1: !this.state.vista1,
                vista2: false,
                vista3: false,
                vista4: false,
            });
        }
        else if(index === 1){
            this.setState({
                vista2: !this.state.vista2,
                vista1: false,
                vista3: false,
                vista4: false,
            });
        }
        else if(index === 2){
            this.setState({
                vista3: !this.state.vista3,
                vista1: false,
                vista2: false,
                vista4: false,
            });            
        }
        else if(index === 3){
            this.setState({
                vista4: !this.state.vista4,
                vista1: false,
                vista2: false,
                vista3: false,
            });           
        }

    };

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
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <img src={logo} width="40px" height="40px" margin="auto" alt="Logo"/>
                        </div>
                        <div className={classes.menuTitle}>
                            <Typography variant="h6" noWrap>
                                UNIWHEELS
                            </Typography>
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
                        {['vista 1', 'vista 2', 'vista 3', 'vista 4'].map((text, index) => (
                            <ListItem
                            
                                button key={text}
                                selected={this.state.selectedIndex === index}
                                onClick={this.handleListItemClick.bind(this, index)}
                            >
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                        <div>
                            <Typography variant="h3" noWrap>
                                BIENVENIDO PASAJERO
                            </Typography>
                        </div>
                        <div>
                            {this.state.vista1 && "vista 1"}
                        </div>
                        <div>
                            {this.state.vista2 && "vista 2"}
                        </div>
                        <div>
                            {this.state.vista3 && "vista 3"}
                        </div>
                        <div>
                            {this.state.vista4 && "vista 4"}
                        </div>
                    </div>
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
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#FF5733"
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
});


export default withStyles(styles, { withTheme: true })(DashBoardPasajero);