import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.scss'
import Link from 'next/link'

export const siteTitle = 'Whiteboard'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Simple whiteboard that allows real-time collaboration between users"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
        <div className={styles.layout}>
            {children}
        </div>
    </>
  )
}