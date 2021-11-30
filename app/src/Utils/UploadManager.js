import $ from "jquery";

export class UploadManager{

    constructor(document){
        this.document = document;
        this._file = null;
        this._fileLoaded = false;
        this._url = null;
        this._callback = null;
        this._uploadBtn = document.getElementById("upload-btn");
        this.formData = new FormData();
    }
    

    init(){
        this._uploadBtn.addEventListener("click", () => {this._sendFileData();});
        this.document.getElementById("file_loader").addEventListener("drop",(evt)=>{this._loadFile(evt)});
        this.document.getElementById("file_loader").addEventListener("dragover",(evt)=>{evt.preventDefault();});
        this._uploadBtn.disabled=true;
    }

    setUrl(url){
        this._url = url;
    }

    setCallback(callback){
        this._callback = callback;
    }

    _loadFile(ev){
        ev.preventDefault();
        if (ev.dataTransfer.items) {

            let reader = new FileReader();
            // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // Si los elementos arrastrados no son ficheros, rechazarlos
                if (ev.dataTransfer.items[i].kind === 'file') {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    reader.onload = (event) => {
                        if (!this._fileLoaded) {
                            let blob = new Blob([event.target.result], { type: "text/plain" });
                            this._file = {name: "file", filename: file.name, data: blob}
                            this._fileLoaded = true;
                            this._uploadBtn.disabled=false;
                        }
                    };
                    reader.readAsText(file);
                    break;
                }
            }
        }
        this._removeDragData(ev);
        
    }
    
    _removeDragData(ev) {
        if (ev.dataTransfer.items) {
          ev.dataTransfer.items.clear();
        } else {
          ev.dataTransfer.clearData();
        }
    }
    
    _resetDragZone(){
        this._fileLoaded = false;
        this._uploadBtn.disabled=true;
        this.formData = new FormData();
    }
    
    _sendFileData(){
        let request = new XMLHttpRequest();
        this.formData = new FormData();
        let name = this._file.filename.split(".");
        let extension = name[name.length-1];

        console.log(name.slice(0,name.length-1).join(''), extension);
        this.formData.append(this._file.name, this._file.data, name.slice(0,name.length-1).join(''));
        this.formData.append("extension", extension);
        request.open("POST", this._url);
        request.send(this.formData);
        this._resetDragZone();
    }
};


