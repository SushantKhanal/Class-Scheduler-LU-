import * as React from "react";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import About from "../../../components/About";
import ShowRooms from "../../../components/ShowRooms";
import Reports from "../../../components/Reports";
import AddRoom from "../../../components/AddRoom";
import {
  ABOUT,
  ADD_ROOM,
  SHOW_ROOMS,
  REPORTS,
} from "../SideDrawer/constants";

let components = {
  [ABOUT]: <About />,
  [ADD_ROOM]: <AddRoom />,
  [SHOW_ROOMS]: <ShowRooms />,
  [REPORTS]: <Reports />,
};

export default function ContentBox(props) {
  const getSuitableComponent = (currentDrawerTab) => {
    let component = components[currentDrawerTab];
    return component;
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
      }}
    >
      {/*     Show Content Based on what is selected in the Sidebar */}
      <Toolbar />
      <h3>{props.currentDrawerTab}</h3>
      {getSuitableComponent(props.currentDrawerTab)}
    </Box>
  );
}
