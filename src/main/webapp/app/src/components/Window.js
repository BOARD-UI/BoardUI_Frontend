import React from "react";
import "../css/Window.css";
import { WindowBody } from "./WindowBody";
import { WindowHeader } from "./WindowHeader";

function Window() {
  return (
    <div className="window" id="window">
      {<WindowHeader />}
      {<WindowBody />}
    </div>
  );
}

export { Window };
