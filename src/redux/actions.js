export const SET_WORDLE = 'SET_WORDLE';
export const SET_BOARD = 'SET_BOARD';
export const SET_GUESS = 'SET_GUESS';
export const SET_GUESS_LIST = 'SET_GUESS_LIST';
export const SET_OVER = 'SET_OVER';
export const SET_DISABLED = 'SET_DISABLED';
export const SET_ROW = 'SET_ROW';

export const setWordle = (wordle) => {
    return ({
        type: SET_WORDLE,
        payload: wordle,
    });
};

export const setBoard = (board) => {
    return ({
        type: SET_BOARD,
        payload: board,
    });
};

export const setGuess = (guess) => {
    return ({
        type: SET_GUESS,
        payload: guess,
    });
};

export const setGuessList = (guessList) => {
    return ({
        type: SET_GUESS_LIST,
        payload: guessList,
    });
};

export const setOver = (over) => {
    return ({
        type: SET_OVER,
        payload: over,
    });
};

export const setDisabled = (disabled) => {
    return ({
        type: SET_DISABLED,
        payload: disabled,
    });
};

export const setRow = (row) => {
    return ({
        type: SET_ROW,
        payload: row,
    });
};