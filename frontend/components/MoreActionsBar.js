import React, { useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SelectThicknessSlider from "./SelectThicknessSlider";
import SelectInstrument from "./SelectInstrument";
import styles from "../styles/MoreActionsBar.module.scss";

function MoreActionsBar({
  lineWidth,
  setLineWidth,
  setInstrument,
  instrument,
  color,
}) {
  const { theme, toggle, dark } = React.useContext(ThemeContext);

  const [backgroundColor, setBackgroundColor] = useState("#E2E6EA");
  const [width, setWidth] = useState(45);
  const [height, setHeight] = useState(45);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    if (!theme.secondaryColor) return;
    setBackgroundColor(theme.secondaryColor);
  }, [theme]);

  const openMenu = () => {
    setHeight(180);
    setIsMenuOpened(true);
  };

  const closeMenu = () => {
    setHeight(45);
    setIsMenuOpened(false);
  };

  const Menu = () => {
    return (
      <div className={styles.menuInner}>
        <div className={styles.closeMenu} onClick={closeMenu}>
          📕
        </div>
        <SelectInstrument
          color={color}
          setInstrument={setInstrument}
          instrument={instrument}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        />
      </div>
    );
  };

  return (
    <div
      className={styles.moreActionsBar}
      style={{
        background: `${backgroundColor}`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {isMenuOpened ? (
        Menu()
      ) : (
        <div className={styles.openMenu} onClick={openMenu}>
          📖
        </div>
      )}
    </div>
  );
}

export default MoreActionsBar;
