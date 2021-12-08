import { useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

import { Menu } from "../Components/Menu";
import { ConcurrentTextArea } from "./ConcurrentTextArea";
import { DDZone } from "../Components/DDZone";

import "../css/WindowBody.css";

export function WindowBody({ menuIsHidden }) {
    const { state } = useContext(AppContext);

    return (
        <div className="window_body">
            <Menu
                menuIsHidden={menuIsHidden}
            />
            <div className="content" id="window_body-content">
                {state.currentFile !== null ?
                    <ConcurrentTextArea
                        roomId={state.currentRoom}
                        fileId={state.currentFile}
                    />
                    : (state.currentRoom !== null ? <DDZone roomId={state.currentRoom} /> : null)
                }
            </div>
        </div>
    );
}