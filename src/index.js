import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ThemeContextProvider } from "./context/themeContext";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./firebaseConfig";

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
