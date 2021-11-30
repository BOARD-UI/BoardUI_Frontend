import $ from "jquery";
import { SockJS } from "sockjs";
import { Stomp } from "stomp";

export class RoomManager{

    constructor(){
        this._api = process.env.REACT_APP_API_URL;
        this._roomId = null;
        this._files = null;
        this._stompClient = null;
        this._roomCallback = null;
    }
    

    getCurrentRoomId(){
        return this.roomId;
    }

    loadRooms(callback){
        $.getJSON(this.api+"/rooms", function(data) { this.files = data; callback(data); } );
    }

    loadRoom(roomID,callback){
        this.roomId = roomID;
        $.getJSON(this.api+"/room/"+roomID, function(data) { this.files = data; callback(this.files); } );
        this.connectAndSubscribeToRoom(callback);
    }

    createNewRoom(title, numMembers, callback){
        let room = {title: title, numMembers: numMembers, url: ""}
        return $.ajax({
            url: this.api+"/room",
            type: 'POST',
            data: JSON.stringify(room),
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + req + "\n" + err); },
            complete: function(data) {callback();}
        });
    }

    connectToNewRoom(roomUrl, callback){
        let url = {url: roomUrl}
        return $.ajax({
            url: this.api+"/permission/"+roomUrl,
            type: 'POST',
            data: JSON.stringify(url),
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + req + "\n" + err); },
            complete: function() {callback();}
        });
    }

    _connectAndSubscribeToRoom(callback) {
        this.roomCallback = callback;
        let socket = new SockJS(this.api+'/stompendpoint');
        this.stompClient = Stomp.over(socket);
        
        //subscribe to /app/room when connections succeed
        this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe("/app/room."+this.roomId, callback);
        });
    };

    subscribeToFile(fileId, callback) {
        let socket = new SockJS(this.api+'/stompendpoint');
        this.stompClient = Stomp.over(socket);
        
        this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe(this.api+"/app/room."+this.roomId, this.roomCallback);
            this.stompClient.subscribe(this.api+"/app/room."+this.roomId+"/file."+fileId, callback);
        });
    };
};

