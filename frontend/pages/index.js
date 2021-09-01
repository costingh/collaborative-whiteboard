import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/layout'
import Canvas from '../components/Canvas'
import {ThemeProvider} from "../context/ThemeContext"
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
import randomString from 'random-string'

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Home() {  
	const userId = randomString({length: 15});
	const [roomId, setRoomId] = useState(randomString({length: 15}));
	const [incomingDrawings, setIncomingDrawings] = useState(null);

	const ws = useRef(null);
	const stomp = useRef(null);

    useEffect(() => {
        ws.current = new SockJS(SOCKET_URL);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

		stomp.current = Stomp.over(ws.current);
		stomp.current.reconnect_delay = 5000;
        stomp.current.connect({}, frame => {
          stomp.current.subscribe(`/topic/${roomId}`, coordinates => {
            setIncomingDrawings(JSON.parse(coordinates.body)) 
          });
        });

        return () => {
            ws.current.close();
        };
    }, [roomId]);

	const sendMessage = (message) => {
		stomp.current.send(`/app/send/${roomId}`, {}, JSON.stringify(message));
	}


  return (
    <Layout>
      <ThemeProvider>
        <Canvas
          sendMessage={sendMessage}
          setRoomId={setRoomId}
          incomingDrawings={incomingDrawings}
          roomId={roomId}
		  userId={userId}
        />
      </ThemeProvider>
    </Layout>
  )
}