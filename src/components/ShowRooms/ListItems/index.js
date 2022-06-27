import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function ListItems(props) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.rooms.map(
        ({ building, capacity, name, occupied, type }, index) => (
          <React.Fragment key={`${building} ${name} (${type})`}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${name} (${type})`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${building} Building, Capacity: ${capacity}, Occupied: ${occupied}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )
      )}
    </List>
  );
}
