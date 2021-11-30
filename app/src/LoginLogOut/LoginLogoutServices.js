import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

function LoginLogoutServices() {
  const authGet = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const userA = authGet.currentUser;

  const login = async () => {
    await signInWithEmailAndPassword(authGet, email, password);
    console.log(userA && "Autenticado");
    setAuthenticated(true);
  };

  const logout = async () => {
    await signOut(authGet);
    console.log("Tas Fuera");
    setAuthenticated(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    login,
    logout,
    userA,
    isAuthenticated,
  };
}

export { LoginLogoutServices };
