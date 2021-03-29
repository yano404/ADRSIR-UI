import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}))

export default function CancelButton(props) {
    const classes = useStyles();
    const { variant, color, onClick, fullWidth, type, ...other } = props;

    return (
        <Button
            aria-label="cancel"
            variant={variant}
            color={color}
            onClick={onClick}
            className={classes.root}
            startIcon={<CancelIcon />}
            type={type}
        >
            Cancel
        </Button>
    );
}