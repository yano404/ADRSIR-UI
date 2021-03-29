import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

export default function SettingsButton({ onClick, color = "inherit" }) {
    return (
        <IconButton
            aria-label="settings"
            onClick={onClick}
            color={color}
        >
            <SettingsIcon />
        </IconButton>
    );
}