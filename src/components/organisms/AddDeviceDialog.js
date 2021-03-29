import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import API from "../../api";
import AddButton from '../atoms/AddButton';
import AddDeviceButton from "../atoms/AddDeviceButton";
import CloseButton from '../atoms/CloseIconButton';
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

export default function AddDeviceDialog({ group, changed }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackTitle, setSnackTitle] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("error");

    const validDevice = yup.object({
        name: yup
            .string("Enter device name")
            .trim()
            .required("device name is required"),
        desc: yup
            .string("Enter description")
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            desc: "",
        },
        validationSchema: validDevice,
        onSubmit: createDevice
    })

    async function createDevice(values) {
        await API.post(
            "/devices/",
            {
                name: values.name,
                group: group,
                desc: values.desc
            }
        ).then(res => {
            console.log(res);
            changed();
            setSnackTitle(res.status);
            setSnackMessage("the device is added");
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

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        formik.setFieldValue("name", "");
        formik.setFieldValue("desc", "");
        formik.setFieldTouched("name", false);
        formik.setFieldTouched("desc", false);
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
            <AddDeviceButton onClick={handleOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-device-dialog"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="add-device-dialog" className={classes.root}>
                    <Typography variant="h6">
                        Add Device
                    </Typography>
                    <CloseButton className={classes.closeButton} onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Device name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="desc"
                            name="desc"
                            label="Description"
                            type="text"
                            value={formik.values.desc}
                            onChange={formik.handleChange}
                            error={formik.touched.desc && Boolean(formik.errors.desc)}
                            helperText={formik.touched.desc && formik.errors.desc}
                        />
                        <DialogActions>
                            <AddButton variant="contained" type="submit" />
                        </DialogActions>
                    </form>
                </DialogContent>
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