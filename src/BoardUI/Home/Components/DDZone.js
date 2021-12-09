import { useContext, useState } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";

import "../css/D&DZone.css"

export function DDZone({ roomId }) {

    const [file, setFile] = useState(null);
    const url = process.env.REACT_APP_API_URL + `/room/${roomId}/file`;
    const { room } = useContext(AppContext);

    const loadFile = (ev) => {
        ev.preventDefault();
        if (ev.dataTransfer.items) {

            let reader = new FileReader();
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {

                if (ev.dataTransfer.items[i].kind === 'file') {
                    
                    let loadedFile = ev.dataTransfer.items[i].getAsFile();
                    reader.onload = (event) => {
                        if (file === null) {
                            let blob = new Blob([event.target.result], { type: "text/plain" });
                            setFile({name: "file", filename: loadedFile.name, data: blob});
                        }
                    };
                    reader.readAsText(loadedFile);

                    break;
                }
            }
        }
        
        removeDragData(ev);
    }

    const removeDragData = (ev) => {
        if (ev.dataTransfer.items) {
          ev.dataTransfer.items.clear();
        } else {
          ev.dataTransfer.clearData();
        }
    }

    const sendData = () => {
        let request = new XMLHttpRequest();
        let formData = new FormData();
        let name = file.filename.split(".");
        let extension = name[name.length-1];
        
        formData.append(file.name, file.data, name.slice(0,name.length-1).join(''));
        formData.append("extension", extension);
        request.open("POST", url);
        request.send(formData);
        setFile(null);
        room.notifyRoom("update");
    }

    return (
        <div className="file_loader-container">
            <div
                id="file_loader"
                className="file_loader"
                onDrop={loadFile}
                onDragOver={(evt) => { evt.preventDefault(); }}
            >
                <i className="fas fa-upload"></i>
                <span>Drag files</span>
            </div>
            <div className="file_loader-btns">
                <input
                    className="file_loader-btn"
                    type="button"
                    value="Upload"
                    id="upload-btn"
                    disabled={file === null}
                    onClick={sendData}
                />
            </div>
        </div>
    );
}