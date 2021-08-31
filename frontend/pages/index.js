import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/layout'
import Canvas from '../components/Canvas'
import {ThemeProvider} from "../context/ThemeContext"
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
import randomString from 'random-string'

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function Home() {  
  const [roomId, setRoomId] = useState(randomString({length: 15}));
  const [incomingDrawings, setIncomingDrawings] = useState([]);

  const ws = useRef(null);
  const stomp = useRef(null);

    useEffect(() => {
        ws.current = new SockJS(SOCKET_URL);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        stomp.current = Stomp.over(ws.current);
        stomp.current.connect({}, frame => {
          stomp.current.subscribe(`/topic/${roomId}`, coordinates => {
            setIncomingDrawings(JSON.parse(coordinates.body)) 
          });
        });

        return () => {
            ws.current.close();
        };
    }, [roomId]);

    /* useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log("e", message);
        };
    }, []); */

  const sendMessage = (message) => {
    stomp.current.send(`/app/send/${roomId}`, {}, JSON.stringify(message));
  }

  const draw = [
    {
      "x0":539,"y0":264,"x1":539,"y1":264,"color":"#fff"
    }
  ]

  return (
    <Layout>
      <ThemeProvider>
        <Canvas
          sendMessage={sendMessage}
          setRoomId={setRoomId}
          incomingDrawings={incomingDrawings}
        />
      </ThemeProvider>
    </Layout>
  )
}