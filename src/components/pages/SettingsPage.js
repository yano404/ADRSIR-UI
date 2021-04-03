import { Grid } from '@material-ui/core';
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
import AddDeviceDialog from "../dialog/AddDeviceDialog";
import AddGroupDialog from "../dialog/AddGroupDialog";
import DeviceList from "../list/DeviceSettingsList";
import DrawerItems from "../list/DrawerItems";
import NavBar from "../navbar/SettingsNavBar";

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
    expandTop: {
        paddingTop: theme.spacing(2)
    },
}));

function SettingsPage(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [groups, setGroups] = React.useState([]);
    const [group, setGroup] = React.useState();
    const [devices, setDevices] = React.useState([]);
    const [changed, setChanged] = React.useState(0);

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
        };
        if (group !== undefined) {
            getDevices()
        }
    }, [group, changed])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChanged = () => {
        setChanged(changed + 1);
    };

    const drawer = (
        <div>
            <Divider />
            <DrawerItems
                items={groups}
                onClick={(name) => setGroup(name)}
            />
            <AddGroupDialog
                groups={groups}
                setGroups={setGroups}
            />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar menuOnClick={handleDrawerToggle} />
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
                    <DeviceList
                        devices={devices}
                        changed={handleChanged}
                        groups={groups}
                    />
                    <Grid container
                        spacing={3}
                        alignItems="stretch"
                        justify="flex-start"
                        className={classes.expandTop}
                    >
                        <Grid item key="add-device" xs={12} >
                            <AddDeviceDialog
                                group={group}
                                changed={handleChanged}
                            />
                        </Grid>
                    </Grid>
                    <Copyright />
                </div>
            </main>
        </div>
    );
}

export default SettingsPage;