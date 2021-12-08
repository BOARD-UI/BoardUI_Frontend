import { useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";
import { Tab } from "./Tab";

import "../css/TabsButton.css";

export function TabBar({ props }) {

    let desactive = " desactive";
    const { state, addTab, changeTab, closeTab } = useContext(AppContext);

    function addNewTab() {
        if (state.connectedToRoom) {
            addTab("Newfile" + state.tabs.length, "", null);
        }
    }

    if (state.connectedToRoom) desactive = "";
    return (
        <>
            <i className="fas fa-less-than window_header-btn header_scroll-btn"></i>
            <div className="window_header-tab-bar" id="window_header-scroll-bar">
                {
                    state.tabs.map((tab, index) => {
                        return <Tab
                            name={tab.name}
                            extension={tab.extension}
                            key={index}
                            id={index}
                            openTab={() => (changeTab(index))}
                            closeTab={closeTab}
                        > 
                        </Tab>
                    })
                }
            </div>
            <i className="window_header-btn fas fa-greater-than header_scroll-btn"></i>
            <i
                onClick={addNewTab}
                className={"window_header-btn fas fa-plus " + desactive}
                id="add_tab-btn"
            ></i>
        </>
    );
}
