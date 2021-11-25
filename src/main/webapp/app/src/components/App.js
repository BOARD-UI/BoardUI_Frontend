import React from "react";
import "../css/App.css";
import { Routes, Route } from "react-router-dom";

import { Welcome } from "./Welcome";
import { Home } from "./Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/index" element={<Welcome />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export { App };
