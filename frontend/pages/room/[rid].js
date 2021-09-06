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

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Room() {  
	const router = useRouter()
	const [rid, setRid] = useState(null);
  	const [userId, setUserId] = useState(randomString({length: 15}));
	const [incomingDrawings, setIncomingDrawings] = useState(null);
  	const [username, setUsername] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState('');
	const [usersList, setUsersList] = useState([]);

	const CONNECT_USER = 'CONNECT_USER';
	const DISCONNECT_USER = 'DISCONNECT_USER';

	let messagesSubscription = null;
	let canvasSubscription = null;

	const ws = useRef(null);
	const stomp = useRef(null);

    useEffect(() => {
		if(!rid || !username) {
			setRid(router.query.rid)
			setUsername(router.query.username)
		} else {
			ws.current = new SockJS(SOCKET_URL);
			ws.current.onopen = () => alert("ws opened");
			ws.current.onclose = () => alert(1000);

			stomp.current = Stomp.over(ws.current);
			stomp.current.reconnect_delay = 5000;
			stomp.current.connect({}, frame => {
				const userJoinedRoom = {
					username: username,
					payload: CONNECT_USER,
					roomId: rid
				} ;
				stomp.current.send(`/app/send/${rid}/user`, {}, JSON.stringify(userJoinedRoom));

				messagesSubscription = stomp.current.subscribe(`/topic/${rid}/user`, roomActions => {
					const response = JSON.parse(roomActions.body);
					setSnackbarMsg(response.message);
					setUsersList(response.users);
					setSnackbarOpen(true);
				});

				canvasSubscription = stomp.current.subscribe(`/topic/${rid}`, coordinates => {
					setIncomingDrawings(JSON.parse(coordinates.body)) 
				});
			});

			return () => {
				ws.current.close();
			};
		}
	}, [rid, username]);
	
	// handle route change | When user clicks back button, disconnect from room
	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			disconnect();
		}

		router.events.on('routeChangeStart', handleRouteChange)

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [router])

	const sendMessage = (message) => {
		stomp.current.send(`/app/send/${rid}`, {}, JSON.stringify(message));
	}

	const setRoomId = (newId) => {
		disconnect();
		router.push(`/room/${newId}`);
		setRid(newId)
	}

	const disconnect = () => {
		const userLeftRoom = {
			username: username,
			payload: DISCONNECT_USER,
			roomId: rid
		} ;
		stomp.current.send(`/app/send/${rid}/user`, {}, JSON.stringify(userLeftRoom));
		stomp.current.disconnect(frame => {
			if(messagesSubscription) messagesSubscription.unsubscribe();
			if(canvasSubscription) canvasSubscription.unsubscribe();
		}, {})
	}

	// Run this code when client refreshes the page or closes the tab (disconnect the socket and send message in room)
	if (process.browser) {
		window.onbeforeunload = () => {
			disconnect();
		}
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
			usersList={usersList}
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