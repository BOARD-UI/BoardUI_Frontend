import React from "react";
import "./Home.css";
import { Window } from "../Window/Window";
import { LoginLogoutServices } from "../LoginLogOut/LoginLogoutServices";
import { Navigate } from "react-router-dom";

function Home() {
  const { userA, isAuthenticated } = LoginLogoutServices();
  console.log(userA, isAuthenticated, "Diablo");
  if (isAuthenticated) {
    console.log("Diablo");
  }

  return <div className="Container">{<Window />}</div>;
}

export { Home };
