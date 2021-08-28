import React, {useState, useEffect} from 'react'
import styles from '../styles/LeftBar.module.scss'
import { ThemeContext } from '../context/ThemeContext'

function LeftBar({save, disabled, importFile}) {
    const { theme, toggle, dark } = React.useContext(ThemeContext)
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);
    }, [theme])

    return (
        <div className={styles.leftbar}>
            <div 
                style={{background: `${disabled ? '#222' : backgroundColor}`}}
                onClick={save} 
            >
                💾
            </div>
            <div 
                style={{background: `${backgroundColor}`}}
                onClick={importFile} 
            >
                📤
            </div>
        </div>
    )
}

export default LeftBar
