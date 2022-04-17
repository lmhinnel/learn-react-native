import {
    SET_WORDLE,
    SET_BOARD,
    SET_GUESS,
    SET_GUESS_LIST,
    SET_OVER,
    SET_DISABLED,
    SET_ROW
} from "./actions";

const initialState = {
    wordle: 'xxxxx',
    board: [],
    guess: '',
    guessList: [],
    over: false,
    disabled: [],
    row: 0,
}

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WORDLE:
            return { ...state, wordle: action.payload };
        case SET_BOARD:
            return { ...state, board: action.payload };
        case SET_GUESS:
            return { ...state, guess: action.payload };
        case SET_GUESS_LIST:
            return { ...state, guessList: action.payload };
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