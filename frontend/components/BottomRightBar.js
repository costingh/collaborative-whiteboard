import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/BottomRightBar.module.scss'
import infoPanelStyles from '../styles/ShowInfoPanel.module.scss'
import { ThemeContext } from '../context/ThemeContext'
import CustomizedSnackbar from './CustomizedSnackbar';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';

function BottomRightBar({scale, undo, disabled, setRoomId, roomId}) {
    const { theme, toggle, info } = React.useContext(ThemeContext);
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

                {/* Copy Current Room ID */}
                <CopyToClipboard
                    text={roomId}
                >
                    <div>
                        <a data-tip data-for='copyRoomAddress' className={styles.toggleTheme} style={{background: `${backgroundColor}`, color: `${color}`}}> 🔗 </a>
                        <ReactTooltip id='copyRoomAddress' type='info' effect="solid">
                            <span>Copy <br></br> Room <br></br> ID </span>
                        </ReactTooltip>
                    </div>
                </CopyToClipboard>

                {/* Change Room */}
                <a data-tip data-for='joinRoom' className={styles.toggleTheme} onClick={() => setShowJoinRoomPanel(!showJoinRoomPanel)} style={{background: `${backgroundColor}`, color: `${color}`}}> 🚪 </a>
                <ReactTooltip id='joinRoom' type='info' effect="solid">
                    <span>Change <br></br> Room</span>
                </ReactTooltip>

                {/* Toggle theme */}
                <a data-tip data-for='toggleTheme' className={styles.toggleTheme} onClick={toggle} style={{background: `${backgroundColor}`}}> 💡 </a>
                <ReactTooltip id='toggleTheme' type='info' effect="solid">
                    <span>Change <br></br> Theme</span>
                </ReactTooltip>

                <a data-tip data-for='undo' className={styles.undo} onClick={undo} style={{background: `${disabled ? '#222' : backgroundColor}`}}> ↺ </a>
                <ReactTooltip id='undo' type={`${disabled ? 'error' : 'info'}`} effect="solid">
                    <span>Undo</span>
                </ReactTooltip>

                <div className={styles.scale} style={{background: `${backgroundColor}`, color: `${color}`}}>Scale: {scale.toFixed(1)}</div> 
            </div>

            <CustomizedSnackbar open={showSnackbar} setShowSnackbar={setShowSnackbar}/>
        </>
    )
}

export default BottomRightBar



