import React from "react";
import "../css/Welcome.css";
import { CardUI } from "./CardUI";
import LogoSvg from "../img/world.svg";

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
