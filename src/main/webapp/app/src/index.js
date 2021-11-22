import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Welcome } from "./components/Welcome";
import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ["Montserrat", "sans-serif"],
  },
});
ReactDOM.render(<Welcome />, document.getElementById("root"));
