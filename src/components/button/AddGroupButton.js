import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function AddGroupButton({ onClick }) {
    return (
        <List>
            <ListItem button key={`add-group`} onClick={onClick}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Group" />
            </ListItem>
        </List>
    );
}