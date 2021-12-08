import $ from "jquery";

export class UploadManager{

    constructor(roomId){
        this._file = null;
        this.fileLoaded = false;
        this._url = process.env.REACT_APP_API_URL + `/room/${roomId}/file`;
        this._uploadBtn = document.getElementById("upload-btn");
    }

    async loadFile(ev){
        ev.preventDefault();
        if (ev.dataTransfer.items) {

            let reader = new FileReader();
            // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // Si los elementos arrastrados no son ficheros, rechazarlos
                if (ev.dataTransfer.items[i].kind === 'file') {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    reader.onload = (event) => {
                        if (!this.fileLoaded) {
                            let blob = new Blob([event.target.result], { type: "text/plain" });
                            this._file = {name: "file", filename: file.name, data: blob}
                            this.fileLoaded = true;
                        }
                    };
                    reader.readAsText(file);
                    break;
                }
            }
        }
        
        this._removeDragData(ev);
        console.log(this._file);
        return this._file;
    }
    
    _removeDragData(ev) {
        if (ev.dataTransfer.items) {
          ev.dataTransfer.items.clear();
        } else {
          ev.dataTransfer.clearData();
        }
    }
    
    _resetDragZone(){
        this.fileLoaded = false;
    }
    
    sendFileData(file){
        let request = new XMLHttpRequest();
        let formData = new FormData();
        let name = file.filename.split(".");
        let extension = name[name.length-1];

        console.log(name.slice(0,name.length-1).join(''), extension);
        formData.append(file.name, file.data, name.slice(0,name.length-1).join(''));
        formData.append("extension", extension);
        request.open("POST", this._url);
        request.send(formData);
        this._resetDragZone();
    }
};


