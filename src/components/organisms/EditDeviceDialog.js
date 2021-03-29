import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import API from "../../api";
import CloseButton from '../atoms/CloseIconButton';
import EditIconButton from "../atoms/EditIconButton";
import SubmitButton from '../atoms/SubmitButton';
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
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 240
    }
}));

export default function EditDeviceDialog({ device, changed, groups }) {
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
        group: yup
            .string("Choose a group")
            .required(),
        desc: yup
            .string("Enter description")
    });
    const formik = useFormik({
        initialValues: {
            name: device.name,
            group: device.desc,
            desc: device.desc,
        },
        validationSchema: validDevice,
        onSubmit: updateDevice
    })

    async function updateDevice(values) {
        await API.put(
            `/devices/${device.id}`,
            {
                name: values.name,
                group: values.group,
                desc: values.desc
            }
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

    const handleOpen = () => {
        setOpen(true);
        formik.setFieldValue("name", device.name);
        formik.setFieldValue("group", device.group);
        formik.setFieldValue("desc", device.desc);
        formik.setFieldTouched("name", false);
        formik.setFieldTouched("group", false);
        formik.setFieldTouched("desc", false);
    }

    const handleClose = () => {
        setOpen(false);
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
            <EditIconButton onClick={handleOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-device-dialog"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="edit-device-dialog" className={classes.root}>
                    <Typography variant="h6">
                        Edit Device
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
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-group-label">
                                Select Group
                            </InputLabel>
                            <Select
                                labelId="select-group-label"
                                id="group"
                                name="group"
                                value={formik.values.group}
                                onChange={formik.handleChange}
                                error={formik.touched.group && Boolean(formik.errors.group)}
                            >
                                {groups.map((group_name, index) => (
                                    <MenuItem value={group_name} key={`group-select-${index}`}>
                                        {group_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.group && formik.errors.group}</FormHelperText>
                        </FormControl>
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
                            <SubmitButton variant="contained" type="submit" />
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