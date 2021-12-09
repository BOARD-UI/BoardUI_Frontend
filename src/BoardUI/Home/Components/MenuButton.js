import { useToggleClass } from "../../Commons/Utils/CustomHooks";

export function MenuButton({ showMenu }) {
    const [active, setActive] = useToggleClass("active");

    return (
        <div id="window_rooms-btn" className={"window_rooms-btn window_header-btn " + active} onClick={(evt) => {
            showMenu();
            setActive();
        }}>
            <i className="fas fa-columns"></i>
            <span>|</span>
            <i className="fas fa-angle-down"></i>
        </div>
    );
}