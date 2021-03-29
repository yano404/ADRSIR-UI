import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    deleteIcon: {
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function DeleteIconButton(props) {
    const classes = useStyles();
    const { color, onClick, className, size } = props;

    return (
        <IconButton
            aria-label="edit"
            color={color}
            size={size}
            className={className}
            onClick={onClick}
        >
            <Avatar className={classes.deleteIcon}>
                <DeleteIcon />
            </Avatar>
        </IconButton>
    );
}