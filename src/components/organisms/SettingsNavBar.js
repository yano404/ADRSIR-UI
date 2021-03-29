import AppBar from '@material-ui/core/AppBar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from "react-router-dom";
import { drawerWidth } from "../../config/uiconfig";
import HomeButton from "../atoms/HomeButton";

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
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    }
}));

export default function NavBar({ menuOnClick }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar
            position="fixed"
            color="default"
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
                <Breadcrumbs separator={<NavigateNextIcon />}>
                    <HomeButton onClick={() => history.push("/")} />
                    <Typography variant="h6" noWrap>
                        Settings
                    </Typography>
                </Breadcrumbs>
            </Toolbar>
        </AppBar>
    );
}