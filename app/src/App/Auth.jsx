import React, { useState } from "react";
//import { auth } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";

function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useFirebaseApp();

  const auth = getAuth();
  const user = auth.currentUser;
  const submit = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut();
  };
  return (
    <div>
      <div>
        <label htmlFor="email">Correo Electronico</label>
        <input
          type="email"
          id="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button onClick={submit}>Iniciar Sesion</button>
      </div>
    </div>
  );
}

export { Auth };
