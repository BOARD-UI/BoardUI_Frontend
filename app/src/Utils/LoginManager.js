import $ from "jquery";

export class LoginManager {
  
  constructor(document){

    this._api = process.env.REACT_APP_API_URL;
    this.tabs = document.getElementsByClassName("card_tab");
    this.cards = document.getElementsByClassName("card_body");
    this.inputs = document.getElementsByClassName("form_input-text");
    this._formSchemas = {
      loginForm: ["login_username", "login_password"],
      regForm: ["reg_name", "reg_username", "reg_mail", "reg_password"],
    };

  }

  init () {
    document.getElementById("signin_button").addEventListener("click", () => {
      this.postRegister();
    });
    document.getElementById("login_button").addEventListener("click", () => {
      this.postLogin();
    });

    for (let tab of this.tabs) {
      tab.addEventListener(
        "click",
        (evt) => {
          this._clickTab(evt);
        },
        false
      );
    }

    for (let input of this.inputs) {
      input.addEventListener(
        "focusin",
        (evt) => {
          evt.target.parentElement.classList.add("active");
        },
        false
      );
      input.addEventListener(
        "focusout",
        (evt) => {
          evt.target.parentElement.classList.remove("active");
        },
        false
      );
    }
  };

  _fixForm(toClear, toSend){
    for (let argument of this._formSchemas[toClear]) {
      let htmlElement = document.getElementById(argument);
      htmlElement.name = "";
    }
    for (let argument of this._formSchemas[toSend]) {
      let htmlElement = document.getElementById(argument);
      htmlElement.name = argument.replace("login_", "").replace("reg_", "");
    }
  };

  postRegister(){
    this._fixForm("loginForm", "regForm");
    this._form.action = this._api+"/users";
    this._form.submit();
  };

<<<<<<< HEAD:app/src/Utils/LoginManager.js
  postLogin(){
    this._fixForm("regForm", "loginForm");
    this._form.action = this._api+"/authenticate";
    this._form.submit();
  };

  _clickTab(evt){
=======
  let _clickTab = function (evt) {
>>>>>>> 269a5ede0b397fb8d4b6bdb02a74249831e6ce1d:app/public/js/LoginWindowManager.js
    evt.preventDefault();
    let activeTab = evt.target.classList.contains("card_tab")
      ? evt.target
      : evt.target.parentElement;
    let activeCard = document.getElementById(
      activeTab.href.replaceAll("tab:", "")
    );
    for (let card of this.cards) {
      card.classList.remove("active");
    }
    for (let tab of this.tabs) {
      tab.classList.remove("active");
    }
    activeTab.classList.add("active");
    activeCard.classList.add("active");
    return false;
  };
<<<<<<< HEAD:app/src/Utils/LoginManager.js
};
=======

  return {
    init: init,
    register: postRegister,
  };
})();
>>>>>>> 269a5ede0b397fb8d4b6bdb02a74249831e6ce1d:app/public/js/LoginWindowManager.js
