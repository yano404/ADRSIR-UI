import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';

export default function DrawerItems({ items, onClick }) {
    return (
        <List>
            {items.map((name, index) => (
                <ListItem button key={`group-${index}`} onClick={() => onClick(name)}>
                    <ListItemIcon>
                        <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItem>
            ))}
        </List>
    );
}