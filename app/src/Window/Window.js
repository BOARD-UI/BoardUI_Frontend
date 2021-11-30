import React from "react";
import "./Window.css";
import { WindowBody } from "../WindowBody/WindowBody";
import { WindowHeader } from "../WindowHeader/WindowHeader";
import { WindowManager } from "../Utils/WindowManager"
import { RoomManager } from "../Utils/RoomManager"
import { UploadManager } from "../Utils/UploadManager"
import { LoginManager } from "../Utils/LoginManager"

class Window extends React.Component {
  
  constructor(props) {
    super(props);
    this.windowManager = null;
    this.roomManager = null;
  }

  componentDidMount() {
    this.windowManager = new WindowManager(document.getElementById("window"));
    this.roomManager = new RoomManager();
    this.UploadManager = new UploadManager(document.getElementById("window"));
  }

  render() {
    return (
      <div className="window" id="window">
        {<WindowHeader />}
        {<WindowBody />}
      </div>
    );
  };
}

export { Window };
