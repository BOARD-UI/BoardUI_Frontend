import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Welcome } from "../Welcome/Welcome";
import { Home } from "../Home/Home";
import { Auth } from "./Auth";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/index" element={<Welcome />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Test" element={<Auth />} />
      </Routes>
    </div>
  );
}

export { App };
