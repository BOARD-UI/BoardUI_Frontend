import { MenuButton } from "../Components/MenuButton";
import { TabBar } from "../Components/TabBar";

import "../css/WindowHeader.css";

export function WindowHeader({ showMenu }) {
    return (
        <div className="window_header">
            <div className="window_header-tabs">
                <MenuButton showMenu={showMenu} />
                <TabBar />
            </div>
        </div>
    );
}