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
import CloseButton from '../atoms/CloseIconButton';
import EditIconButton from "../atoms/EditIconButton";
import SubmitButton from '../atoms/SubmitButton';
import AlertSnackbar from '../molecules/AlertSnackbar';
import CodeField from '../molecules/CodeField';


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

export default function EditCodeDialog({ code, changed }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackTitle, setSnackTitle] = React.useState("");
    const [snackMessage, setSnackMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("error");

    const validCode = yup.object({
        name: yup
            .string("Enter code name")
            .trim()
            .required("Name is required"),
        code: yup
            .string("Enter code")
            .matches(/^[0-9A-Fa-f]+$/, "Code is incorrect")
            .required("Code is required"),
        desc: yup
            .string("Enter description")
    });

    const formik = useFormik({
        initialValues: {
            name: code.name,
            code: code.code,
            desc: code.desc,
        },
        validationSchema: validCode,
        onSubmit: updateCode
    })

    async function updateCode(values) {
        await API.put(
            `/codes/${code.id}`,
            {
                name: values.name,
                code: values.code,
                desc: values.desc,
                device_id: code.device_id
            }
        ).then(res => {
            console.log(res);
            changed();
            setSnackTitle(res.status);
            setSnackMessage("the code is updated");
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
        formik.setFieldValue("name", code.name);
        formik.setFieldValue("code", code.code);
        formik.setFieldValue("desc", code.desc);
        formik.setFieldTouched("name", false);
        formik.setFieldTouched("code", false);
        formik.setFieldTouched("desc", false);
        setOpen(true);
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

    const readMemory = async () => {
        await API.get("/read/0")
            .then(res => {
                formik.setFieldValue("code", res.data.code)
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    return (
        <div>
            <EditIconButton onClick={handleOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-code-dialog"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="edit-code-dialog" className={classes.root}>
                    <Typography variant="h6">
                        Edit Code
                    </Typography>
                    <CloseButton className={classes.closeButton} onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <CodeField
                            fullWidth
                            id="code"
                            name="code"
                            label="Code"
                            type="text"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                            onClick={readMemory}
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