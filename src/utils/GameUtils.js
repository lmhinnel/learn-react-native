import words from '../../assets/words.json';

export const MAX_GUESSES = 6;
export const MAX_WORD_LENGTH = 5;

// initial the board
export const getInitialBoard = () => {
    const board = [];
    for (let i = 0; i < 6; i++) {
        board.push(new Array(5).fill(''));
    }
    return board;
};

// initial a random word
export const getRandomWord = () => {
    const len = words.length;
    const r = Math.floor(Math.random() * (len)) + 1;
    return words[r].toUpperCase();
};
