import React from "react";
import "./Window.css";
import { WindowBody } from "../WindowBody/WindowBody";
import { WindowHeader } from "../WindowHeader/WindowHeader";

function Window() {
  return (
    <div className="window" id="window">
      {<WindowHeader />}
      {<WindowBody />}
    </div>
  );
}

export { Window };
