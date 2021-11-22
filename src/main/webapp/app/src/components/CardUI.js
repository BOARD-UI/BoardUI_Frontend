import React from "react";
import "../css/CardUI.css";
import { CardButton } from "./CardButton";
import { CardInput } from "./CardInput";
import Icon from "../img/icon.png";

function CardUI() {
  return (
    <div class="card" id="card">
      <div class="card_header">
        <a href="tab:login" class="card_tab active">
          <span>Login</span>
          <span>Hello There!</span>
        </a>
        <a href="tab:register" class="card_tab">
          <span>Sign in</span>
          <span>New in town, huh?</span>
        </a>
      </div>
      <form action="" method="POST" name="f">
        {
          <div class="card_body active" id="login">
            <div class="centered_column form_logo">
              <img src={Icon} alt="" />
            </div>

            <div class="centered_column">
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

            <div class="centered_column card_body-end">
              <div class="centered_row form_options">
                <div>
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    class="form_input-check"
                  />
                  <label class="form_option-label">Remember me</label>
                </div>
                <div>
                  <a href="#" class="form_option-anchor">
                    Forgot your password?
                  </a>
                </div>
              </div>
              {<CardButton text="Login" />}
            </div>
          </div>
        }

        <div class="card_body" id="register">
          <div class="centered_column form_logo">
            <img src={Icon} alt="" />
          </div>
          <div class="centered_column">
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
            <div class="centered_column card_body-end">
              {<CardButton text="Sign in" />}
            </div>
          </div>
          /
        </div>
      </form>
    </div>
  );
}

export { CardUI };
