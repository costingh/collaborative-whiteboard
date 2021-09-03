// router
import { useRouter } from 'next/router'
// react
import React, { useState, useEffect, useRef } from 'react'
// components
import Layout from '../../components/layout'
import Canvas from '../../components/Canvas'
import CustomizedSnackbar from '../../components/CustomizedSnackbar'
// context
import {ThemeProvider} from "../../context/ThemeContext"
// sockets
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
// method to generate ramdom strings
import randomString from 'random-string'
// random username generator
import {generateRandomUsername} from '../../utils/utils';

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Room() {  
    const router = useRouter()
	const [rid, setRid] = useState(null);
  	const [userId, setUserId] = useState(randomString({length: 15}));
	const [incomingDrawings, setIncomingDrawings] = useState(null);
  	const [username, setUsername] = useState(generateRandomUsername());
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState('');

	const ws = useRef(null);
	const stomp = useRef(null);

    useEffect(() => {
		if(!rid) {
			setRid(router.query.rid)
		} else {
			ws.current = new SockJS(SOCKET_URL);
			ws.current.onopen = () => alert("ws opened");
			ws.current.onclose = () => alert("ws closed");

			stomp.current = Stomp.over(ws.current);
			stomp.current.reconnect_delay = 5000;
			stomp.current.connect({}, frame => {
				const message = 'User ' + username + ' has joined the room!' ;
				stomp.current.send(`/app/send/${rid}/user`, {}, JSON.stringify(message));

				stomp.current.subscribe(`/topic/${rid}/user`, msg => {
					setSnackbarMsg(JSON.parse(msg.body));
					setSnackbarOpen(true);
				});

				stomp.current.subscribe(`/topic/${rid}`, coordinates => {
					setIncomingDrawings(JSON.parse(coordinates.body)) 
				});
			});

			return () => {
				ws.current.close();
			};
		}
    }, [rid]);

	const sendMessage = (message) => {
		stomp.current.send(`/app/send/${rid}`, {}, JSON.stringify(message));
	}

	const setRoomId = (newId) => {
		router.push(`/room/${newId}`);
		setRid(newId)
	}

  return (
    <Layout>
      <ThemeProvider>
        <Canvas
			sendMessage={sendMessage}
			setRoomId={setRoomId}
			incomingDrawings={incomingDrawings}
			roomId={rid}
			userId={userId}
          	setUsername={setUsername}
        />
		<CustomizedSnackbar 
			open={snackbarOpen} 
			setShowSnackbar={setSnackbarOpen} 
			snackbarMsg={snackbarMsg} 
			severity='info' 
			transition='left' 
			verticalAnchor='top' 
			horizontalAnchor='right'
		/>
      </ThemeProvider>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}