import { Box, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from "clsx";
import React from "react";
import API from "../../api";
import ExpandMoreIconButton from "../atoms/ExpandMoreIconButton";
import AddCodeDialog from "../organisms/AddCodeDialog";
import DeleteDeviceDialog from "../organisms/DeleteDeviceDialog";
import EditDeviceDialog from "../organisms/EditDeviceDialog";
import CodeTable from "./CodeTable";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function DeviceSettingsCard({ device, changed, groups }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [codes, setCodes] = React.useState([]);
    const [codeChanged, setCodeChanged] = React.useState(0);

    React.useEffect(getCodes, [device, codeChanged]);

    async function getCodes() {
        await API.get(
            `/devices/${device.id}/codes`
        ).then(res => {
            console.log(device.id);
            console.log(device.name);
            console.log(res);
            const data = res.data;
            setCodes(data);
        }).catch(error => {
            console.log(error.responce);
        })
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCodeChanged = () => {
        setCodeChanged(codeChanged + 1);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                titleTypographyProps={{ variant: "h5", align: "left" }}
                title={device.name}
                action={
                    <Grid
                        container
                        spacing={0}
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Grid item xs>
                            <EditDeviceDialog
                                device={device}
                                changed={changed}
                                groups={groups}
                            />
                        </Grid>
                        <Grid item xs>
                            <DeleteDeviceDialog
                                device={device}
                                changed={changed}
                            />
                        </Grid>
                    </Grid>
                }
            />
            <Divider />
            <CardContent>
                <Typography variant="body2" component="p">
                    {device.desc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMoreIconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-label="show more"
                    aria-expanded={expanded}
                />
            </CardActions>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
            >
                <CardContent>
                    <CodeTable
                        codes={codes}
                        changed={handleCodeChanged}
                    />
                    <Box
                        display="flex"
                        flexDirection="row-reverse"
                        pt={2}
                        m={1}
                    >
                        <AddCodeDialog
                            device={device}
                            changed={changed}
                        />
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
}