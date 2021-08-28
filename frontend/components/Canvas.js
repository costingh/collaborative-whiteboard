import React from 'react'
import ColorPickerBar from './ColorPickerBar'

function Canvas() {
    return (
        <div>
            <ColorPickerBar/>
            <canvas 
            id="canvas" 
        >Your browser does not support HTML5 canvas</canvas>
        </div>
    )
}

export default Canvas
