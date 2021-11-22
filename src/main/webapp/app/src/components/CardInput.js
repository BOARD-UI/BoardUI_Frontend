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
        class="form_input-text"
        aria-label={props.place}
        placeholder={props.place}
        id={props.id}
        name={props.place}
      />
    </div>
  );
}

export { CardInput };
