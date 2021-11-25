import React from "react";
import { render } from "react-dom";
import "../css/Home.css";
import { Window } from "./Window";

const Home = () => <div className="Container">{<Window />}</div>;

export { Home };
