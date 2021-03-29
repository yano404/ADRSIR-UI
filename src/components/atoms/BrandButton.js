import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function BrandButton({ title, onClick, color = "inherit" }) {
    return (
        <Button
            color={color}
            onClick={onClick}
        >
            <Typography variant="h6" noWrap>
                {title}
            </Typography>
        </Button>
    );
}