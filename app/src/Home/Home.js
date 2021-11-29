import React from "react";
import { render } from "react-dom";
import "./Home.css";
import { Window } from "../Window/Window";

const Home = () => <div className="Container">{<Window />}</div>;

export { Home };
