uploaderService = (function(){

    let _file;
    let _fileLoaded = false;
    let _url;
    let _callback;
    const _uploadBtn = document.getElementById("upload-btn");

    let init = function(){
        _uploadBtn.addEventListener("click", () => {_sendFileData();});
        document.getElementById("file_loader").addEventListener("drop",(evt)=>{_loadFile(evt)});
        document.getElementById("file_loader").addEventListener("dragover",(evt)=>{evt.preventDefault();});
        _uploadBtn.disabled=true;
    }

    let setUrl = function(url){
        _url = url;
    }

    let setCallback = function(callback){
        _callback = callback;
    }

    let _loadFile = function(ev){
        ev.preventDefault();
        if (ev.dataTransfer.items) {

            let reader = new FileReader();
            // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // Si los elementos arrastrados no son ficheros, rechazarlos
                if (ev.dataTransfer.items[i].kind === 'file') {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    reader.onload = function (event) {
                        if (!_fileLoaded) {
                            blob = new Blob([event.target.result], { type: "text/plain" });
                            _file = {name: "file", filename: file.name, data: blob}
                            _fileLoaded = true;
                            _uploadBtn.disabled=false;
                        }
                    };
                    reader.readAsText(file);
                    break;
                }
            }
        }
        _removeDragData(ev);
        
    }
    
    let _removeDragData = function(ev) {
        if (ev.dataTransfer.items) {
          ev.dataTransfer.items.clear();
        } else {
          ev.dataTransfer.clearData();
        }
    }
    
    let _resetDragZone = function(){
        _fileLoaded = false;
        _uploadBtn.disabled=true;
        formData = new FormData();
    }
    
    let _sendFileData = function(){
        let request = new XMLHttpRequest();
        let formData = new FormData();
        let name = _file.filename.split(".");
        let extension = name[name.length-1];

        console.log(name.slice(0,name.length-1).join(''), extension);
        formData.append(_file.name, _file.data, name.slice(0,name.length-1).join(''));
        formData.append("extension", extension);
        request.open("POST", _url);
        request.send(formData);
        _resetDragZone();
    }

    return {
        init: init,
        setUrl: setUrl,
        setCallback: setCallback
    }
})();




