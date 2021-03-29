import { Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import DeleteCodeDialog from "../organisms/DeleteCodeDialog";
import EditCodeDialog from "../organisms/EditCodeDialog";

const useStyles = makeStyles((theme) => ({
    tableHead: {
        backgroundColor: theme.palette.grey[50],
        fontWeight: "bold"
    }
}));

export default function CodeTable({ codes, changed }) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table aria-label="code table">
                <TableHead>
                    <TableRow>
                        <TableCell width={70} className={classes.tableHead}>ID</TableCell>
                        <TableCell width={200} className={classes.tableHead}>Name</TableCell>
                        <TableCell className={classes.tableHead}>Description</TableCell>
                        <TableCell align="center" width={160} className={classes.tableHead}>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {codes.map((code) => (
                        <TableRow key={code.id}>
                            <TableCell component="th" scope="row">
                                {code.id}
                            </TableCell>
                            <TableCell>{code.name}</TableCell>
                            <TableCell>{code.desc}</TableCell>
                            <TableCell >
                                <Grid
                                    container
                                    spacing={0}
                                    justify="flex-end"
                                    alignItems="center"
                                >
                                    <Grid item xs>
                                        <EditCodeDialog
                                            code={code}
                                            changed={changed}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <DeleteCodeDialog
                                            code={code}
                                            changed={changed}
                                        />
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}