import ButtonAppBar from "./ButtonAppBar";
import SideDrawer from "./SideDrawer";
import Emitter from "../../shared/Emitter";
import { updateLocalStorageUserData } from "../../utils/localStorageService";
import { LOGOUT_EVENT } from "../../constants";
import React from "react";

export default class Home extends React.Component {
  onLogOutSuccess = () => {
    updateLocalStorageUserData(null, false);
    Emitter.emit(LOGOUT_EVENT, null);
  };

  render() {
    return (
      <div>
        <ButtonAppBar
          onLogOutSuccess={() => {
            this.onLogOutSuccess({});
          }}
        />
        <SideDrawer />
      </div>
    );
  }
}
