import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

export default function SettingsButton({ onClick, color = "inherit" }) {

    return (
        <IconButton
            aria-label="home"
            onClick={onClick}
            color={color}
        >
            <HomeIcon />
        </IconButton>
    );
}