import Grid from "@material-ui/core/Grid";
import DeviceCard from "../molecules/DeviceCard";

export default function DeviceList({ devices }) {
    return (
        <Grid
            container
            spacing={3}
            alignItems="stretch"
            justify="flex-start"
        >
            {
                devices.map((device, id) => (
                    <Grid item key={`device-${id}`} xs={12} xl={6}>
                        <DeviceCard device={device} />
                    </Grid>
                ))
            }
        </Grid>
    );
}