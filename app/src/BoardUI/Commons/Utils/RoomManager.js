import $ from "jquery";

export class RoomManager{

    constructor(){
        this._api = process.env.REACT_APP_API_URL;
    }

    async getUserRooms(username){
        return await $.getJSON(this._api+"/user/"+username+"/rooms", (data) => { return data; });
    }

    async getRoomFiles(roomID){
        return await $.getJSON(this._api+"/room/"+roomID+"/files", (data) => { return data; } );
    }

    createNewRoom(title, username, callback){
        //console.log(title, username);
        let room = {title: title, numMembers: 10, url: ""}
        return $.ajax({
            url: this._api+"/user/"+username+"/rooms",
            type: 'POST',
            data: JSON.stringify(room),
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + req + "\n" + err); },
            complete: function(data) {callback();}
        });
    }

    leaveRoom(username, roomId, callback){
        return $.ajax({
            url: this._api+`/room/${roomId}/permission/remove`,
            type: 'POST',
            data: JSON.stringify({username}),
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + req + "\n" + err); },
            complete: function() {callback();}
        });
    }

    connectToNewRoom(roomUrl, username, callback){
        //console.log("dentro de connectToNewRoom", roomUrl, username);
        return $.ajax({
            url: this._api+`/room/permission`,
            type: 'POST',
            data: JSON.stringify({roomUrl,username}),
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + req + "\n" + err); },
            complete: function() {callback();}
        });
    }
};

