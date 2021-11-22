import React from "react";
import "../css/CardUI.css";
import { CardButton } from "./CardButton";
import { CardInput } from "./CardInput";
import Icon from "../img/icon.png";

function CardUI() {
  return (
    <div className="card" id="card">
      <div className="card_header">
        <a href="tab:login" className="card_tab active">
          <span>Login</span>
          <span>Hello There!</span>
        </a>
        <a href="tab:register" className="card_tab">
          <span>Sign in</span>
          <span>New in town, huh?</span>
        </a>
      </div>
      <form action="" method="POST" name="f">
        {
          <div className="card_body active" id="login">
            <div className="centered_column form_logo">
              <img src={Icon} alt="" />
            </div>

            <div className="centered_column">
              {
                <CardInput
                  place="Username"
                  id="login_username"
                  icon="fas fa-user"
                  type="text"
                />
              }
              {
                <CardInput
                  place="Password"
                  id="login_password"
                  icon="fas fa-unlock-alt"
                  type="password"
                />
              }
            </div>

            <div className="centered_column card_body-end">
              <div className="centered_row form_options">
                <div>
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    className="form_input-check"
                  />
                  <label className="form_option-label">Remember me</label>
                </div>
                <div>
                  <a
                    href="https://www.google.com"
                    className="form_option-anchor"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              {<CardButton text="Login" id="login_button" />}
            </div>
          </div>
        }

        <div className="card_body" id="register">
          <div className="centered_column form_logo">
            <img src={Icon} alt="" />
          </div>
          <div className="centered_column">
            {
              <CardInput
                place="Name"
                id="reg_name"
                icon="far fa-user"
                type="text"
              />
            }
            {
              <CardInput
                place="Username"
                id="reg_username"
                icon="fas fa-user"
                type="text"
              />
            }

            {
              <CardInput
                place="Mail"
                id="reg_email"
                icon="fas fa-envelope"
                type="text"
              />
            }

            {
              <CardInput
                place="Password"
                id="reg_password"
                icon="fas fa-unlock-alt"
                type="password"
              />
            }
            <div className="centered_column card_body-end">
              {<CardButton text="Sign in" id="signin_button" />}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export { CardUI };
