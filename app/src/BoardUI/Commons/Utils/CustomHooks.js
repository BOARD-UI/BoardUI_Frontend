import { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AppContext } from "../Components/ContextProvider";
import $ from "jquery";

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const getUsernameByEmail = (username, password) => {
      let user = {username, password}
      return $.ajax({
          url: process.env.REACT_APP_API_URL+"/authentication",
          type: 'POST',
          data: JSON.stringify(user),
          contentType: "application/json",
          error: function(req, err){ console.log('Error: ' + req + "\n" + err); },
          complete: function(data) { return data; }
      });
    }
  
    const login = async () => {
      try {
        let userEmail = await getUsernameByEmail(username,password);
        await signInWithEmailAndPassword(authHandler, userEmail, password);
        auth.setCurrentUsername(username);
        auth.setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
      
    };
  
    const logout = async () => {
      await signOut(authHandler);
      auth.setIsAuthenticated(false);
    };
  
    return {
      username,
      setUsername,
      password,
      setPassword,
      login,
      logout
    };
}