import React, { useState, useEffect, useRef, useContext, useCallback} from 'react'
import ColorPickerBar from './ColorPickerBar';
import LeftBar from './LeftBar';


function Canvas() {
    return (
        <div>
            <ColorPickerBar/>
            <LeftBar/>
            <canvas 
            id="canvas" 
        >Your browser does not support HTML5 canvas</canvas>
        </div>
    )
}

export default Canvas
