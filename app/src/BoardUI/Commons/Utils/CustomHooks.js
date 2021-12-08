import { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AppContext } from "../Components/ContextProvider";

export function useToggleClass(className) {

    const [style, setStyle] = useState("");

    function toggleStyle() {
        if (!style) setStyle(className);
        else setStyle("");
    };

    return [style, toggleStyle];
}

export function LoginLogoutServices() {
    const { auth } = useContext(AppContext);
    const authHandler = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const login = async () => {
      try {
        await signInWithEmailAndPassword(authHandler, email, password);
        auth.setIsAuthenticated(true);
        console.log(authHandler.currentUser);
      } catch (error) {
        console.log(error);
      }
      
    };
  
    const logout = async () => {
      await signOut(authHandler);
      auth.setIsAuthenticated(false);
    };
  
    return {
      email,
      setEmail,
      password,
      setPassword,
      login,
      logout
    };
}