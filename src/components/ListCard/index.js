import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Card } from "@mui/material";

const ListCard = ({ title, array }) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 275, pt: 2, pl: 2 }}>
      <h2 className="heading_secondary">{title}</h2>
      <List dense={false}>
        {array.map((search, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton>
                <a href={`/search/${search}`}>
                  <ListItemText
                    primary={`${index + 1} ${search}`}
                    primaryTypographyProps={{
                      fontSize: 20,
                      fontWeight: "medium",
                      letterSpacing: 0,
                    }}
                  />
                </a>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default ListCard;
