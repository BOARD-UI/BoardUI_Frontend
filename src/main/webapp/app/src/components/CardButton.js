import React from "react";
import "../css/CardButton.css";

function CardButton(props) {
  const id = props.text + "_button";
  return (
    <input
      type="submit"
      value={props.text}
      className="form_input-button"
      id={id}
    />
  );
}

export { CardButton };
