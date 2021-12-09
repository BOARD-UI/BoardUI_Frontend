export class LoginManager {
  
  constructor(document){
    this._api = process.env.REACT_APP_API_URL;
    this.tabs = document.getElementsByClassName("card_tab");
    this.cards = document.getElementsByClassName("card_body");
    this.inputs = document.getElementsByClassName("form_input-text");
    this.init();
  }

  init () {

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

  _clickTab(evt){
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
  
};
