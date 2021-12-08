import { createContext, useEffect, useState } from "react";
import { RoomManager } from "../Utils/RoomManager";

export const AppContext = createContext();

export function ContextProvider({ children }) {
    
    const [rooms, setRooms] = useState([]);
    const [files, setFiles] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [connectedToRoom, setConnectedToRoom] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUsername, setCurrentUsername] = useState(null);
    const [popUpIsHidden, setPopUpIsHidden] = useState(true);
    const [activeTab, setActiveTab] = useState(null);

    const roomManager = new RoomManager();

    const auth = { isAuthenticated, currentUsername, setIsAuthenticated, setCurrentUsername };

    const state = { rooms, files, tabs, connectedToRoom, setConnectedToRoom, activeTab, currentRoom, currentFile };

    const room = { notifyRoom };

    useEffect(() => {
        if (!stompClient){
            let socket = new SockJS(api+'/stompendpoint');
            setStompClient(Stomp.over(socket));
        }
    }, [stompClient]);

    useEffect(() => {
        if(currentRoom !== null){
            stompClient.connect({}, function (frame) {
                stompClient.subscribe("/app/room."+currentRoom, handleRoomChanges);
            });
        }
    }, [currentRoom])

    const notifyRoom = (roomChange) => {
        if (stompClient !== null) stompClient.send("/app/room."+currentRoom, {}, JSON.stringify(roomChange));
    }

    const handleRoomChanges = (roomChange) => {
        if(roomChange === "update"){
            getFiles(currentRoom);
        }
    }

    const disconnect = () => {
        setFiles([]);
        setConnectedToRoom(false);
        setCurrentRoom(null);
        stompClient.disconnect();
    }

    const getRooms = (username) => {
        roomManager.getUserRooms(username).then(
            (newRooms) => {
                setRooms([...newRooms]);
            }
        );
    }

    const leaveRoom = () => {
        roomManager.leaveRoom(currentUsername,currentRoom, () => {getRooms(currentUsername)})
    }

    const showPopup = () => {
        setPopUpIsHidden(false);
    }

    const hidePopup = () => {
        setPopUpIsHidden(true);
    }

    const getFiles = (roomId) => {
        roomManager.getRoomFiles(roomId).then(
            (newFiles) => {
                setFiles([...newFiles]);
            }
        );
        //roomManager.connectAndSubscribeToRoom(() => { getFiles(roomId); })
        setCurrentRoom(roomId);
    }

    const addTab = (name, extension, content) => {
        let tab = {
            name,
            extension,
            content
        }
        setTabs([...state.tabs, tab]);
    }

    const changeTab = (tab) => {
        setActiveTab(tab);
        setCurrentFile(tabs[tab].content);
    }

    const closeTab = () => {
        let tab = activeTab;
        let newTabs = [...tabs.slice(0,tab), ...tabs.slice(tab+1,tabs.length)];
        setTabs(newTabs);
    }

    useEffect(() => {
        if (tabs.length === 0){
            setActiveTab(null);
            setCurrentFile(null);
        }else if (activeTab >= tabs.length) changeTab(activeTab - 1);
    }, [tabs])

    const connectToRoom = (url) => {
        roomManager.connectToNewRoom(url, currentUsername, () => {getRooms(currentUsername)});
    }

    const createNewRoom = (title) => {
        roomManager.createNewRoom(title, currentUsername, () => {getRooms(currentUsername)});
    }

    const notifyRoom = (type) => {
        roomManager.notifyRoom(type);
    }

    return (
        <AppContext.Provider
            value={{ state, auth, getRooms, getFiles, addTab, changeTab, 
                     closeTab, showPopup, hidePopup, popUpIsHidden, connectToRoom, 
                     createNewRoom, disconnect, leaveRoom, room}}
        >
            {
                children
            }
        </AppContext.Provider>
    );
}