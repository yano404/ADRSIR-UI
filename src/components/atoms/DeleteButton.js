import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}))

export default function DeleteButton(props) {
    const classes = useStyles();
    const { variant, onClick, fullWidth, type, ...other } = props;

    return (
        <Button
            aria-label="delete"
            variant={variant}
            color="secondary"
            onClick={onClick}
            className={classes.root}
            startIcon={<DeleteIcon />}
            type={type}
        >
            Delete
        </Button>
    );
}