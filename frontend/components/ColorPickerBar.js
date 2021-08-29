import React from 'react'
import styles from '../styles/ColorPickerBar.module.scss'

function ColorPickerBar({setStrokeStyle}) {
    const colorList = [
        '#23272B',
        '#C82333',
        '#FD7E14',
        '#E0A800',
        '#218838',
        '#0069D9',
        '#6610F2',
    ];

    const changeStrokeStyle = (color) => {
        setStrokeStyle(color);
    }

    return (
        <div className={styles.colorPickerBarscss}>
            {colorList.map((color, index) => 
                <div 
                    key={index}
                    style={{background: `${color}`}}
                    onClick={() => changeStrokeStyle(color)}
                />)}
        </div>
    )
}

export default ColorPickerBar
