import svg404 from "../Commons/Statics/img/404.svg";
import "./css/Page404.css";
import { AppContext } from "../Commons/Components/ContextProvider";
import { useContext } from "react";

export function Page404(){
    console.log(useContext(AppContext)); 
    return (
        <div className="container">
            <img className="imgsvg" src={svg404} alt="Page not found" />
        </div>
    );
}