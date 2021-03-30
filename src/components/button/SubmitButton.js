import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}))

export default function SubmitButton(props) {
    const classes = useStyles();
    const { variant, onClick, fullWidth, type } = props;

    return (
        <Button
            aria-label="edit"
            variant={variant}
            color="primary"
            onClick={onClick}
            className={classes.root}
            startIcon={<CheckIcon />}
            type={type}
            fullWidth={fullWidth}
        >
            Submit
        </Button>
    );
}