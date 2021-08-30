import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/BottomRightBar.module.scss'
import infoPanelStyles from '../styles/ShowInfoPanel.module.scss'
import { ThemeContext } from '../context/ThemeContext'
import CustomizedSnackbar from './CustomizedSnackbar';

function BottomRightBar({scale, undo, disabled, setRoomId}) {
    const { theme, toggle, dark } = React.useContext(ThemeContext);
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');
    const [showJoinRoomPanel, setShowJoinRoomPanel] = useState(false);
    const roomIdRef = useRef(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);

        if(!theme.color) return;
        setColor(theme.color);
    }, [theme])

    const changeRoom = () => {
        setRoomId(roomIdRef.current.value);
        setShowJoinRoomPanel(false);
        setShowSnackbar(true);
    }

    return (
        <>
            {showJoinRoomPanel && 
                <div className={infoPanelStyles.infoPanel}>
                    <div className={infoPanelStyles.inner}>
                        <div className={infoPanelStyles.top}>
                            <div className={infoPanelStyles.paragraph}>
                                <h1>Enter a room ID</h1>
                                <div className={infoPanelStyles.close} onClick={() => setShowJoinRoomPanel(false)}>x</div>
                            </div>
                        </div>
                        <div className={infoPanelStyles.middle}>
                            <div className={infoPanelStyles.enterId}>
                                <h1 className={infoPanelStyles.heading}>Enter ID:</h1>
                                <input className={infoPanelStyles.input} placeholder="fkjsldwkwqrn" ref={roomIdRef}/>
                                {/* <p className={infoPanelStyles.details}>room id</p> */}
                            </div>
                        </div>
                        <div className={infoPanelStyles.bottom}>
                            <div className={infoPanelStyles.closeBtn} onClick={changeRoom}>Join Room</div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.bottomRightBar}> 
                <div className={styles.toggleTheme} onClick={() => setShowJoinRoomPanel(!showJoinRoomPanel)} style={{background: `${backgroundColor}`, color: `${color}`}}>🚪</div>
                <div className={styles.toggleTheme} onClick={toggle} style={{background: `${backgroundColor}`}}>💡</div>
                <div className={styles.undo} onClick={undo} style={{background: `${disabled ? '#222' : backgroundColor}`}}>↺</div>
                <div className={styles.scale} style={{background: `${backgroundColor}`, color: `${color}`}}>Scale: {scale.toFixed(1)}</div> 
            </div>

            <CustomizedSnackbar open={showSnackbar} setShowSnackbar={setShowSnackbar}/>
        </>
    )
}

export default BottomRightBar
