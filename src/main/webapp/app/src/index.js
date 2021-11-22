import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { App } from "./components/App";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Montserrat", "sans-serif"],
  },
});
ReactDOM.render(<App />, document.getElementById("root"));
