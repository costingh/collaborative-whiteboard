import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/ShowInfoPanel.module.scss'
import CustomizedSnackbar from './CustomizedSnackbar';
import {createRoom} from '../utils/createRoom';
// method to generate ramdom strings
import randomString from 'random-string'
import { useRouter } from 'next/router'

function ShowChooseNamePanel() {
    const router = useRouter()

    const [button, setButton] = useState(styles.closeBtnDisabled);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [username, setUsername] = useState('')
    const [roomName, setRoomName] = useState('')
    const [roomDescription, setRoomDescription] = useState('')
    const [roomAddress, setRoomAddress] = useState('')
    const [showCreateRoom, setShowCreateRoom] = useState(true);
    
    const usernameRef = useRef(null);
    const roomNameRef = useRef(null);
    const roomDescriptionRef = useRef(null);
    const roomAddressRef = useRef(null);

    const handleInputChange = (e) => {
        setUsername(e.target.value)
    }

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setRoomDescription(e.target.value)
    }

    const handleRoomAddressChange = (e) => {
        setRoomAddress(e.target.value)
    }

    useEffect(() => {
        if(showCreateRoom) {
            if(username && roomName && roomDescription) setButton(styles.closeBtn)
            else setButton(styles.closeBtnDisabled)
        } else {
            if(username && roomAddress) setButton(styles.closeBtn)
            else setButton(styles.closeBtnDisabled)
        }
    }, [username, roomName, roomDescription, roomAddress])

    const openSbackbar = (msg) => {
        setOpen(true);
        setSnackbarMsg(msg);
    }

    const handleCreateRoom = () => {
        if(button !== styles.closeBtnDisabled && showCreateRoom) {
            const  message = 'User ' + usernameRef.current.value + ' has successfully created room ' + roomNameRef.current.value;
            openSbackbar(message);

            const participants = [];
            const room = createRoom(
                roomNameRef.current.value, 
                roomDescriptionRef.current.value, 
                participants
            );

            room
                .then((resp) => {
                    router.push(`/room/${resp.id}?username=${usernameRef.current.value}`);
                })
                .catch((err) => console.log(err))  
        }
    }

    const handleJoinRoom = () => {
        if(button !== styles.closeBtnDisabled && !showCreateRoom) {
            router.push(`/room/${roomAddressRef.current.value}?username=${usernameRef.current.value}`);
        }
    }

    const changePanel = () => {
        setShowCreateRoom(!showCreateRoom)
        setButton(styles.closeBtnDisabled)
    }

    return (
        <>
            <div className={styles.infoPanel}>
                <div className={styles.inner}>
                    <div className={styles.top}>
                        <div className={styles.paragraph}>
                            <h1>{showCreateRoom ? 'Create a Room👇' : 'Join Existing Room👇'}</h1>
                            <p>⌨️</p>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div className={styles.enterUsername}>
                            <p>Pick a username: 👉 </p>
                            <input className={styles.input} placeholder="Username" ref={usernameRef} onChange={handleInputChange}/>
                        </div>
                        {showCreateRoom
                            ?   <>
                                    <div className={styles.enterUsername}>
                                        <p>Pick a room name: 👉</p>
                                        <input className={styles.input} placeholder="Room Name" ref={roomNameRef} onChange={handleRoomNameChange}/>
                                    </div>
                                    <div className={styles.enterUsername}>
                                        <textarea className={styles.textarea} placeholder="Description" ref={roomDescriptionRef} onChange={handleDescriptionChange}/>
                                    </div>
                                </>
                            :   <div className={styles.enterUsername}>
                                    <p>Enter Room Address: 👉</p>
                                    <input className={styles.input} placeholder="Room Address" ref={roomAddressRef} onChange={handleRoomAddressChange}/>
                                </div>
                        }
                    </div>
                    <div className={styles.bottom}>
                        {showCreateRoom
                            ?   <>
                                    <div className={button} onClick={handleCreateRoom}>Create Room</div>
                                    <div className={styles.closeBtn} onClick={changePanel}>Join Room</div>
                                </>
                            :   <>
                                    <div className={styles.closeBtn} onClick={changePanel}>Create Room</div>
                                    <div className={button} onClick={handleJoinRoom}>Join Room</div>
                                </>                       
                        }
                    </div>
                </div>
            </div>
            <CustomizedSnackbar open={open} setShowSnackbar={setOpen} snackbarMsg={snackbarMsg}/>
        </>

    )
}

export default ShowChooseNamePanel
