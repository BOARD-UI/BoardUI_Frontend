import React from "react";
import "./D&DZone.css";

function DDZone(props) {
  return (
    <div>
      <div class="file_loader-container">
        <div id="file_loader" class="file_loader">
          <i class="fas fa-upload"></i>
          <span>Drag files</span>
        </div>
        <div class="file_loader-btns">
          <input
            class="file_loader-btn"
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
