import { useContext } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

export function FileButton({ name, extension, fileId }) {
    const { state, addTab, changeTab } = useContext(AppContext);

    function getFileIcon(extension) {
        let icon, prefix;
        switch (extension.toLowerCase()) {
            case 'css':
                prefix = 'fab'; icon = 'fa-css3-alt';
                break;
            case 'js':
                prefix = 'fab'; icon = 'fa-js-square';
                break;
            case 'html':
                prefix = 'fab'; icon = 'fa-html5';
                break;
            case 'png':
            case 'jpg':
            case 'jpeg':
                prefix = 'far'; icon = 'fa-image';
                break;
            default:
                icon = 'fa-file'; prefix = 'far';
                break;
        }
        return `${prefix} ${icon}`;
    }

    function createOrChangeTab() {
        let tab = state.tabs.map((tab, index) => {
            return { content: tab.content, index }
        }).filter(tab => tab.content === fileId);
        if (tab.length === 0) {
            addTab(name, extension, fileId);
        } else changeTab(tab[0].index);
    }

    return (
        <div className="room-btn" onClick={createOrChangeTab}>
            <i className={getFileIcon(extension)}></i>
            <span>{name}</span>
            <i 
                className="far fa-times-circle"
                //onClick={() => {room.notifyRoom("update")}}
            ></i>
        </div>
    );
}