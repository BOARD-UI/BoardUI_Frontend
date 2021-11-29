import React, { useState } from "react";
import "./Welcome.css";
import { CardUI } from "../CardUI/CardUI";
import LogoSvg from "../img/world.svg";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";
import { async } from "@firebase/util";

function Welcome(props) {
  const firebase = useFirebaseApp();
  const authGet = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = authGet.currentUser;

  const login = async () => {
    await signInWithEmailAndPassword(authGet, email, password);
    console.log(user);
    console.log("Autentcado");
  };

  return (
    <React.Fragment>
      <div className="Container">
        <img className="imgsvg" src={LogoSvg} alt="BoardUI Logo" />
        {
          <CardUI
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            login={login}
          />
        }
      </div>
    </React.Fragment>
  );
}
export { Welcome };
