import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    editIcon: {
        color: '#fff',
        backgroundColor: theme.palette.info.main,
    },
}));

export default function EditButton(props) {
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
            <Avatar className={classes.editIcon}>
                <EditIcon />
            </Avatar>
        </IconButton>
    );
}