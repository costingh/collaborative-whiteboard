import React, { useState, useEffect, useRef, useContext, useCallback} from 'react'
import ColorPickerBar from './ColorPickerBar';
import LeftBar from './LeftBar';
import OnlineUsers from './OnlineUsers';
import BottomRightBar from './BottomRightBar';
import MoreActionsBar from './MoreActionsBar';

function Canvas() {
    return (
        <div>
            <ColorPickerBar/>
            <LeftBar/>
            <OnlineUsers/>
            <BottomRightBar/>
            {/* <MoreActionsBar/> */}
            <canvas 
            id="canvas" 
        >Your browser does not support HTML5 canvas</canvas>
        </div>
    )
}

export default Canvas
