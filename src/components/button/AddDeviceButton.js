import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: 50
    }
}))

export default function AddDeviceButton({ onClick }) {
    const classes = useStyles();

    return (
        <Button
            aria-label="add device"
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={onClick}
            className={classes.root}
            startIcon={<AddIcon />}
        >
            <Typography variant="body1" noWrap>
                Add Device
            </Typography>
        </Button>
    );
}