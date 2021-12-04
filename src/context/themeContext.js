import React, { useState, createContext } from "react";

const INITIAL_STATE = localStorage.getItem("theme") || "light";

export const ThemeContext = createContext(INITIAL_STATE);

export function ThemeContextProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  function changeTheme() {
    setState((prev) => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      } else if (prev === "dark") {
        localStorage.setItem("theme", "light");
        return "light";
      }
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: state,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
