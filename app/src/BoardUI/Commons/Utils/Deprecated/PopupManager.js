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
        let stylesheets = popup.document.getElementsByTagName("link");
        let css = "*, *::after, *::before {\n  margin: 0px;\n  padding: 0px;\n}\n.drawer_canvas {\n  background-color: rgba(255, 255, 255);\n  " + 
            "border: 2px black solid;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  z-index: 2;}";
        let canvas = popup.document.createElement("canvas");
        canvas.id = "drawer_canvas";
        canvas.classList.add("drawer_canvas")
        popup.document.body.appendChild(canvas);
        
        for (let i = 0; i < stylesheets.length; i++) {
            if (stylesheets[i].rel === "stylesheet") {
                let stylesheet = stylesheets[i].href.split("/");
                let file = stylesheet[stylesheet.length - 1];
                css += file ? (this.getFileContent(file) + "\n") : "";
            }
        }

        popup.document.head.insertAdjacentHTML("beforeend", "<style>\n" + css + "\n</style>");

        
        //Init
        let script = document.createElement("script");
        script.appendChild(document.createTextNode('document.addEventListener("DOMContentLoaded", () => {alert("???")});'));
        popup.document.body.appendChild(script);
        return popup;
    }
}

