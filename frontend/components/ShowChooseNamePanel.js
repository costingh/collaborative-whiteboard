import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/ShowInfoPanel.module.scss'
import CustomizedSnackbar from './CustomizedSnackbar';
import {createRoom} from '../utils/createRoom';
import { useRouter } from 'next/router'
import Spinner from './Spinner';
import { getRoom } from '../utils/getRoom';

function ShowChooseNamePanel() {
    const router = useRouter()

    const [button, setButton] = useState(styles.closeBtnDisabled);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [username, setUsername] = useState('')
    const [roomName, setRoomName] = useState('')
    const [roomAddress, setRoomAddress] = useState('')
    const [showCreateRoom, setShowCreateRoom] = useState(true);
    const [loading, setLoading] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    
    const usernameRef = useRef(null);
    const roomNameRef = useRef(null);
    const roomAddressRef = useRef(null);

    const handleInputChange = (e) => {
        setUsername(e.target.value)
    }

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const handleRoomAddressChange = (e) => {
        setRoomAddress(e.target.value)
    }

    useEffect(() => {
        if(showCreateRoom) {
            if(username && roomName) setButton(styles.closeBtn)
            else setButton(styles.closeBtnDisabled)
        } else {
            if(username && roomAddress) setButton(styles.closeBtn)
            else setButton(styles.closeBtnDisabled)
        }
    }, [username, roomName, roomAddress])

    const openSbackbar = (msg) => {
        setOpen(true);
        setSnackbarMsg(msg);
    }

    const handleCreateRoom = async () => {
        if(button !== styles.closeBtnDisabled && showCreateRoom) {
            setLoading(true)
            const  message = 'User ' + username + ' has successfully created room ' + roomName;
            openSbackbar(message);

            const participants = [];

            await createRoom(
                roomName, 
                '', 
                participants
            ).then((resp) => {
                    router.push(`/room/${resp.id}?username=${username}`);    
            })
            .catch((err) => console.log(err));
        }
    }

    const handleJoinRoom = () => {
        if(button !== styles.closeBtnDisabled && !showCreateRoom) {
             getRoom(roomAddress)
                    .then((resp) => {
                        setLoading(true)
                        openSbackbar('Connecting to ' + resp.name);
                        setSnackbarSeverity("success");
                        router.push(`/room/${roomAddress}?username=${username}`);
                    })
                    .catch((err) => {
                        openSbackbar('Room doesn\'t exist');
                        setSnackbarSeverity("error");
                        setLoading(false)
                    })
        }
    }

    const changePanel = () => {
        setShowCreateRoom(!showCreateRoom)
        setButton(styles.closeBtnDisabled)
    }

    return (
        <>
            {loading
                ?   <Spinner
                        color={'#fff'} 
                        loading={loading}
                    />
                :   <div className={styles.infoPanel}>
                        <div className={styles.inner}>
                            <div className={styles.top}>
                                <div className={styles.tabs}>
                                    <p style={{borderBottom: showCreateRoom ? '2px solid #333' : 'none'}} onClick={changePanel}>Create a Room</p>
                                    <p style={{borderBottom: !showCreateRoom ? '2px solid #333' : 'none'}} onClick={changePanel}>Join Existing Room</p>
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
                                        </>
                                    :   <div className={styles.enterUsername}>
                                            <p>Enter Room Address: 👉</p>
                                            <input className={styles.input} placeholder="Room Address" ref={roomAddressRef} onChange={handleRoomAddressChange}/>
                                        </div>
                                }
                            </div>
                            <div className={styles.bottom}>
                                {showCreateRoom
                                    ?   <div className={button} onClick={handleCreateRoom}>Create Room</div>
                                    :   <div className={button} onClick={handleJoinRoom}>Join Room</div>                      
                                }
                            </div>
                        </div>
                    </div>
            }
            <CustomizedSnackbar open={open} setShowSnackbar={setOpen} snackbarMsg={snackbarMsg} severity={snackbarSeverity}/>
        </>

    )
}

export default ShowChooseNamePanel
