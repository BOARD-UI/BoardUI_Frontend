import { useContext} from "react";
import { Route, Routes } from "react-router";

import { ProtectedRoute } from "./Commons/Components/ProtectedRoute";
import { AppContext } from "../BoardUI/Commons/Components/ContextProvider";
import { Home } from "./Home/Home";
import { Welcome } from "./Welcome/Welcome";
import { Page404 } from "./Page404/Page404";

export function App() {
    
    const { auth } = useContext(AppContext);
    auth.setCurrentUsername("J-382")
    auth.setIsAuthenticated(true);
    return (
        <Routes>
            <Route exact path="/" 
                element={
                    <ProtectedRoute 
                        element={<Welcome />}
                        condition={ !auth.isAuthenticated }
                        redirect="/home"
                    />
                }
            />
            <Route exact path="/home" 
                element={
                    <ProtectedRoute 
                        element={<Home />}
                        condition={ auth.isAuthenticated } 
                        redirect="/" 
                    />
                } 
            />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}