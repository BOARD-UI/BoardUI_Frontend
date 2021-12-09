import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

import { WindowHeader } from "./WindowHeader";
import { WindowBody } from "./WindowBody";

import "../css/Window.css";

export function Window() {
    const [menuIsHidden, setmenuIsHidden] = useState(true);
    const { getRooms, auth} = useContext(AppContext);

    useEffect(() => {
        getRooms(auth.currentUsername);
    }, [auth.currentUsername]);

    const showMenu = () => {
        setmenuIsHidden(!menuIsHidden);
    }
    return (
        <div className="window" id="window">
            <WindowHeader showMenu={showMenu} />
            <WindowBody
                menuIsHidden={menuIsHidden}
            />
        </div>
    );
}

