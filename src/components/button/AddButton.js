import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}))

export default function AddButton(props) {
    const classes = useStyles();
    const { variant, onClick, fullWidth, type } = props;

    return (
        <Button
            aria-label="add"
            variant={variant}
            color="primary"
            onClick={onClick}
            className={classes.root}
            startIcon={<AddIcon />}
            type={type}
            fullWidth={fullWidth}
        >
            Add
        </Button>
    );
}