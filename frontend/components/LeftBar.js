import React, {useState, useEffect} from 'react'
import styles from '../styles/LeftBar.module.scss'
import { ThemeContext } from '../context/ThemeContext'
import ReactTooltip from 'react-tooltip';

function LeftBar({save, disabled, importFile}) {
    const { theme, toggle, dark } = React.useContext(ThemeContext)
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);
    }, [theme])

    return (
        <div className={styles.leftbar}>
            <a data-tip data-for='save' style={{background: `${disabled ? '#222' : backgroundColor}`}} onClick={save} > 💾 </a>
            <ReactTooltip id='save' type={`${disabled ? 'error' : 'info'}`} effect="solid">
                <span>Save <br></br> Canvas </span>
            </ReactTooltip>

            <a data-tip data-for='import' style={{background: `${backgroundColor}`}} onClick={importFile}  > 📤 </a>
            <ReactTooltip id='import' type='info' effect="solid">
                <span>Import <br></br> Canvas </span>
            </ReactTooltip>
        </div>
    )
}

export default LeftBar
