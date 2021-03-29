import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

export default function AddCodeButton({ onClick }) {
    return (
        <Button
            aria-label="add code"
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={<AddIcon />}
        >
            <Typography variant="body1" noWrap>
                Add Code
            </Typography>
        </Button>
    );
}