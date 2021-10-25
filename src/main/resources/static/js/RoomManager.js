roomManager = (function(){
    
    let _roomId;
    let _files;
    let _stompClient = null;
    let _roomCallback = null;

    let getCurrentRoomId = function(){
        return _roomId;
    }

    let loadRooms = function(callback){
        $.getJSON("/rooms", function(data) { _files = data; callback(data); } );
    }

    let loadRoom = function(roomID,callback){
        _roomId = roomID;
        $.getJSON("/room/"+roomID, function(data) { _files = data; callback(_files); } );
        _connectAndSubscribeToRoom(callback);
    }

    let createNewRoom = function(title, numMembers){
        let room = {title: title, numMembers: numMembers}
        return $.ajax({
            url: "/room/"+_roomId,
            type: 'POST',
            data: JSON.stringify(room),
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + req + "\n" + err); }
        });
    }

    let _connectAndSubscribeToRoom = function(callback) {
        _roomCallback = callback;
        let socket = new SockJS('/stompendpoint');
        _stompClient = Stomp.over(socket);
        
        //subscribe to /topic/newpoint when connections succeed
        _stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            _stompClient.subscribe("/app/room."+_roomId, callback);
        });
    };

    let subscribeToFile = function(fileId, callback) {
        let socket = new SockJS('/stompendpoint');
        _stompClient = Stomp.over(socket);
        
        _stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            _stompClient.subscribe("/app/room."+_roomId, _roomCallback);
            _stompClient.subscribe("/app/room."+_roomId+"/file."+fileId, callback);
        });
    };

    return {
        createNewRoom: createNewRoom,
        loadRoom: loadRoom,
        getUserRooms: loadRooms,
        connectToFile: subscribeToFile,
        getCurrentRoomId: getCurrentRoomId
    }
})();