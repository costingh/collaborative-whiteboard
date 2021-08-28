import Head from 'next/head'
import Layout from '../components/layout'
import Canvas from '../components/Canvas'
import {ThemeProvider} from "../context/ThemeContext";

export default function Home() {
  return (
    <Layout>
      <ThemeProvider>
        <Canvas/>
      </ThemeProvider>
    </Layout>
  )
}