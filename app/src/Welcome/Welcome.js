import React from "react";
import "./Welcome.css";
import { CardUI } from "../CardUI/CardUI";
import LogoSvg from "../img/world.svg";
import { LoginLogoutServices } from "../LoginLogOut/LoginLogoutServices";

function Welcome() {
  const { email, setEmail, password, setPassword, login } =
    LoginLogoutServices();
  return (
    <React.Fragment>
      <div className="Container">
        <img className="imgsvg" src={LogoSvg} alt="BoardUI Logo" />
        {
          <CardUI
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            login={login}
          />
        }
      </div>
    </React.Fragment>
  );
}
export { Welcome };
