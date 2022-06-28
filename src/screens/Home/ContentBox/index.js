import * as React from "react";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import About from "../../../components/About";
import ShowRooms from "../../../components/ShowRooms";
import Reports from "../../../components/Reports";
import AddRoom from "../../../components/AddRoom";
import AddCourses from "../../../components/AddCourses";
import ShowCourses from "../../../components/ShowCourses";
import {
  ABOUT,
  ADD_ROOM,
  SHOW_ROOMS,
  ADD_COURSES,
  SHOW_COURSES,
  REPORTS,
} from "../SideDrawer/constants";

export default function ContentBox(props) {
  const components = {
    [ABOUT]: <About userData={props.userData} />,
    [ADD_ROOM]: <AddRoom userData={props.userData} />,
    [SHOW_ROOMS]: <ShowRooms userData={props.userData} />,
    [REPORTS]: <Reports userData={props.userData} />,
    [ADD_COURSES]: <AddCourses userData={props.userData} />,
    [SHOW_COURSES]: <ShowCourses userData={props.userData} />,
  };

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
