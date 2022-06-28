import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import { ABOUT, ADD_ROOM, SHOW_ROOMS, REPORTS } from "./constants";
import DrawerList from "./DrawerList";
import ContentBox from "../ContentBox";
import { getItem } from "../../../utils/localStorageService";

const drawerWidth = 240;

function ResponsiveDrawer() {
  let [currentDrawerTab, setCurrentDrawerTab] = useState(ABOUT);
  const [userData, setUserData] = useState({});

  let drawerItemsList = [ABOUT, ADD_ROOM, SHOW_ROOMS, REPORTS];

  useEffect(() => {
    let userData = getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      setUserData(userData);
    }
  }, [setUserData]);

  const changeCurrentTabHandler = (newTab) => {
    setCurrentDrawerTab(newTab);
  };

  const getDrawerListItems = () => {
    const drawerList =
      userData.userType === "admin"
        ? drawerItemsList
        : drawerItemsList.filter((item) => item !== ADD_ROOM);
    return drawerList;
  };

  useEffect(() => {
    var y = document.getElementsByClassName(
      "MuiDrawer-paper MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft"
    );
    y[0].style.marginTop = "65px";
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <DrawerList
              list={getDrawerListItems()}
              changeCurrentTabHandler={(newTab) => {
                changeCurrentTabHandler(newTab);
              }}
            />
          </Drawer>
        </Box>
        {/* //Content Box is on the right side of Side Drawer */}
        <ContentBox
          drawerWidth={drawerWidth}
          currentDrawerTab={currentDrawerTab}
          userData={userData}
        />
      </Box>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
