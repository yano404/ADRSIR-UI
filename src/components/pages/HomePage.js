import { List } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import API from "../../api";
import { drawerWidth } from "../../config/uiconfig";
import Copyright from "../Copyright";
import DeviceList from "../list/DeviceList";
import DrawerItems from "../list/DrawerItems";
import NavBar from "../navbar/NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(10)
    },
    title: {
        paddingBottom: theme.spacing(2)
    },
}));

function HomePage(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [groups, setGroups] = React.useState([]);
    const [group, setGroup] = React.useState("");
    const [devices, setDevices] = React.useState([]);

    React.useEffect(() => {
        const getGroups = async () => {
            await API.get("/groups")
                .then(res => {
                    const data = res.data;
                    console.log(data);
                    setGroups(data);
                    setGroup(data[0]);
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
        getGroups()
    }, []);

    React.useEffect(() => {
        const getDevices = async () => {
            await API.get(
                "/devices",
                { params: { group: group } }
            ).then(res => {
                const data = res.data;
                console.log(data);
                setDevices(data);
            })
        }
        getDevices()
    }, [group])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Divider />
            <List>
                <DrawerItems items={groups} onClick={(name) => setGroup(name)} />
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar title={props.title} menuOnClick={handleDrawerToggle} />
            <nav className={classes.drawer} aria-label="group list">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography variant="h4" className={classes.title}>
                        {group}
                    </Typography>
                    <DeviceList devices={devices} />
                    <Copyright />
                </div>
            </main>
        </div >
    );
}

export default HomePage;