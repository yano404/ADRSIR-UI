import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: 20
    }
}))

export default function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" color="textSecondary" align="center" className={classes.root}>
            Copyright © 2021 Takayuki YANO.
        </Typography>
    );
}