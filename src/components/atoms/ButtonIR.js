import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import API from "../../api";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 50
    }
}));

export default function ButtonIR({ code }) {
    const classes = useStyles();

    return (
        <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={() => {
                const transmit = async () => {
                    await API.post(
                        `/codes/${code.id}/transmit/`
                    )
                }
                transmit()
            }
            }
            className={classes.root}
        >
            {code.name}
        </Button >
    )
}