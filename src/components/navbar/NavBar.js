import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { drawerWidth } from "../../config/uiconfig";
import BrandButton from "../button/BrandButton";
import SettingsButton from "../button/SettingsButton";

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function NavBar({ title, menuOnClick }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={menuOnClick}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <BrandButton
                    title={title}
                    onClick={() => history.push("/")}
                />
                <div className={classes.grow} />
                <SettingsButton onClick={() => history.push("/settings")} />
            </Toolbar>
        </AppBar>
    );
}