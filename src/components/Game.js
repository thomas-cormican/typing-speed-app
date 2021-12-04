import React from "react";
import TimeFormat from "hh-mm-ss";
import { FaRandom } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";

import "./game.css";
import useGame from "../hooks/useGame";

function Game({ theme }) {
  const { game, time, dispatch, reset, handleChange } = useGame();

  return (
    <div className={`game ${theme}`}>
      <div className={`mode-buttons ${theme}`}>
        <button
          className="mode-button"
          disabled={game.mode === "random" && true}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "CHANGE_MODE", payload: "random" });
            reset("new");
          }}
        >
          Random Words
          <FaRandom className="button-icon" size={25} />
        </button>
        <button
          className="mode-button"
          disabled={game.mode === "paragraph" && true}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "CHANGE_MODE", payload: "paragraph" });
            reset("new");
          }}
        >
          Paragraphs
          <AiOutlineRead className="button-icon" size={25} />
        </button>
      </div>
      <div className="top-section">
        <p className="time">
          {TimeFormat.fromMs(time, "mm:ss.sss").substring(
            0,
            TimeFormat.fromMs(time, "mm:ss.sss").length - 1
          )}
        </p>

        <p className="wpm">WPM: {Math.round(game.wpm)}</p>
      </div>
      <p className="paragraph">
        {game.paragraph.map((letter, index) => {
          if (game.errors && index === game.currentIndex) {
            return (
              <span key={index} className="currentLetter error">
                {letter}
              </span>
            );
          }
          if (
            game.errors &&
            index > game.currentIndex &&
            index < game.currentIndex + game.errors
          ) {
            return (
              <span key={index} className="error">
                {letter}
              </span>
            );
          }
          if (index > game.currentIndex) {
            return (
              <span key={index} className="incomplete">
                {letter}
              </span>
            );
          }
          if (index === game.currentIndex) {
            return (
              <span key={index} className="currentLetter incomplete">
                {letter}
              </span>
            );
          } else {
            return <span key={index}>{letter}</span>;
          }
        })}
      </p>
      <input
        className="text-input"
        disabled={game.done ? true : false}
        type="text"
        placeholder="Type here"
        value={game.enteredText}
        onChange={handleChange}
      />
      {game.done && (
        <div className="game-buttons">
          <button onClick={reset}>Retry</button>
          <button
            onClick={() => {
              reset("new");
            }}
          >
            New Text
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
