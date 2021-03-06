import { useEffect, useRef, useState } from "react";

import "../css/Drawer.css"

export const Drawer = (props) => {
    const stompClient = props.stompClient;
    const [ctx, setCtx] = useState(null);
    const canvas = useRef(null);
    let currX = 0, currY = 0, isDown = false, color = "black";

    useEffect(() => {
        isDown = false;
        currX = 0;
        currY = 0;
        setCtx(canvas.current.getContext('2d'));
        stompClient.subscribe("/app/roomCanvas."+props.roomId, updateDraw);
    }, []);

    const publishToStomp = function(drawChange){
        if (stompClient != null) stompClient.send("/app/roomCanvas."+props.roomId, {}, JSON.stringify(drawChange));
    };

    function findPos(type, e) {
        if (type === 'down') {
            currX = e.clientX - canvas.current.offsetLeft;
            currY = e.clientY - canvas.current.offsetTop;

            isDown = true;   
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath(); 
        }
        if (type === 'up' || type === "out") {
            isDown = false;
        }
        if (type === 'move') {
            if (isDown) {
                let prevX = currX, prevY = currY;
                currX = e.clientX - canvas.current.offsetLeft;
                currY = e.clientY - canvas.current.offsetTop;

                let drawChange = {prevX, prevY, currX, currY, color};

                publishToStomp(drawChange);
                //draw(prevX, prevY, currX, currY, color);
            }
        }
    };

    function draw(prevX, prevY, currX, currY, color) {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    };

    const updateDraw = function(drawChange){
        try {
            let ms = JSON.parse(drawChange.body);
            draw(ms.prevX, ms.prevY, ms.currX, ms.currY, ms.color);
        } catch (error) {
            //console.log(drawChange);
        }
        
    };

    return (
        <>
            <canvas 
                ref={canvas} 
                width={600}
                height={600}
                className="boardui_drawer"
                onMouseDown={(e) => {findPos('down',e)}}
                onMouseMove={(e) => {findPos('move',e)}}
                onMouseUp={(e) => {findPos('up',e)}}
            />
        </>
    );

}