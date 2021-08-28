import React, {useState, useEffect} from 'react'
import styles from '../styles/LeftBar.module.scss'

function LeftBar({save, disabled, importFile}) {
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');

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
