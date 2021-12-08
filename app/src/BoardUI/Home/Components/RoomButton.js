import { useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

export function RoomButton({ title, roomId, deleteRoom }) {
    const { getFiles, state } = useContext(AppContext);

    return (
        <div 
            className={"room-btn" + (state.currentRoom === roomId ? " active" : "")} 
            onClick={() => { getFiles(roomId); state.setConnectedToRoom(true) }}
        >
            <i className="far fa-window-restore"></i>
            <span>{title}</span>
            <i className="fas fa-minus-circle" 
                onClick={roomId !== null ? deleteRoom : null}>
            </i>
        </div>
    );
}