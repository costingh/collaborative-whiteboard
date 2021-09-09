import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/BottomRightBar.module.scss'
import infoPanelStyles from '../styles/ShowInfoPanel.module.scss'
import { ThemeContext } from '../context/ThemeContext'
import CustomizedSnackbar from './CustomizedSnackbar';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CreateTooltip from './CreateTooltip';
import dynamic from "next/dynamic";
import {getRoom} from '../utils/getRoom'

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function BottomRightBar({scale, undo, disabled, setRoomId, roomId}) {
    const { theme, toggle, info } = React.useContext(ThemeContext);
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');
    const [showJoinRoomPanel, setShowJoinRoomPanel] = useState(false);
    const roomIdRef = useRef(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [button, setButton] = useState(infoPanelStyles.closeBtnDisabled);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);

        if(!theme.color) return;
        setColor(theme.color);
    }, [theme])

    const setButtonStyle = () => {
        if(roomIdRef.current.value === '') {
            setButton(infoPanelStyles.closeBtnDisabled)
        } else {
            setButton(infoPanelStyles.closeBtn)
        }
    }

    const changeRoom = () => {
        if(roomIdRef.current.value === '') return 
        else {
            if(roomId === roomIdRef.current.value) {
                // User is trying to connect to the same room he's already connected
                setSnackbarMsg('You are already connected to this room!')
                setShowSnackbar(true);
                setSnackbarSeverity("warning");
            } else {
                // User tries to connect to a different room, therefor we should check if the room exists in DB
                getRoom(roomIdRef.current.value)
                    .then(() => {
                        console.log('here 1')
                        setSnackbarMsg('Connected succssfully')
                        setRoomId(roomIdRef.current.value);
                        setShowJoinRoomPanel(false);
                        setButton(infoPanelStyles.closeBtnDisabled)
                        setShowSnackbar(true);
                        setSnackbarSeverity("success");
                    })
                    .catch((err) => {
                        console.log('here 2')
                        setSnackbarMsg('Room doesn\'t exist')
                        setShowSnackbar(true);
                        setSnackbarSeverity("error");
                    })
            }
        }
    }

    const copyID = () => {
        setSnackbarMsg('ID Copied to Clipboard!')
        setShowSnackbar(true)
        setSnackbarSeverity("info");
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
                                <input className={infoPanelStyles.input} placeholder="fkjsldwkwqrn" ref={roomIdRef} onChange={setButtonStyle}/>
                            </div>
                        </div>
                        <div className={infoPanelStyles.bottom}>
                            <div className={button} onClick={changeRoom}>Join Room</div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.bottomRightBar}> 

                {/* Copy Current Room ID */}
                <CopyToClipboard
                    text={roomId}
                    onCopy={copyID}
                >
                    <div>
                        <a data-tip data-for='copyRoomAddress' className={styles.toggleTheme} style={{background: `${backgroundColor}`, color: `${color}`}}> 🔗 </a>
                        <ReactTooltip id='copyRoomAddress' type='info' effect="solid">
                            <span>Copy ID </span>
                        </ReactTooltip>
                    </div>
                </CopyToClipboard>

                {/* Change Room */}
                <CreateTooltip
                    id='joinRoom'
                    background={{background: `${backgroundColor}`, color: `${color}`}}
                    action={() => setShowJoinRoomPanel(!showJoinRoomPanel)}
                    stylesClass={styles.toggleTheme}
                    icon='🚪'
                    type={'info'}
                    effect='solid'
                    text={'Change Room'}
                />

                {/* Toggle theme */}
                <CreateTooltip
                    id='toggleTheme'
                    background={{background: `${backgroundColor}`}}
                    action={toggle}
                    stylesClass={styles.toggleTheme}
                    icon='💡'
                    type={'info'}
                    effect='solid'
                    text={'Change Theme'}
                />

                {/* Undo */}
                <CreateTooltip
                    id='undo'
                    background={{background: `${disabled ? '#222' : backgroundColor}`}}
                    action={undo}
                    stylesClass={styles.undo}
                    icon='↺'
                    type={`${disabled ? 'error' : 'info'}`}
                    effect='solid'
                    text={'Undo'}
                />

                <div className={styles.scale} style={{background: `${backgroundColor}`, color: `${color}`}}>Scale: {scale.toFixed(1)}</div> 
            </div>

            <CustomizedSnackbar open={showSnackbar} setShowSnackbar={setShowSnackbar} snackbarMsg={snackbarMsg} severity={snackbarSeverity}/>
        </>
    )
}

export default BottomRightBar



