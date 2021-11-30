import React from "react";
import "./D&DZone.css";

function DDZone(props) {
  return (
    <div>
      <div className="file_loader-container">
        <div id="file_loader" className="file_loader">
          <i className="fas fa-upload"></i>
          <span>Drag files</span>
        </div>
        <div className="file_loader-btns">
          <input
            className="file_loader-btn"
            type="button"
            value="Upload"
            id="upload-btn"
          />
        </div>
      </div>
    </div>
  );
}

export { DDZone };
