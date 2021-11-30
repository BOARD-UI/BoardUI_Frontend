import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Welcome } from "../Welcome/Welcome";
import { Auth } from "./Auth";
import { Home } from "../Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/index" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Test" element={<Auth />} />
      </Routes>
    </div>
  );
}

export { App };
