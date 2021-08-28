import React, {useState, useEffect} from 'react'
import styles from '../styles/OnlineUsers.module.scss'

function OnlineUsers() {
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');

    return (
        <div className={styles.onlineUsers} style={{background: `${backgroundColor}`, color: `${color}`}}>
            <p>2</p>
            <p>👤</p>
        </div>
    )
}

export default OnlineUsers
