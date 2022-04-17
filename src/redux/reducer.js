import {
    SET_WORDLE,
    SET_BOARD,
    SET_GUESS,
    SET_OVER,
    SET_DISABLED,
    SET_ROW
} from "./actions";

const initialState = {
    wordle: '', // pick a random word to guess
    board: [], // board store characters
    guess: '', // now guessing word
    over: false, // game over or not
    disabled: [], // characters that dont have in wordle
    row: 0, // current guessing row
}

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WORDLE:
            return { ...state, wordle: action.payload };
        case SET_BOARD:
            return { ...state, board: action.payload };
        case SET_GUESS:
            return { ...state, guess: action.payload };
        case SET_OVER:
            return { ...state, over: action.payload };
        case SET_DISABLED:
            return { ...state, disabled: action.payload };
        case SET_ROW:
            return { ...state, row: action.payload };
        default:
            return state;
    }
}

export default gameReducer;