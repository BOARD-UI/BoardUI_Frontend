import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App/App";
import { BrowserRouter } from "react-router-dom";
import firebaseConfig from "./firebase-config";
import { FirebaseAppProvider } from "reactfire";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense fallback={"Conectando la app..."}>
          <App />
        </Suspense>
      </FirebaseAppProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
