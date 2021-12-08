import SockJS from 'sockjs-client';
import Stomp from "stompjs";

export class CodeEditorManager {

    constructor(roomId, fileId){
        this._api = process.env.REACT_APP_API_URL;
        this.stomp = process.env.REACT_APP_STOMP;
        this.roomFileId = roomId+"|"+fileId;
        this._currentString = "";
        this._stompClient = null;
    }

    connectAndSubscribe(callback, url="") {
        let socket = new SockJS(this._api+this.stomp);
        this._stompClient = Stomp.over(socket);
        
        this._stompClient.connect({}, (frame) => {
            this._stompClient.subscribe("/app/roomFile."+this.roomFileId, callback);
        });
    };
    
    publishToStomp(stringChange, url=""){
        if (this._stompClient !== null) this._stompClient.send("/app/roomFile."+this.roomFileId, {}, JSON.stringify(stringChange));
    }

    
}