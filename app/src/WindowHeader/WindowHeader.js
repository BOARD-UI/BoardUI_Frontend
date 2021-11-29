import React from "react";
import "./WindowHeader.css";
import { TabsButton } from "../TabsButton/TabsButton";

function WindowHeader() {
  return (
    <div className="window_header">
      <div className="window_header-tabs">
        {<TabsButton class1="fas fa-columns" class2="fas fa-angle-down" />}
        <i className="fas fa-less-than window_header-btn header_scroll-btn"></i>
        <div
          className="window_header-tab-bar"
          id="window_header-scroll-bar"
        ></div>

        <i className="window_header-btn fas fa-greater-than header_scroll-btn"></i>
        <i
          className="window_header-btn fas fa-plus desactive"
          id="add_tab-btn"
        ></i>
      </div>
    </div>
  );
}
export { WindowHeader };
