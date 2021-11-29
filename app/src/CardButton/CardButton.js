import React from "react";
import "./CardButton.css";

function CardButton(props) {
  return (
    <input
      type="submit"
      value={props.text}
      className="form_input-button"
      id={props.id}
    />
  );
}

export { CardButton };
