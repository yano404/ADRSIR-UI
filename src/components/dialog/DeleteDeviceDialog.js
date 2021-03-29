import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import API from "../../api";
import CancelButton from "../button/CancelButton";
import CloseButton from '../button/CloseIconButton';
import DeleteButon from "../button/DeleteButton";
import DeleteIconButton from "../button/DeleteIconButton";
import AlertSnackbar from '../snackbar/AlertSnackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

export default function DeleteDeviceDialog({ device, changed }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackTitle, setSnackTitle] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("error");


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteClick = async () => {
        await API.delete(
            `devices/${device.id}`
        ).then(res => {
            console.log(res);
            changed();
            handleClose();
        }).catch(error => {
            console.log(error.response);
            setSnackTitle(error.response.status);
            setSnackMessage(error.response.data.detail);
            setAlertSeverity("error");
            handleSnackOpen();
        })
    }

    const handleSnackOpen = () => {
        setSnackOpen(true);
    }

    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    }


    return (
        <div>
            <DeleteIconButton onClick={handleOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-device-dialog"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="delete-device-dialog" className={classes.root}>
                    <Typography variant="h6">
                        Delete Device
                    </Typography>
                    <CloseButton className={classes.closeButton} onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete <b>{device.name}</b> ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <CancelButton
                        variant="outlined"
                        color="default"
                        onClick={handleClose}
                    />
                    <DeleteButon
                        variant="contained"
                        onClick={handleDeleteClick}
                    />
                </DialogActions>
            </Dialog>
            <AlertSnackbar
                open={snackOpen}
                onClose={handleSnackClose}
                severity={alertSeverity}
                title={snackTitle}
                message={snackMessage}
            />
        </div>
    );
}