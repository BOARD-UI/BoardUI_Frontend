import React from "react";
import "../css/Home.css";
import { Window } from "./Window";

function Home(props) {
  return <div className="Container">{<Window />}</div>;
}

export { Home };
