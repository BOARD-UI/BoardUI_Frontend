import { useState, useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import { Drawer } from "./Drawer";
import SockJS from 'sockjs-client';
import Stomp from "stompjs";


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

    useEffect(() => {
        // Create window
        newWindow.current = window.open(
          "",
          "",
          "width=600,height=400,left=200,top=200"
        );
        newWindow.current.document.write(props.file.content);
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