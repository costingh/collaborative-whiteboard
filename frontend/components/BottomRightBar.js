import React, {useState, useEffect} from 'react'
import styles from '../styles/BottomRightBar.module.scss'

function BottomRightBar({scale, undo, disabled}) {
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');

    return (
        <div className={styles.bottomRightBar}> 
            <div className={styles.toggleTheme} style={{background: `${backgroundColor}`}}>💡</div>
            <div className={styles.undo} onClick={undo} style={{background: `${disabled ? '#222' : backgroundColor}`}}>↺</div>
            <div className={styles.scale} style={{background: `${backgroundColor}`, color: `${color}`}}>Scale: </div>
        </div>
    )
}

export default BottomRightBar
