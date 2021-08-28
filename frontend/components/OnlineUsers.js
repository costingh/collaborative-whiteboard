import React, {useState, useEffect} from 'react'
import styles from '../styles/OnlineUsers.module.scss'
import { ThemeContext } from '../context/ThemeContext'

function OnlineUsers() {
    const { theme, toggle, dark } = React.useContext(ThemeContext)
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);

        if(!theme.color) return;
        setColor(theme.color);
    }, [theme])

    return (
        <div className={styles.onlineUsers} style={{background: `${backgroundColor}`, color: `${color}`}}>
            <p>2</p>
            <p>👤</p>
        </div>
    )
}

export default OnlineUsers
