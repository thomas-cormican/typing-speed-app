import React, { useContext } from "react";
import { BsFillLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";

import "./header.css";
import { ThemeContext } from "../context/themeContext";

function Header() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <button
        className="theme-button"
        onClick={() => {
          changeTheme();
        }}
      >
        {theme === "light" ? <BsLightbulbOffFill /> : <BsFillLightbulbFill />}
      </button>
    </header>
  );
}

export default Header;
