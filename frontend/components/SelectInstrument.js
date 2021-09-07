import React, { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from "../styles/SelectInstrument.module.scss";

function SelectInstrument({
  setInstrument,
  instrument,
  lineWidth,
  setLineWidth,
  color
}) {
  const { theme } = React.useContext(ThemeContext);

  const [width, setWidth] = useState(0);
  const [showPencilMenu, setShowPencilMenu] = useState(false);

  const openPencilMenu = () => {
    if (!showPencilMenu) {
      setShowPencilMenu(true);
      setWidth(160);
    } else return;
  };

  const closePencilMenu = () => {
    setShowPencilMenu(false);
    setWidth(0);
  };

  return (
    <div className={styles.selectInstrument}>
      <div
        className={styles.instrument}
        style={{ background: instrument === "pencil" && "#bbb" }}
        onClick={() => setInstrument("pencil")}
        onMouseEnter={openPencilMenu}
        onMouseLeave={closePencilMenu}
      >
        ✒️
        <div
          className={styles.pencilMenu}
          style={{ background: theme.secondaryColor, width: `${width}px` }}
        >
          <div className={styles.row}>
            <div
              className={styles.circlexxs}
              style={{ background: lineWidth === 3 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(3)}
            ></div>
            <div
              className={styles.circlexs}
              style={{ background: lineWidth === 10 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(10)}
            ></div>
            <div
              className={styles.circlesm}
              style={{ background: lineWidth === 15 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(15)}
            ></div>
            <div
              className={styles.circlemd}
              style={{ background: lineWidth === 20 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(20)}
            ></div>
            <div
              className={styles.circlelg}
              style={{ background: lineWidth === 25 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(25)}
            ></div>
          </div>
          <div className={styles.row}>
            <div
              className={styles.circlexl}
              style={{ background: lineWidth === 30 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(30)}
            ></div>
            <div
              className={styles.circlexxl}
              style={{ background: lineWidth === 35 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(35)}
            ></div>
            <div
              className={styles.circlexxxl}
              style={{ background: lineWidth === 40 ? color : theme.backgroundColor }}
              onClick={() => setLineWidth(40)}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={styles.instrument}
        style={{ background: instrument === "eraser" && "#bbb" }}
        onClick={() => setInstrument("eraser")}
      >
        🧹
      </div>
    </div>
  );
}
/* 🖊️✏️📜 🖌️ */
export default SelectInstrument;
