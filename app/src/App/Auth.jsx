import React from "react";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";

export default (props) => {
  return (
    <div>
      <div>
        <label htmlFor="email">Correo Electronico</label>
        <input type="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" />
        <button>Iniciar Sesion</button>
      </div>
    </div>
  );
};
