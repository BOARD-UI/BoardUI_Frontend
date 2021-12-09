import { useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";
import { MenuSection } from "./MenuSection";
import "../css/RoomMenu.css"

export function Menu({ menuIsHidden }) {
    let menuStyles = "window_rooms-menu" + (menuIsHidden ? "" : " active");
    const { state, disconnect } = useContext(AppContext);
    return (
        <div className={menuStyles}>
            <div className="content active">
                <MenuSection
                    title="Rooms"
                    id="window_menu-rooms"
                    type="Rooms"
                    buttons={state.rooms}
                />
                <MenuSection
                    title="Files"
                    id="window_menu-files"
                    type="Files"
                    buttons={state.files}
                />
                <div className="disconnect_container">
                    <button 
                        className={"disconnect_container-btn"}
                        disabled={state.currentRoom === null}
                        onClick={disconnect}
                    >   
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    );
}
