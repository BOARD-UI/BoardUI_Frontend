import { RoomButton } from "./RoomButton";
import { FileButton } from "./FileButton";
import { RoomSubmenuBtn } from "./RoomSubmenu"
import { AppContext } from "../../Commons/Components/ContextProvider";
import { useContext } from "react";

export function MenuSection({ title, id, type, buttons }) {
    const { leaveRoom } = useContext(AppContext);

    function renderButtons() {
        if (type === "Rooms") {
            return buttons.map((room, index) => (
                <RoomButton
                    title={room.title}
                    roomId={room.roomId}
                    key={index}
                    deleteRoom={() => {leaveRoom(room.roomId)}}
                />
            ));
        }
        else {
            return buttons.map((file, index) => (
                <FileButton
                    name={file.name}
                    fileId={file.fileId}
                    extension={file.extension}
                    key={index}
                />
            ));
        }
    }

    return (
        <div className="window_rooms-menu-subgroup">
            <div className="title">
                <h5>{title}</h5>
                {type === "Rooms" ?
                    <RoomSubmenuBtn />
                    : null
                }
            </div>
            <div className="content" id={id}>
                {
                    renderButtons()
                }
            </div>
        </div>
    )
}