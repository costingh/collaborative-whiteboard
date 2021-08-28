import React from 'react'
import styles from '../styles/ShowInfoPanel.module.scss'

function ShowInfoPanel({setShowInfoPanel}) {
    const closePanel = () => {
        setShowInfoPanel(false)
    }

    return (
        <div className={styles.infoPanel} onClick={closePanel}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.paragraph}>
                        <h1>Whiteboard Controls</h1>
                        <div className={styles.close}>x</div>
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.paragraph}>
                        <h1 className={styles.heading}>Drawing</h1>
                        <p className={styles.details}>🖱️ Left Click / ☝️ Single-finger-touch</p>
                    </div>
                    <div className={styles.paragraph}>
                        <h1 className={styles.heading}>Moving</h1>
                        <p className={styles.details}>🖱️ Right Click / ✌️ Two-finger-touch</p>
                    </div>
                    <div className={styles.paragraph}>
                        <h1 className={styles.heading}>Zooming</h1>
                        <p className={styles.details}>🖱️ Scroll Wheel / 🤏 Pinch</p>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.closeBtn} onClick={closePanel}>Close</div>
                </div>
            </div>
        </div>
    )
}

export default ShowInfoPanel
