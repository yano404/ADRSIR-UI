import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from "@material-ui/core";
import MemoryIcon from '@material-ui/icons/Memory';

export default function CodeField(props) {
    const { fullWidth, id, label, type, value, onChange, onClick, error, helperText } = props;

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={id} error={error}>
                {label}
            </InputLabel>
            <Input
                fullWidth={fullWidth}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                error={error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton>
                            <MemoryIcon
                                aria-label="read-memory"
                                onClick={onClick}
                            />
                        </IconButton>
                    </InputAdornment>
                }
                aria-describedby={`${id}-helper-text`}
            />
            <FormHelperText id={`${id}-helper-text`} error={error}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
}