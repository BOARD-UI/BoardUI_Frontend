import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./BoardUI/Commons/Config/firebase-config";

import { App } from "./BoardUI/BoardUI";
import "./BoardUI/Commons/Statics/css/index.css";
import { ContextProvider } from "./BoardUI/Commons/Components/ContextProvider";


ReactDOM.render(
  <BrowserRouter>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <React.StrictMode>
        <Suspense fallback={"Conectando la app..."}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </Suspense>
      </React.StrictMode>
    </FirebaseAppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
