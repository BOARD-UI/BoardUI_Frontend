import { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "../../Commons/Components/ContextProvider";
import { PopupWindow } from "./PopupWindow";
import SockJS from 'sockjs-client';
import Stomp from "stompjs";

class StringChange {
    constructor(type, data, start, end) {
        this.type = type;
        this.data = data;
        this.position = { start, end }
    }
}

let currentCursorPosition = {start:0, end:0};

export function ConcurrentTextArea({ }) {

    const ignoredKeys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Control", "Alt", "OS", "CapsLock", "Shift", "NumLock", "Escape", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
    const { state, room } = useContext(AppContext);
    const [popup, setPopUp] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const textArea = useRef(null);
    const api = process.env.REACT_APP_API_URL;

    let file = state.files.filter(file => file.fileId === state.currentFile)[0];

    useEffect(() => {
        if (textArea.current){
            textArea.current.addEventListener("selectionchange", (event) => {
                let start = textArea.current.selectionStart
                let end = textArea.current.selectionEnd;
                console.log(start,end);
                currentCursorPosition = {start, end};
            });
        };
    },[]);

    useEffect(() => {
        if (!stompClient){
            let socket = new SockJS(api+'/stompendpoint');
            setStompClient(Stomp.over(socket));
        }
        else{
            try {
                stompClient.disconnect();
            } catch (error) {}
            stompClient.connect({}, function (frame) {
                stompClient.subscribe("/app/roomFile."+state.currentRoom+"|"+state.currentFile, updateTextArea);
            });
        }
    }, [state.currentFile, stompClient])

    const publishToStomp = (stringChange) => {
        if (stompClient !== null) stompClient.send("/app/roomFile."+state.currentRoom+"|"+state.currentFile, {}, JSON.stringify(stringChange));
    }

    //Event handlers
    let onKeyDown = (event) => {
        if (!ignoredKeys.includes(event.key)) {
            if (!["x", "v", "c"].includes(event.key.toLowerCase()) || !event.ctrlKey) {
                event.preventDefault();
                let start = currentCursorPosition.start, end = currentCursorPosition.end;
                let sc = new StringChange("insert", "", 0, 0);
                if (event.key === "Enter") sc = new StringChange("insert", "\n", start, end);
                else if (event.key === "Backspace") sc = new StringChange("delete", null, start, end);
                else sc = new StringChange("insert", event.key, start, end);
                publishToStomp(sc);
            }
        }
    }
    let onCut = (event) => {
        event.preventDefault();
        let start = currentCursorPosition.start, end = currentCursorPosition.end;
        event.clipboardData.setData("text/plain", event.target.value.substring(start, end));
        publishToStomp(new StringChange("delete", null, start, end));
    }
    let onPaste = (event) => {
        event.preventDefault();
        let start = currentCursorPosition.start, end = currentCursorPosition.end;
        let sc = new StringChange("insert", event.clipboardData.getData('Text'), start, end);
        publishToStomp(sc);
    }
    let updateTextArea = (stringChange) => {
        try {
            let update = JSON.parse(stringChange.body);
            if(update.length === undefined) update = [JSON.stringify(update)];
            for(let ms of update){
                ms = JSON.parse(ms);
                let currentString = textArea.current.value;
                let newString = currentString;
                let diff = 0;
                if (ms.type === "insert") {
                    newString = currentString.slice(0, ms.position.start) + ms.data + currentString.slice(ms.position.end);
                    currentString = newString;
                    diff = currentCursorPosition.start + ms.data.length;
                } else if (ms.type === "delete") {
                    newString = currentString.slice(0, ms.position.start - (ms.position.start === ms.position.end ? 1 : 0)) + currentString.slice(ms.position.end);
                    currentString = newString;
                    diff = Math.min(ms.position.start, ms.position.end) + (ms.position.start === ms.position.end ? -1 : 0);

                }
                textArea.current.value = newString;
                textArea.current.selectionStart = diff; 
                textArea.current.selectionEnd = textArea.current.selectionStart;
            }
        } catch (error) {
            console.log(error, stringChange);
        }
    }

    //Popup
    let compile = () => {
        setPopUp(true);
    }
    let cleanPopup = () => {
        setPopUp(false);
        console.log("CLEANED!");
    }

    return (
        <>
            <div className="file_controller-btns">
                <input
                    className="file_controller-btn"
                    type="button"
                    value="Save"
                    onClick={() => {room.notifyRoom("save")}}
                />
                <input
                    className="file_controller-btn"
                    type="button"
                    value="Compile"
                    onClick={compile}
                    disabled={file.extension !== "html"}
                />
            </div>
            <textarea
                className="file_text-area"
                onCut={onCut}
                onPaste={onPaste}
                onKeyDown={onKeyDown}
                ref={textArea}
                value={file.content}
            />
            {popup && file ? 
                <PopupWindow 
                    cleanPopup={cleanPopup}
                    file={file}
                    roomId={state.currentRoom}
                    cssFiles={state.files.filter(file => file.extension === "css")}
                /> 
                : null
            } 
        </>
    );
}
