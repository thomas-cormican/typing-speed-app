export default function gameReducer(state, action) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        done: false,
        started: true,
        wpm: 0,
      };

    case "END_GAME":
      return {
        ...state,
        started: false,
        enteredText: "",
        done: true,
      };

    case "UPDATE_WPM":
      return {
        ...state,
        wpm: (state.currentIndex + 1) / 5 / (action.payload / 1000 / 60),
      };

    case "CORRECT":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        enteredText: action.payload,
      };

    case "ERROR":
      return {
        ...state,
        enteredText: action.payload,
        errors: state.errors + 1,
      };

    case "BACKSPACE":
      return {
        ...state,
        errors: state.errors - 1,
        enteredText: state.enteredText.substring(
          0,
          state.enteredText.length - 1
        ),
      };

    case "NEW_PARAGRAPH":
      return {
        ...state,
        paragraph: action.payload,
      };

    case "RESET":
      return {
        ...state,
        done: false,
        started: false,
        enteredText: "",
        errors: 0,
        currentIndex: 0,
        wpm: 0,
      };

    case "CLEAR_TEXT":
      return {
        ...state,
        enteredText: "",
      };

    case "CHANGE_MODE":
      return {
        ...state,
        mode: action.payload,
      };

    default:
      break;
  }
}
