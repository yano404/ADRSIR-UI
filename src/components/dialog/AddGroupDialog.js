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
import AddButton from '../button/AddButton';
import AddGroupButton from "../button/AddGroupButton";
import CloseButton from '../button/CloseIconButton';

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

export default function AddGroupDialog({ groups, setGroups }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const validGroupName = yup.object({
        name: yup
            .string("Enter group name")
            .trim()
            .required("Group name is required")
            .test(
                "Check",
                "Already exist",
                (value) => {
                    if (groups.includes(value)) {
                        console.log("test");
                        return false;
                    } else {
                        return true;
                    }
                }
            )
    });
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: validGroupName,
        onSubmit: (values) => {
            setGroups(groups.concat(values.name));
            handleClose();
        }
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        formik.setFieldValue("name", "");
        formik.setFieldTouched("name", false);
    }

    return (
        <div>
            <AddGroupButton onClick={handleOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-group-dialog-title"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="add-group-dialog-title" className={classes.root}>
                    <Typography variant="h6">
                        Add Group
                    </Typography>
                    <CloseButton className={classes.closeButton} onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Group name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <DialogActions>
                            <AddButton variant="contained" type="submit" />
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}