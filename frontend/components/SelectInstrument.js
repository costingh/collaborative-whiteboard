import React, {useState, useEffect} from 'react'
import { ThemeContext } from '../context/ThemeContext'
import styles from '../styles/SelectInstrument.module.scss'

function SelectInstrument({setInstrument}) {
    const { theme, toggle, dark } = React.useContext(ThemeContext)

    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');

    useEffect(() => {
        if(!theme.backgroundColor) return;
        setBackgroundColor(theme.backgroundColor);
    }, [theme])

    return (
        <div className={styles.selectInstrument}>
            <div 
                className={styles.instrument}
                style={{background: `${backgroundColor}`}}
                onClick={() => setInstrument('pencil')}    
            >✒️</div>
            <div 
                className={styles.instrument}
                style={{background: `${backgroundColor}`}}
                onClick={() => setInstrument('eraser')}    
            >🧹</div>
        </div>
    )
}

export default SelectInstrument
