export class PopupManager {

    constructor(htmlFilename, files) {
        this.files = files;
        this.displayHtmlFile(htmlFilename);
    }

    getFileContent(filename) {
        let file = this.files.filter(file => file.name + "." + file.extension === filename);
        let data = file.length > 0 ? file[0].content : "";
        return data;
    }

    displayHtmlFile(filename) {
        let popup = window.open("", "_blank", "width=800,height=600");
        popup.document.write(this.getFileContent(filename));
        
        
        let canvas = popup.document.createElement("canvas");
        canvas.id = "drawer_canvas";
        canvas.classList.add("drawer_canvas")
        popup.document.body.appendChild(canvas);

        

        popup.document.head.insertAdjacentHTML("beforeend", "<style>\n" + css + "\n</style>");

        
        //Init
        let script = document.createElement("script");
        script.appendChild(document.createTextNode('document.addEventListener("DOMContentLoaded", () => {alert("???")});'));
        popup.document.body.appendChild(script);
        return popup;
    }
}

