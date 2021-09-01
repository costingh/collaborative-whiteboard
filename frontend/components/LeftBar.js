import React, {useState, useEffect} from 'react'
import styles from '../styles/LeftBar.module.scss'
import { ThemeContext } from '../context/ThemeContext'
import CreateTooltip from './CreateTooltip';

function LeftBar({save, disabled, importFile}) {
    const { theme, toggle, dark } = React.useContext(ThemeContext)
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);
    }, [theme])

    return (
        <div className={styles.leftbar}>
            <CreateTooltip
                id='save'
                background={{background: `${disabled ? '#222' : backgroundColor}`}}
                action={save}
                icon='💾'
                type={`${disabled ? 'error' : 'info'}`}
                effect='solid'
                text={'Save Canvas'}
            />

            <CreateTooltip
                id='import'
                background={{background: `${backgroundColor}`}}
                action={importFile}
                icon='📤'
                type={'info'}
                effect='solid'
                text={'Import Canvas'}
            />
        </div>
    )
}

export default LeftBar
