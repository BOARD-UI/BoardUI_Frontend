import React from "react";
import "../css/CardInput.css";

function CardInput(props) {
  return (
    <div className="form_input">
      <span className="form_input-icon">
        <i className={props.icon}></i>
      </span>
      <input
        type={props.type}
        className="form_input-text"
        aria-label={props.place}
        placeholder={props.place}
        id={props.id}
        name={props.place}
        value={props.value}
        onChange={(ev) => props.functionToDo(ev.target.value)}
      />
    </div>
  );
}

export { CardInput };
