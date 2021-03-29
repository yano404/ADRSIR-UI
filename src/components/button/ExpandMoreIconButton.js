import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ExpandMoreIconButton(props) {
    const { color, onClick, className, size } = props;

    return (
        <IconButton
            aria-label="show more"
            color={color}
            size={size}
            className={className}
            onClick={onClick}
        >
            <ExpandMoreIcon />
        </IconButton>
    );
}