import React, { useContext } from "react";

import "./main.css";
import Game from "../components/Game";
import { ThemeContext } from "../context/themeContext";

function Main() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`main ${theme}`}>
      <div className="game-wrapper">
        <Game theme={theme} />
      </div>
    </div>
  );
}

export default Main;
