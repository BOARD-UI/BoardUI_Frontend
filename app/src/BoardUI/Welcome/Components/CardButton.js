import React from "react";
import "../css/CardButton.css";

function CardButton(props) {
  return (
    <input
      type="submit"
      value={props.text}
      className="form_input-button"
      id={props.id}
      onClick={() => props.functionToDo()}
    />
  );
}

export { CardButton };
