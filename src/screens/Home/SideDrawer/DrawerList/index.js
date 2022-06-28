import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ABOUT } from "../constants";

export default function DrawerList(props) {
  let [currentDrawerTab, setCurrentDrawerTab] = React.useState(ABOUT);
  return (
    <div>
      <List>
        {props.list.map((text, index) => (
          <ListItem
            button
            key={text}
            style={{
              backgroundColor: currentDrawerTab === text ? "#b0ceec" : "",
            }}
            onClick={() => {
              props.changeCurrentTabHandler(text);
              setCurrentDrawerTab(text);
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
