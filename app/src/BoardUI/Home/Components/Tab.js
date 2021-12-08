import { useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

export function Tab({ name, extension, id, openTab, closeTab }) {

    const { state } = useContext(AppContext);
    console.log(closeTab);
    let style = state.activeTab === id ? " active" : "";
    return (
        <div className={"card_tab" + style} onClick={openTab}>
            <span>{name}</span>
            <span>{name + "." + extension}</span>
            <i className="fas fa-times-circle" onClick={closeTab}></i>
        </div>
    );
}
