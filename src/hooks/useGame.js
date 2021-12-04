import { useState, useEffect, useReducer } from "react";
import randomWords from "random-words";

import paragraphList from "../utils/paragraphs";
import gameReducer from "./gameReducer";

const initial_state = {
  paragraph: [],
  started: false,
  time: 0,
  currentIndex: 0,
  enteredText: "",
  intervalId: null,
  wpm: 0,
  done: false,
  errors: 0,
  mode: "paragraph",
};

function useGame() {
  const [game, dispatch] = useReducer(gameReducer, initial_state);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  function getNewParagraph(gameMode) {
    if (gameMode === "paragraph") {
      const randomParagraph =
        paragraphList[Math.floor(Math.random() * paragraphList.length)];
      dispatch({ type: "NEW_PARAGRAPH", payload: randomParagraph.split("") });
    } else if (gameMode === "random") {
      dispatch({
        type: "NEW_PARAGRAPH",
        payload: randomWords(50).join(" ").split(""),
      });
    }
  }

  // get a new paragraph whenever the game mode changes
  useEffect(() => {
    getNewParagraph(game.mode);
  }, [game.mode]);

  // start timer by setting interval
  function startRace() {
    setTime(0);
    setIntervalId(
      setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10)
    );
  }

  // stop timer by clearing interval
  function stopRace() {
    clearInterval(intervalId);
  }

  function reset(action = "old") {
    stopRace();
    dispatch({ type: "RESET" });
    if (action === "new") {
      getNewParagraph(game.mode);
    }
    setTime(0);
    setIntervalId(null);
  }

  function handleChange(e) {
    if (game.currentIndex === 0 && !game.started) {
      dispatch({ type: "START_GAME" });
      startRace();
    } else {
      dispatch({ type: "UPDATE_WPM", payload: time });
    }
    /*correct key entries */ if (
      game.errors <= 0 &&
      e.nativeEvent.data === game.paragraph[game.currentIndex]
    ) {
      dispatch({ type: "CORRECT", payload: e.target.value });
      e.nativeEvent.data === " " && dispatch({ type: "CLEAR_TEXT" });
      if (game.currentIndex === game.paragraph.length - 1) {
        dispatch({ type: "END_GAME" });
        stopRace();
      }
    } /*incorrect key entries */ else if (
      game.errors > 0 &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      dispatch({ type: "BACKSPACE" });
    } else if (
      game.errors <= 0 &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      console.log("can't do anything");
    } else {
      dispatch({ type: "ERROR", payload: e.target.value });
    }
  }

  return {
    game,
    time,
    dispatch,
    reset,
    handleChange,
  };
}

export default useGame;
