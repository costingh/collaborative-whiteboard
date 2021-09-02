import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/ShowInfoPanel.module.scss'
// random username generator
import {generateRandomUsername} from '../utils/utils';
import CustomizedSnackbar from './CustomizedSnackbar';

function ShowChooseNamePanel({setPickUsername, setUsername, setShowInfoPanel, pickUsername}) {
    const [button, setButton] = useState(styles.closeBtnDisabled);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const usernameRef = useRef(null);

    const closePanel = () => {
        setPickUsername(false)
        //setShowInfoPanel(true)
        setButton(styles.closeBtnDisabled);
    }

    const handleInputChange = () => {
        if(usernameRef.current.value === '') setButton(styles.closeBtnDisabled) 
        else setButton(styles.closeBtn) 
    }

    const openSbackbar = () => {
        setOpen(true);
        setSnackbarMsg('Name changed to ' + usernameRef.current.value);
        
    }

    const handleUsernameSubmit = () => {
        if(button !== styles.closeBtnDisabled) {
            openSbackbar();
            setUsername(usernameRef.current.value);
            closePanel();
        }
    }

    const handleRandomUsername = () => {
        usernameRef.current.value = generateRandomUsername()
        if(usernameRef.current.value !== '') {
            setButton(styles.closeBtn)
        }
    }

    return (
        <>
            {pickUsername
                && <div className={styles.infoPanel}>
                        <div className={styles.inner}>
                            <div className={styles.top}>
                                <div className={styles.paragraph}>
                                    <h1>Pick a username: ⌨️ 👇</h1>
                                    <div className={styles.close} onClick={closePanel}>x</div>
                                </div>
                            </div>
                            <div className={styles.middle}>
                                <div className={styles.enterUsername}>
                                    <input className={styles.input} placeholder="Username" ref={usernameRef} onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={button} onClick={handleUsernameSubmit}>Choose</div>
                                <div className={styles.closeBtn} onClick={handleRandomUsername}>Random</div>
                            </div>
                        </div>
                    </div>
            }
            <CustomizedSnackbar open={open} setShowSnackbar={setOpen} snackbarMsg={snackbarMsg}/>
        </>

    )
}

export default ShowChooseNamePanel
