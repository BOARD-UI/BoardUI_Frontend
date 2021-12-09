import { useState, useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import { Drawer } from "./Drawer";
import SockJS from 'sockjs-client';
import Stomp from "stompjs";


import "../css/Drawer.css"

const api = process.env.REACT_APP_API_URL;
let socket = new SockJS(api+'/stompendpoint');
let stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {});

export const PopupWindow = (props) => {
    const [container, setContainer] = useState(null);
    const newWindow = useRef(null);
  
    const getFileContent = (filename) => {
        let file = props.files.filter(file => file.name + "." + file.extension === filename);
        let data = file.length > 0 ? file[0].content : "";
        return data;
    }

    const loadCss = (popup) => {
        let css = "*, *::after, *::before {\n  margin: 0px;\n  padding: 0px;\n}\n.drawer_canvas {\n  background-color: rgba(255, 255, 255);\n  " + 
            "border: 2px black solid;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  z-index: 2;}";
            let stylesheets = popup.document.getElementsByTagName("link");
        for (let i = 0; i < stylesheets.length; i++) {
            if (stylesheets[i].rel === "stylesheet") {
                let stylesheet = stylesheets[i].href.split("/");
                let file = stylesheet[stylesheet.length - 1];
                css += file ? (getFileContent(file) + "\n") : "";
            }
        }
        return css;
    }

    useEffect(() => {
        // Create window
        newWindow.current = window.open(
          "",
          "",
          "width=1920,height=1080,left=0,top=0"
        );
        newWindow.current.document.write(props.content);
        let css = loadCss(newWindow.current);
        newWindow.current.document.head.insertAdjacentHTML("beforeend", "<style>\n" + css + "\n</style>");
        //console.log(newWindow.current.document.body.innerHTML);
        newWindow.current.document.body.innerHTML = "<div id='drawer_container'>"+newWindow.current.document.body.innerHTML+"</div>"
        setContainer(newWindow.current.document.getElementById('drawer_container'));

        // Save reference to window for cleanup
        const curWindow = newWindow.current;
        curWindow.onunload=props.cleanPopup;
  
        // Return cleanup function
        return () => {
            props.cleanPopup();
            curWindow.close();
        }
    }, []);
  
    return container && createPortal(<Drawer roomId={props.roomId} stompClient={stompClient} filename={props.file.name}/>, container);
  };