import {
    Snackbar
} from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="standard" {...props} />;
}

export default function AlertSnackbar(props) {
    const { open, onClose, severity, title, message } = props
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={severity}
            >
                <AlertTitle>
                    {title}
                </AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )
}