import React, { useState, useEffect, useRef} from 'react'
// components
import LeftBar from './LeftBar';
import OnlineUsers from './OnlineUsers';
import FileUploader from './FileUploader';
import ShowInfoPanel from './ShowInfoPanel';
import ColorPickerBar from './ColorPickerBar';
import BottomRightBar from './BottomRightBar';
import MoreActionsBar from './MoreActionsBar';
// theme
import { ThemeContext } from '../context/ThemeContext';
// save functionality
import { saveAs } from 'file-saver';
import { saveDrawing } from '../utils/saveDrawing';
import { getDrawings } from '../utils/getDrawings';

function Canvas({sendMessage, setRoomId, incomingDrawings, roomId, usersList, username}) {
    // load theme
    const { theme, toggle, dark } = React.useContext(ThemeContext)
    const [background, setBackground] = useState('#15171A')
    const [lineWidth, setLineWidth] = useState(3);
    const [instrument, setInstrument] = useState('pencil');
    const [showFileUploader, setShowFileUploader] = useState(false);
    const [textReadFromFile, setTextReadFromFile] = useState('');
    const [canvasUploaded, setCanvasUploaded] = useState(false);
    const [showInfoPanel, setShowInfoPanel] = useState(true);

    const canvasContainerRef = useRef();
    const canvasRef = useRef();
    const cursorRef = useRef();

    // stroke style (the current color to draw on canvas)
    const [strokeStyle, setStrokeStyle] = useState('#fff');

    // list of all strokes drawn
    const [drawings, setDrawings] = useState([]);

    // coordinates of our cursor
    const [cursorX, setCursorX] = useState(10);
    const [cursorY, setCursorY] = useState(10);
    const [prevCursorX, setPrevCursorX] = useState(10);
    const [prevCursorY, setPrevCursorY] = useState(10);

    // distance from origin
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    // zoom amount
    const [scale, setScale] = useState(1);

    // mouse functions
    const [leftMouseDown, setLeftMouseDown] = useState(false);
    const [rightMouseDown, setRightMouseDown] = useState(false);

    const [drawingHistory, setDrawingHistory] = useState([]);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // disable right clicking
        document.oncontextmenu = function () {
            return false;
        }

        // if the window changes size, redraw the canvas
        window.addEventListener("resize", (event) => {
            redrawCanvas();
        });
        redrawCanvas();

        
    }, [])

    useEffect(() => {
        if(roomId) {
            getDrawings(roomId)
            .then((resp) => {
                let allNewDrawingsCoords = [];

                for(let i = 0; i < resp.length; i++) {
                    // for every drawing from DB
                    for(let j = 0; j < resp[i].line.length; j++) {
                        allNewDrawingsCoords.push(resp[i].line[j])
                        // set drawings
                        setDrawings(drawings => [...drawings, resp[i].line[j]]);
                    }
                }

                // redraw canvas
                drawToCanvas(allNewDrawingsCoords)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [roomId])

    /* useEffect(() => {
        redrawCanvas()
        console.log('######################################################################################################')
        console.log(drawings)
    }, [drawings]) */

    useEffect(() => {
        redrawCanvas();
    }, [background])

    useEffect(() => {
        if(drawings.length) setDisabled(false);
        else setDisabled(true);
    }, [drawings])

    useEffect(() => {
        if(!theme.backgroundColor) return;
        setBackground(theme.backgroundColor);
    }, [theme])
  
    useEffect(() => {
        if(instrument === 'eraser') document.body.style.cursor = 'none';
        else if(instrument === 'pencil') document.body.style.cursor = 'default';
        else document.body.style.cursor = 'default';
        
    }, [instrument])

    // convert coordinates
    const toScreenX = xTrue => ((xTrue + offsetX) * scale)
    const toScreenY = yTrue => ((yTrue + offsetY) * scale)
    const toTrueX = xScreen => ((xScreen / scale) - offsetX)
    const toTrueY = yScreen => ((yScreen / scale) - offsetY)
    const trueHeight = () => (canvasRef.current.clientHeight / scale)
    const trueWidth = () => (canvasRef.current.clientWidth / scale)

    const redrawCanvas = () => {      
        canvasRef.current.width = canvasContainerRef.current.clientWidth;
        canvasRef.current.height = canvasContainerRef.current.clientHeight;

        canvasRef.current.getContext("2d").fillStyle = background;
        canvasRef.current.getContext("2d").fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
       if(drawings.length) {
            for (let i = 0; i < drawings.length; i++) {
                const line = drawings[i];
                drawLine(toScreenX(line.x0), toScreenY(line.y0), toScreenX(line.x1), toScreenY(line.y1), line.color, lineWidth, instrument);
            }
        }   
    }

    const drawToCanvas = (drawings) => {      
        canvasRef.current.width = canvasContainerRef.current.clientWidth;
        canvasRef.current.height = canvasContainerRef.current.clientHeight;

        canvasRef.current.getContext("2d").fillStyle = background;
        canvasRef.current.getContext("2d").fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
       if(drawings.length) {
            for (let i = 0; i < drawings.length; i++) {
                const line = drawings[i];
                drawLine(toScreenX(line.x0), toScreenY(line.y0), toScreenX(line.x1), toScreenY(line.y1), line.color, lineWidth, instrument);
            }
        }   
    }

    useEffect(() => {
        let start, finish;
        if(leftMouseDown) {
            start = {
                x: cursorX,
                y: cursorY
            }

            // Add to history the first point of the new draw (from where it begins)
            setDrawingHistory(drawingHistory => [...drawingHistory, start]);
            return;
        }

        if(!leftMouseDown) {
            finish = {
                x: prevCursorX,
                y: prevCursorY
            }

            // Add to history the last point of the new draw (where it finished)
            setDrawingHistory(drawingHistory => [...drawingHistory, finish]);
            return;
        }
    }, [leftMouseDown])

    const onMouseDown = (event) => {

        // detect left clicks
        if (event.button == 0) {
            setLeftMouseDown (true);
            setRightMouseDown (false);
        }
        // detect right clicks
        if (event.button == 2) {
            setRightMouseDown (true);
            setLeftMouseDown (false);
        }

        // update the cursor coordinates
        setCursorX(event.pageX);
        setCursorY(event.pageY);
        setPrevCursorX(event.pageX);
        setPrevCursorY(event.pageY);
    }

    const onMouseMove = (event) => {
        // get mouse position
        setCursorX(event.pageX);
        setCursorY(event.pageY);

        const scaledX = toTrueX(cursorX);
        const scaledY = toTrueY(cursorY);
        const prevScaledX = toTrueX(prevCursorX);
        const prevScaledY = toTrueY(prevCursorY);

        if (leftMouseDown) {
            // add the line to our drawing history
            const drawing = {
                x0: prevScaledX,
                y0: prevScaledY,
                x1: scaledX,
                y1: scaledY,
                color: strokeStyle,
                username: username,
                lineWidth: lineWidth,
                instrument: instrument
            };

            setDrawings(drawings => [...drawings, drawing]);
            
            // broadcast coordinates of the latest drawing in the current room
            sendMessage(drawing);
            
            // draw a line
            drawLine(prevCursorX, prevCursorY, cursorX, cursorY, strokeStyle, lineWidth, instrument);
        }
        if (rightMouseDown) {
            // move the screen
            setOffsetX(offsetX + (cursorX - prevCursorX) / scale);
            setOffsetY(offsetY + (cursorY - prevCursorY) / scale);
            redrawCanvas();
        }

        setPrevCursorX(cursorX);
        setPrevCursorY(cursorY);
    }

    const onMouseUp = () => {
        setLeftMouseDown(false);
        setRightMouseDown(false);
    }

    const onMouseWheel = (event) => {
        const deltaY = event.deltaY;
        const scaleAmount = -deltaY / 500;
        setScale(scale * (1 + scaleAmount));

        // zoom the page based on where the cursor is
        let distX = event.pageX / canvasRef.current.clientWidth;
        let distY = event.pageY / canvasRef.current.clientHeight;

        // calculate how much we need to zoom
        const unitsZoomedX = trueWidth() * scaleAmount;
        const unitsZoomedY = trueHeight() * scaleAmount;

        const unitsAddLeft = unitsZoomedX * distX;
        const unitsAddTop = unitsZoomedY * distY;

        setOffsetX(offsetX - unitsAddLeft);
        setOffsetY(offsetY - unitsAddTop);

        redrawCanvas();
    }

    const drawLine = (x0, y0, x1, y1, color, lineWidth, instrument) => {
        let context = canvasRef.current.getContext("2d");
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineCap = 'round';
        context.lineTo(x1, y1);

        if(instrument === 'pencil') context.strokeStyle = color;
        else if(instrument === 'eraser') context.strokeStyle = background;
        else console.log('Error: The instrument selected isn\'t working correctly, please refresh the page!')
        
        context.lineWidth = lineWidth;
        context.stroke();
    }

    // every time a new drawing comes from server, draw it only if it wasn't sent by the same client that receives it
    useEffect(() => {
        // If this client sent the last drawing coordinates to server, do not redraw them
        // Else if this client hasn't sent last drawing coordinates to server, draw the received coordinates
        if(!incomingDrawings || incomingDrawings.username === username) return;
        drawLine(toScreenX(incomingDrawings.x0), toScreenY(incomingDrawings.y0), toScreenX(incomingDrawings.x1), toScreenY(incomingDrawings.y1), incomingDrawings.color, incomingDrawings.lineWidth, incomingDrawings.instrument);
    }, [incomingDrawings])

    const undo = () => {    
        if(disabled) return;    
        // remove all points drawed between the first and last point of the last draw
        const startPointOfLastDraw = drawingHistory.slice(drawingHistory.length-2, drawingHistory.length-1);
        const lastPointOfLastDraw = drawingHistory.slice(drawingHistory.length-1, drawingHistory.length);
        let firstIndex = -1;
        let lastIndex = -1;

        for(let i=0; i < drawings.length; i++) {
            if(drawings[i].x1 === startPointOfLastDraw[0].x && drawings[i].y1 === startPointOfLastDraw[0].y) {
                firstIndex = i;
            }

            if(Math.abs(drawings[i].x1 - lastPointOfLastDraw[0].x)  < 8 && Math.abs(drawings[i].y1 - lastPointOfLastDraw[0].y) < 8) {
                lastIndex = i;
            }
        }

        // the new drawings array
        const newDrawings = [];

        // if firstIndex and lastIndex are different than -1, it means that there was a last object drawn
        // so we will iterate over the current drawings array and remove the the elements of the array with indexes
        // between firstIndex and lastIndex
        for(let i=0; i<drawings.length; i++) 
            if(firstIndex >= 0 && lastIndex >= 0) 
                if(i < firstIndex || i > lastIndex) 
                    newDrawings.push(drawings[i]); 
            
        if(newDrawings.length) setDrawings([...newDrawings]); 
        else if(newDrawings.length === 0 && !(firstIndex === -1 || lastIndex === -1)) {
            setDrawings([]);
        }
        
        // remove the last two items from history (the beginning and finish points of last drawing)
        setDrawingHistory(drawingHistory.slice(0, drawingHistory.length-2));
        
        // redraw the canvas
        canvasRef.current.width = canvasContainerRef.current.clientWidth;
        canvasRef.current.height = canvasContainerRef.current.clientHeight;

        canvasRef.current.getContext("2d").fillStyle = background;
        canvasRef.current.getContext("2d").fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        if(newDrawings.length) {
            for (let i = 0; i < newDrawings.length; i++) {
                const line = newDrawings[i];
                drawLine(toScreenX(line.x0), toScreenY(line.y0), toScreenX(line.x1), toScreenY(line.y1), line.color, lineWidth, instrument);
            }
        } else {
            console.log('Canvas empty')
        } 
    }

    const save = () => {
        if(disabled) return;    

        const lastDrawingsJSON = {
            drawings: drawings,
            history: drawingHistory
        }

        let blob = new Blob([JSON.stringify(lastDrawingsJSON, null, 2)], {type : 'application/json'});

        saveAs(blob, "canvas.txt");
    }

    const importFile = ()  => {
        setShowFileUploader(true)
    }   

    // when a canvas.txt file was uploaded, read it and set the state
    useEffect(() => {
        if(textReadFromFile === '') return;
        const result = JSON.parse(textReadFromFile)
        setDrawings([...result.drawings])
        setDrawingHistory([...result.history])
        setTimeout(() => {
            setCanvasUploaded(true);
        }, 1000)        
    }, [textReadFromFile])

    // after the state has changed and if a new .txt file was uploaded, redraw canvas
    useEffect(() => {
        if(!canvasUploaded) return;
        redrawCanvas();
        setCanvasUploaded(false);
    }, [canvasUploaded])

    // every time a new element is drawn, save it to DB
    useEffect(() => {
        if(!drawingHistory) return;
        else {
            // get all the coordinates of the last drawing and send it to server
            const startPointOfLastDraw = drawingHistory.slice(drawingHistory.length-2, drawingHistory.length-1);
            const lastPointOfLastDraw = drawingHistory.slice(drawingHistory.length-1, drawingHistory.length);
            let firstIndex = -1;
            let lastIndex = -1;

            for(let i=0; i < drawings.length; i++) {
                if(drawings[i].x1 === startPointOfLastDraw[0].x && drawings[i].y1 === startPointOfLastDraw[0].y) {
                    firstIndex = i;
                }

                if(Math.abs(drawings[i].x1 - lastPointOfLastDraw[0].x)  < 8 && Math.abs(drawings[i].y1 - lastPointOfLastDraw[0].y) < 8) {
                    lastIndex = i;
                }
            }

            // the new drawings array
            const newDrawings = [];

            // if firstIndex and lastIndex are different than -1, it means that there was a last object drawn
            // so we will iterate over the current drawings array and save the elements of the array with indexes
            // between firstIndex and lastIndex
            for(let i=0; i<drawings.length; i++) 
                if(firstIndex >= 0 && lastIndex >= 0) 
                    if(i > firstIndex && i < lastIndex) 
                        newDrawings.push(drawings[i]); 

            if(newDrawings.length)   
                saveDrawing(roomId, newDrawings);

            /* 
            {
                "line": [
                    {
                        "x0":"892",
                        "y0":"459",
                        "x1":"893",
                        "y1":"458",
                        "color":"#fff",
                        "username":"costin",
                        "lineWidth":"3",
                        "instrument":"pencil"
                    }
                ]
            }
            */

            /* 
                [
                    {
                        "line": [
                            {
                                "x0": 735,
                                "y0": 529,
                                "x1": 737,
                                "y1": 527,
                                "color": "#fff",
                                "userID": null,
                                "lineWidth": 3,
                                "instrument": "pencil"
                            },
                        ]
                    }
                ]
            */
        }
    }, [drawingHistory])
    return (
        <div 
            ref={canvasContainerRef}
            style={{position: 'relative', zIndex: '1', width: '100vw', height: '100vh'}}
        >
            <ColorPickerBar 
                setStrokeStyle={setStrokeStyle}
            />
            <LeftBar 
                save={save} 
                disabled={disabled}
                importFile={importFile}
            />
            <OnlineUsers usersList={usersList}/>
            {showFileUploader 
                && <FileUploader 
                    setShowFileUploader={setShowFileUploader}
                    setTextReadFromFile={setTextReadFromFile}    
                />
            }
            {showInfoPanel && <ShowInfoPanel setShowInfoPanel={setShowInfoPanel}/>}
            <BottomRightBar 
                scale={scale} 
                undo={undo} 
                disabled={disabled}
                setRoomId={setRoomId}
                roomId={roomId}
            />
            <MoreActionsBar 
                lineWidth={lineWidth} 
                setLineWidth={setLineWidth} 
                setInstrument={setInstrument} 
                instrument={instrument}
                color={strokeStyle}
            />
            <canvas 
                id="canvas" 
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
                onWheel={onMouseWheel}
            >Your browser does not support HTML5 canvas</canvas>
            {instrument === 'eraser'
                &&  <div
                        ref={cursorRef}
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: "50%",
                            border: `1px solid ${theme.secondaryColor}`,
                            position: "absolute",
                            zIndex: 999999999,
                            top: cursorY - 10,
                            left: cursorX - 10,
                            pointerEvents: "none"
                        }}
                    ></div>

            }
        </div>
    )
}

export default Canvas
