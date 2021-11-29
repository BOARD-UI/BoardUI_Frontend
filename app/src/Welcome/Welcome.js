import React from "react";
import "./Welcome.css";
import { CardUI } from "../CardUI/CardUI";
import LogoSvg from "../img/world.svg";
import { render } from "react-dom";

function Welcome(props) {
  return (
    <React.Fragment>
      <div className="Container">
        <img className="imgsvg" src={LogoSvg} alt="BoardUI Logo" />
        {<CardUI />}
      </div>
    </React.Fragment>
  );
}
export { Welcome };
