import React, {useState, useEffect} from 'react'
import styles from '../styles/BottomRightBar.module.scss'
import { ThemeContext } from '../context/ThemeContext'

function BottomRightBar({scale, undo, disabled}) {
    const { theme, toggle, dark } = React.useContext(ThemeContext);
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);

        if(!theme.color) return;
        setColor(theme.color);
    }, [theme])

    return (
        <div className={styles.bottomRightBar}> 
            <div className={styles.toggleTheme} onClick={toggle} style={{background: `${backgroundColor}`}}>💡</div>
            <div className={styles.undo} onClick={undo} style={{background: `${disabled ? '#222' : backgroundColor}`}}>↺</div>
            <div className={styles.scale} style={{background: `${backgroundColor}`, color: `${color}`}}>Scale: </div>
        </div>
    )
}

export default BottomRightBar
