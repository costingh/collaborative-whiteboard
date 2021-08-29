import React, { useState } from 'react'
import Layout from '../components/layout'
import Canvas from '../components/Canvas'
import {ThemeProvider} from "../context/ThemeContext"
import SocketConfig from '../components/SocketConfig'

export default function Home() {
  const [message, setMessage] = useState('You server message here.');
  
  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

  return (
    <Layout>
      <ThemeProvider>
        <SocketConfig
          onConnected={onConnected}
          onMessageReceived={onMessageReceived}
        />
        <Canvas
          message={message}
        />
      </ThemeProvider>
    </Layout>
  )
}