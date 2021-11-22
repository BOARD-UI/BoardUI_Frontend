import React from "react";
import "../css/Welcome.css";
import { CardUI } from "./CardUI";
import LogoSvg from "../img/world.svg";
import loginService from "../js/LoginWindowManager";
function Welcome(props) {
  return (
    <React.Fragment>
      <div className="Container">
        <img className="imgsvg" src={LogoSvg} alt="BoardUI Logo" />
        {<CardUI />}
      </div>
      <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"
      ></script>
      <script src={loginService}></script>
		  <scrip>
			window.addEventListener("DOMContentLoaded", () => {
            loginService.init();
        });
	  </scrip>
    </React.Fragment>
  );
}
export { Welcome };
