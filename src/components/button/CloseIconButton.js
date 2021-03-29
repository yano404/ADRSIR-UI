import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function CloseIconButton(props) {
    const { color, onClick, className, size, ...other } = props;

    return (
        <IconButton
            aria-label="close"
            color={color}
            size={size}
            className={className}
            onClick={onClick}
        >
            <CloseIcon />
        </IconButton>
    );
}