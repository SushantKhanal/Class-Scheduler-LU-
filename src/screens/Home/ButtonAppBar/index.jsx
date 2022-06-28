import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default class ButtonAppBar extends React.Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }} style={{ zIndex: 10 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LU Scheduling System
            </Typography>
            <Button color="inherit" onClick={() => this.props.onLogOutSuccess()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

