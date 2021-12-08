import { useContext, useState } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

import "../css/RoomSubmenu.css"

export function RoomSubmenuBtn() {
    const { showPopup } = useContext(AppContext);

    return (
        <i
            className="window_header-btn fas fa-plus"
            id="add_room-btn"
            onClick={showPopup}
        />
    );
}


export function RoomSubmenu() {
    const { popUpIsHidden, hidePopup, connectToRoom, createNewRoom } = useContext(AppContext);
    const [mode, setMode] = useState("Join");
    const [roomText, setRoomText] = useState("");

    const changeMode = (mode) => {
        setMode(mode);
    }

    const createOrJoinRoom = () => {
        if (mode === 'Create'){
            createNewRoom(roomText);
        }else {
            connectToRoom(roomText);
        }
    }

    return (
        <div className={"pop_container" + (popUpIsHidden ? "" : " active")} onClick={hidePopup}>
            <div className="Room_Submenu" onClick={(e) => {e.stopPropagation()}}>
                <div className="Room_Submenu-header">
                    <div className="Room_Submenu-header-tabs">
                        <button className={mode === "Join" ? "active" : ""} onClick={() => changeMode("Join")}>
                            Join
                        </button>
                        <button className={mode !== "Join" ? "active" : ""} onClick={() => changeMode("Create")}>
                            Create
                        </button>
                    </div>
                </div>
                <div className="Room_Submenu-body">
                    <input 
                        type="text" 
                        placeholder={"Room " + (mode === "Join" ? "url" : "name")}
                        value={roomText}
                        onChange={(e) => {setRoomText(e.target.value)}}
                        />
                    <button onClick={createOrJoinRoom}>{mode}</button>
                </div>
            </div>
        </div>
    );
}

