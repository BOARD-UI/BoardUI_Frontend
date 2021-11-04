windowManager = (function(){
    
    const _scroll_btns = document.getElementsByClassName("header_scroll-btn");
    let _mouseIsDown = false;
    let _tabs = {};
    let _rooms = {};
    let _currentRoomFiles = {};
    let _newFileCounter = 1;

    let init = function(){
        
        for(let btn of _scroll_btns){
            btn.addEventListener("mousedown", (evt) =>{
                _mouseIsDown = true;
                if (evt.target.classList.contains("fa-less-than")) {
                    _scrollTabBar(-100);
                    setTimeout(() => {_periodicScrollTabBar(-10)}, 300);
                }
                else if (evt.target.classList.contains("fa-greater-than")) {
                    _scrollTabBar(100);
                    setTimeout(() => {_periodicScrollTabBar(10)}, 300);
                }
            });
        }

        document.getElementById("window_rooms-btn").addEventListener("click", () => {
            $("#window_rooms-menu").toggleClass("active");
            $("#window_rooms-btn").toggleClass("active");

            if(!document.getElementById("window_rooms-menu").classList.contains("active")) {
                document.getElementById("room_menu").classList.remove("active");
            }
        });

        document.getElementById("add_tab-btn").addEventListener("click",() => {
            if(!document.getElementById("add_tab-btn").classList.contains("desactive")) _createNewFileTab();
        });

        document.getElementById("add_room-btn").addEventListener("click",() => {
            $("#room_menu").toggleClass("active");
        });

        document.getElementById("room_menu-btn").addEventListener("click", () => {
            let data = document.getElementById("room_menu-input").value;
            let mode = document.getElementById("room_menu-cb").checked;
            console.log(data);
            if(mode){
                roomManager.createNewRoom(data, 10, () => {$("#window_menu-rooms").empty();_getUserRooms();});
            }else {
                roomManager.connectToNewRoom(data, () => {$("#window_menu-rooms").empty();_getUserRooms();});
            }
            $("#room_menu").fadeOut(250, () => {document.getElementById("room_menu").classList.remove("active");});
        });


        window.addEventListener("mouseup", () => {_mouseIsDown = false;});

        _scrollTabBar(0);

        _getUserRooms();
    }

    let _scrollTabBar = function(direction){ 
        const bar = document.getElementById("window_header-scroll-bar");
        let prevValue = bar.scrollLeft;
        bar.scrollLeft += direction;
        for(let btn of _scroll_btns){
            if(btn.classList.contains("fa-less-than") && bar.scrollLeft == 0) btn.classList.add("desactive");
            else if(btn.classList.contains("fa-greater-than") && prevValue == bar.scrollLeft) btn.classList.add("desactive");
            else btn.classList.remove("desactive");
        } 
    }
    
    let _periodicScrollTabBar = function(direction){
        if (_mouseIsDown) {
            _scrollTabBar(direction);
            setTimeout(()=>{_periodicScrollTabBar(direction)}, 10);
        }
    }

    let _closeFileTab = function(tabId){}

    let _createNewFileTab = function(name = "newFile" + _newFileCounter, extension = "txt", content = "D&DZone", created = true, file = ""){
        
        console.log(name, extension, content, created, file);

        let element = document.createElement("div");
        element.classList.add("card_tab");
        element.id = "file_tab-"+(Object.keys(_tabs).length+1);
        element.addEventListener("click", () => {_changeTab(element.id)});

        let span1 = document.createElement("span"),
        span2 = document.createElement("span"),
        i1 = document.createElement("i");
        
        span1.innerText = name;
        span2.innerText = name+"."+extension;
        //i1.classList.add("far"); i1.classList.add("fa-times-circle");

        if(!created) _currentRoomFiles[file].tab_Id = element.id;
        else _newFileCounter++;

        element.appendChild(span1); element.appendChild(span2); element.appendChild(i1);
        document.getElementById("window_header-scroll-bar").appendChild(element);
        _tabs[element.id] = { element: element, content: content};

        _changeTab(element.id);

    }

    let _changeTab = function(tabId){
        console.log(tabId);
        for(let key in _tabs){
            if (key != tabId){
                _tabs[key].element.classList.remove("active");
            }else {
                _tabs[key].element.classList.add("active");
                _changeWindowBodyToTabContent(_tabs[key].content);
            }
        }  
    }

    let _changeWindowBodyToTabContent = function(content){
        $("#window_body-content").empty();
        if (content == "D&DZone"){
            $("#window_body-content").load("/html/D&DZone", () => {
                alert("loaded");
                uploaderService.init(); 
                uploaderService.setUrl("/room/"+roomManager.getCurrentRoomId()+"/file");
            });
            $("#window_body-content").hide().fadeIn(600);

        }else {
            $("#window_body-content").load("/html/TextArea", () => {
                document.getElementById("file_text-area").value = content;
            });
            
            console.log("Working on it! :3");
        }
    }

    let _getUserRooms = function(){
        roomManager.getUserRooms((data) => {
            data.forEach(room => {
                _createUserRoomBtn(room);
            });
        })
    }

    let _changeRoom = function(roomID){
        _newFileCounter = 1;
        for(let key in _rooms){
            console.log(key, roomID);
            if (key != roomID){
                _rooms[key].element.classList.remove("active");
            }else {
                _rooms[key].element.classList.add("active");
                $("#window_header-scroll-bar").empty();
                roomManager.loadRoom(_rooms[key].id, _loadUserRoom);
            }
        }  
    }

    let _loadUserRoom = function(files){
        _currentRoomFiles = {};
        $("#window_menu-files").empty();
        files.forEach(file => {
            _createRoomFileBtn(file);
        });
        document.getElementById("add_tab-btn").classList.remove("desactive");
    }

    let _getFileIcon = function(extension){
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
        return [prefix, icon];
    }

    let _createRoomFileBtn = function(file){
        let element = document.createElement("div");
        element.classList.add("room-btn");
        element.id = "file_btn-"+(Object.keys(_currentRoomFiles).length+1);
        element.addEventListener("click", () => {console.log(element.id);_createOrChangeTab(element.id);});

        let i1 = document.createElement("i"),
        span1 = document.createElement("span"),
        i2 = document.createElement("i");
        
        let icon = _getFileIcon(file.extension);
        i1.classList.add(icon[0]); i1.classList.add(icon[1]);
        span1.innerText = file.name;

        i2.classList.add("far"); i2.classList.add("fa-times-circle");

        element.appendChild(i1); element.appendChild(span1); element.appendChild(i2);
        document.getElementById("window_menu-files").appendChild(element);
        _currentRoomFiles[element.id] = { element: element, file: file, tab_id: null, isCreated: false};
    }

    let _createUserRoomBtn = function(room){
        let element = document.createElement("div");
        element.classList.add("room-btn");
        element.id = "room_tab-"+(Object.keys(_rooms).length+1);
        element.addEventListener("click", () => {_changeRoom(element.id)});

        let i1 = document.createElement("i"),
        span1 = document.createElement("span"),
        i2 = document.createElement("i");
        
        i1.classList.add("far"); i1.classList.add("fa-window-restore");
        span1.innerText = room.title;
        _newFileCounter++;
        i2.classList.add("far"); i1.classList.add("fa-times-circle");

        element.appendChild(i1); element.appendChild(span1); element.appendChild(i2);
        document.getElementById("window_menu-rooms").appendChild(element);
        _rooms[element.id] = { element: element, id: room.roomId};

    }

    let _createOrChangeTab = function(file){
        console.log(file, _currentRoomFiles);
        if(!_currentRoomFiles[file].isCreated){
            _currentRoomFiles[file].isCreated = true;
            _createNewFileTab(_currentRoomFiles[file].file.name, _currentRoomFiles[file].file.extension, _currentRoomFiles[file].file.content, false, file);
        }else {
            _changeTab(_currentRoomFiles[file].tab_Id)
        }
    }

    return {
        init: init
    }

})();