import React, {useState, useEffect} from 'react';
import { Slider } from 'rsuite';
import { ThemeContext } from '../context/ThemeContext'
import 'rsuite/dist/styles/rsuite-default.css';
import styles from '../styles/SelectThicknessSlider.module.scss'

function SelectThicknessSlider({lineWidth, setLineWidth, instrument}) {

    const { theme, toggle, dark } = React.useContext(ThemeContext);
    const [color, setColor] = useState('#222');
    const [maxVal, setMaxVal] = useState(10);

    useEffect(() => {
        if(!theme.color) return;
        setColor(theme.color);
    }, [theme])

    useEffect(() => {
        if(instrument === 'pencil') {
            setMaxVal(10);
            if(lineWidth > 10) setLineWidth(10);
        }
        else if (instrument ==='eraser') setMaxVal(40);
        else console.log('error!')
    }, [instrument, lineWidth])

    return (
        <div className={styles.selectThicknessSlider}>
            <p className={styles.text} style={{color: color }}>Thickness</p>
            <Slider
                progress
                defaultValue={lineWidth}
                onChange={value => {
                    setLineWidth(value);
                }}
                min={1}
                max={maxVal}
                style={{width: '150px'}}
            />
        </div>
    )
}

export default SelectThicknessSlider