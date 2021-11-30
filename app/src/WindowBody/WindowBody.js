import React from "react";
import "./WindowBody.css";
import { CardButton } from "../CardButton/CardButton";

import { DDZone } from "../D&DZone/D&DZone";
import { LoginLogoutServices } from "../LoginLogOut/LoginLogoutServices";

function WindowBody() {
  const { logout } = LoginLogoutServices();
  return (
    <div className="window_body">
      <div id="window_rooms-menu" className="window_rooms-menu">
        <div className="content">
          <div className="window_rooms-menu-subgroup">
            <div className="title">
              <h5>Rooms</h5>
              <i
                className="window_header-btn fas fa-plus"
                id="add_room-btn"
              ></i>
              <div className="room_menu" id="room_menu">
                <input
                  type="text"
                  id="room_menu-input"
                  className="room_menu-input"
                  placeholder="Room"
                />
                <div className="checkbox">
                  <input type="checkbox" id="room_menu-cb" />
                  <label htmlFor="room_menu-cb"> Create room?</label>
                </div>
                <i className="fas fa-paper-plane" id="room_menu-btn"></i>
              </div>
            </div>
            <div className="content" id="window_menu-rooms"></div>
          </div>
          <div className="window_rooms-menu-subgroup">
            <div className="title">
              <h5>Files</h5>
            </div>
            <div className="content" id="window_menu-files"></div>
            {
              <CardButton
                text="Log out"
                id="logout_button"
                functionToDo={logout}
              />
            }
          </div>
        </div>
      </div>
      <div className="content" id="window_body-content">
        {<DDZone />}
      </div>
    </div>
  );
}

export { WindowBody };
