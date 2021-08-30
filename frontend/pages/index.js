import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Canvas from '../components/Canvas'
import {ThemeProvider} from "../context/ThemeContext"
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
import randomString from 'random-string'

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Home() {  
  const [roomId, setRoomId] = useState(randomString({length: 15}));
  const sock = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(sock);

  sock.onopen = function() {
    /* console.log('########################### open'); */
  }

  stompClient.connect({}, frame => {
     /* console.log('Connected: ' + frame); */
     stompClient.subscribe(`/topic/${roomId}`, coordinates => {
       const coordinatesObj = JSON.parse(coordinates.body);
       console.log(coordinatesObj.startX)
       
     });
  });

  const sendMessage = (message) => {
    stompClient.send(`/app/send/${roomId}`, {}, JSON.stringify(message));
  }

  /* useEffect(() => {
    console.log(roomId)
  }, [roomId]) */

  return (
    <Layout>
      <ThemeProvider>
        <Canvas
          sendMessage={sendMessage}
          setRoomId={setRoomId}
        />
      </ThemeProvider>
    </Layout>
  )
}