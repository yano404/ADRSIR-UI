import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import ButtonIR from "../button/ButtonIR";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275
    },
}));

export default function DeviceCard({ device }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                titleTypographyProps={{ variant: "h5", align: "left" }}
                title={device.name}
            />
            <Divider />
            <CardContent>
                <ButtonIRGrid codes={device.codes} />
            </CardContent>
        </Card>
    );
}

function ButtonIRGrid({ codes }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
    }));
    const classes = useStyles();
    const grid_xs_size = codes.length > 3 ? 4 : true;
    const grid_md_size = codes.length > 4 ? 3 : true;

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                alignItems="stretch"
                justify="center"
            >
                {
                    codes.map((code, id) => (
                        <Grid
                            item
                            key={`code-${id}`}
                            xs={grid_xs_size} md={grid_md_size}
                        >
                            <ButtonIR code={code} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}