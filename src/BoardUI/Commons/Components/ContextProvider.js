import { createContext, useEffect, useState } from "react";
import { RoomManager } from "../Utils/RoomManager";
import SockJS from 'sockjs-client';
import Stomp from "stompjs";

const api = process.env.REACT_APP_API_URL;
const socket = new SockJS(api+'/stompendpoint');
const stompClient = Stomp.over(socket);

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

    const room = { notifyRoom };

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
        setCurrentRoom(roomId);
        setTabs([]);
    }

    const addTab = (name, extension, content) => {
        let tab = {
            name,
            extension,
            content
        }
        setTabs([...state.tabs, tab]);
        setActiveTab(tabs.length);
    }

    const changeTab = (tab) => {
        setActiveTab(tab);
        if (tabs[tab]) setCurrentFile(tabs[tab].content);
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
        }else if (activeTab >= tabs.length) {
            changeTab(activeTab - 1);
        }else if (activeTab !== null && tabs.length > 0) {
            console.log(tabs);
            changeTab(activeTab)
        }
    }, [tabs])

    const connectToRoom = (url) => {
        roomManager.connectToNewRoom(url, currentUsername, () => {getRooms(currentUsername)});
    }

    const createNewRoom = (title) => {
        roomManager.createNewRoom(title, currentUsername, () => {getRooms(currentUsername)});
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