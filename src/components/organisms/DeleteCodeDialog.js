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
import CancelButton from "../atoms/CancelButton";
import CloseButton from '../atoms/CloseIconButton';
import DeleteButon from "../atoms/DeleteButton";
import DeleteIconButton from "../atoms/DeleteIconButton";
import AlertSnackbar from '../molecules/AlertSnackbar';

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

export default function DeleteCodeDialog({ code, changed }) {
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
            `codes/${code.id}`
        ).then(res => {
            console.log(res);
            changed();
            setSnackTitle(res.status);
            setSnackMessage("the code is deleted");
            setAlertSeverity("success");
            handleSnackOpen();
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
                aria-labelledby="delete-code-dialog"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="delete-code-dialog" className={classes.root}>
                    <Typography variant="h6">
                        Delete Code
                    </Typography>
                    <CloseButton className={classes.closeButton} onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete <b>{code.name}</b> ?
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