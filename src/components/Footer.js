import React, { useContext } from "react";

import "./Footer.css";
import { ThemeContext } from "../context/themeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <p>Created by Thomas Cormican</p>
    </footer>
  );
}

export default Footer;
