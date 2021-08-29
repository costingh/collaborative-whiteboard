import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Canvas from '../components/Canvas'
import {ThemeProvider} from "../context/ThemeContext"
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Home() {  
  const sock = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(sock);

  sock.onopen = function() {
    console.log('open');
  }

  stompClient.connect({}, function (frame) {
     /* console.log('Connected: ' + frame); */
     stompClient.subscribe('/topic/message', coordinates => {
       console.log(coordinates);
       
     });
  });

  const sendMessage = (message) => {
    stompClient.send('/topic/message', {}, message);
  }

  return (
    <Layout>
      <ThemeProvider>
        <Canvas
          sendMessage={sendMessage}
        />
      </ThemeProvider>
    </Layout>
  )
}