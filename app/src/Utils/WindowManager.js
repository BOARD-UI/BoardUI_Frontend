import $ from "jquery";

export class WindowManager {
    
    constructor(document) {
        this.document = document;
        this._api = process.env.REACT_APP_API_URL;
        this._scroll_btns = this.document.getElementsByClassName("header_scroll-btn");
        this._mouseIsDown = false;
        this._tabs = {};
        this._rooms = {};
        this._currentRoomFiles = {};
        this._newFileCounter = 1;
        this.init();
    }

    init(){
        
        for(let btn of this._scroll_btns){
            btn.addEventListener("mousedown", (evt) =>{
                this._mouseIsDown = true;
                if (evt.target.classList.contains("fa-less-than")) {
                    this._scrollTabBar(-100);
                    setTimeout(() => {this._periodicScrollTabBar(-10)}, 300);
                }
                else if (evt.target.classList.contains("fa-greater-than")) {
                    this._scrollTabBar(100);
                    setTimeout(() => {this._periodicScrollTabBar(10)}, 300);
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
            if(!document.getElementById("add_tab-btn").classList.contains("desactive")) this._createNewFileTab();
        });

        document.getElementById("add_room-btn").addEventListener("click",() => {
            $("#room_menu").toggleClass("active");
        });

        document.getElementById("room_menu-btn").addEventListener("click", () => {
            let data = document.getElementById("room_menu-input").value;
            let mode = document.getElementById("room_menu-cb").checked;
            console.log(data);
            if(mode){
                //roomManager.createNewRoom(data, 10, () => {$("#window_menu-rooms").empty();this._getUserRooms();});
            }else {
                //roomManager.connectToNewRoom(data, () => {$("#window_menu-rooms").empty();this._getUserRooms();});
            }
            $("#room_menu").fadeOut(250, () => {document.getElementById("room_menu").classList.remove("active");});
        });


        window.addEventListener("mouseup", () => {this._mouseIsDown = false;});

        this._scrollTabBar(0);

        this._getUserRooms();

        document.getElementById("add_tab-btn").classList.remove("desactive");
    }

    _scrollTabBar(direction){ 
        const bar = document.getElementById("window_header-scroll-bar");
        let prevValue = bar.scrollLeft;
        bar.scrollLeft += direction;
        for(let btn of this._scroll_btns){
            if(btn.classList.contains("fa-less-than") && bar.scrollLeft === 0) btn.classList.add("desactive");
            else if(btn.classList.contains("fa-greater-than") && prevValue === bar.scrollLeft) btn.classList.add("desactive");
            else btn.classList.remove("desactive");
        } 
    }
    
    _periodicScrollTabBar(direction){
        if (this._mouseIsDown) {
            this._scrollTabBar(direction);
            setTimeout(()=>{this._periodicScrollTabBar(direction)}, 10);
        }
    }

    _closeFileTab(tabId){
    }

    _createNewFileTab(name = "newFile" + this._newFileCounter, extension = "txt", content = "D&DZone", created = true, file = ""){
        

        console.log("why!?");
        console.log(name, extension, content, created, file);

        let element = document.createElement("div");
        element.classList.add("card_tab");
        element.id = "file_tab-"+(Object.keys(this._tabs).length+1);
        element.addEventListener("click", () => {this._changeTab(element.id)});

        let span1 = document.createElement("span"),
        span2 = document.createElement("span"),
        i1 = document.createElement("i");
        
        span1.innerText = name;
        span2.innerText = name+"."+extension;
        //i1.classList.add("far"); i1.classList.add("fa-times-circle");

        if(!created) this._currentRoomFiles[file].tab_Id = element.id;
        else this._newFileCounter++;

        element.appendChild(span1); element.appendChild(span2); element.appendChild(i1);
        document.getElementById("window_header-scroll-bar").appendChild(element);
        this._tabs[element.id] = { element: element, content: content};

        this._changeTab(element.id);

    }

    _changeTab(tabId){
        console.log(tabId);
        for(let key in this._tabs){
            if (key !== tabId){
                this._tabs[key].element.classList.remove("active");
            }else {
                this._tabs[key].element.classList.add("active");
                this._changeWindowBodyToTabContent(this._tabs[key].content);
            }
        }  
    }

    _changeWindowBodyToTabContent(content){
        $("#window_body-content").empty();
        if (content === "D&DZone"){
            $("#window_body-content").load("D&DZone.html", () => {
                alert("loaded");
                //uploaderService.init(); 
                //uploaderService.setUrl(_api+"/room/"+roomManager.getCurrentRoomId()+"/file");
            });
            $("#window_body-content").hide().fadeIn(600);

        }else {
            $("#window_body-content").load("TextArea.html", () => {
                document.getElementById("file_text-area").value = content;
            });
            
            console.log("Working on it! :3");
        }
    }

    _getUserRooms(){
        /*roomManager.getUserRooms((data) => {
            data.forEach(room => {
                _createUserRoomBtn(room);
            });
        })*/
    }

    _changeRoom(roomID){
        this._newFileCounter = 1;
        for(let key in this._rooms){
            console.log(key, roomID);
            if (key !== roomID){
                this._rooms[key].element.classList.remove("active");
            }else {
                this._rooms[key].element.classList.add("active");
                $("#window_header-scroll-bar").empty();
                //roomManager.loadRoom(this._rooms[key].id, _loadUserRoom);
            }
        }  
    }

    _loadUserRoom(files){
        this._currentRoomFiles = {};
        $("#window_menu-files").empty();
        files.forEach(file => {
            this._createRoomFileBtn(file);
        });
        document.getElementById("add_tab-btn").classList.remove("desactive");
    }

    _getFileIcon(extension){
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

    _createRoomFileBtn(file){
        let element = document.createElement("div");
        element.classList.add("room-btn");
        element.id = "file_btn-"+(Object.keys(this._currentRoomFiles).length+1);
        element.addEventListener("click", () => {console.log(element.id); this._createOrChangeTab(element.id);});

        let i1 = document.createElement("i"),
        span1 = document.createElement("span"),
        i2 = document.createElement("i");
        
        let icon = this._getFileIcon(file.extension);
        i1.classList.add(icon[0]); i1.classList.add(icon[1]);
        span1.innerText = file.name;

        i2.classList.add("far"); i2.classList.add("fa-times-circle");

        element.appendChild(i1); element.appendChild(span1); element.appendChild(i2);
        document.getElementById("window_menu-files").appendChild(element);
        this._currentRoomFiles[element.id] = { element: element, file: file, tab_id: null, isCreated: false};
    }

    _createUserRoomBtn(room){
        let element = document.createElement("div");
        element.classList.add("room-btn");
        element.id = "room_tab-"+(Object.keys(this._rooms).length+1);
        element.addEventListener("click", () => {this._changeRoom(element.id)});

        let i1 = document.createElement("i"),
        span1 = document.createElement("span"),
        i2 = document.createElement("i");
        
        i1.classList.add("far"); i1.classList.add("fa-window-restore");
        span1.innerText = room.title;
        this._newFileCounter++;
        i2.classList.add("far"); i1.classList.add("fa-times-circle");

        element.appendChild(i1); element.appendChild(span1); element.appendChild(i2);
        document.getElementById("window_menu-rooms").appendChild(element);
        this._rooms[element.id] = { element: element, id: room.roomId};

    }

    _createOrChangeTab(file){
        console.log(file, this._currentRoomFiles);
        if(!this._currentRoomFiles[file].isCreated){
            this._currentRoomFiles[file].isCreated = true;
            this._createNewFileTab(this._currentRoomFiles[file].file.name, this._currentRoomFiles[file].file.extension, this._currentRoomFiles[file].file.content, false, file);
        }else {
            this._changeTab(this._currentRoomFiles[file].tab_Id)
        }
    }

};
