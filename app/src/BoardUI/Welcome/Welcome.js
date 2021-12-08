import React from "react";

import "./css/Welcome.css";
import LogoSvg from "../Commons/Statics/img/world.svg";

import { CardUI } from "./Components/CardUI";
import { LoginManager } from "../Commons/Utils/LoginManager";

class Welcome extends React.Component {

  componentDidMount() {
    this.loginManager = new LoginManager(document.getElementById("welcome-container"));
  }

  render() {

    return (
      <div className="Container" id="welcome-container">
        <img className="imgsvg" src={LogoSvg} alt="BoardUI Logo" />
        {
          <CardUI/>
        }
      </div>
    );

  }
  
}
export { Welcome };
