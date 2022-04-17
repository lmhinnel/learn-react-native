import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import Cpressable from '../components/Cpressable';
import Keyboard from '../components/Keyboard';
import TextBlock, { TextBlockState } from '../components/TextBlock';
import { MAX_GUESSES } from '../utils/GameUtils';
import { getInitialBoard, getRandomWord } from '../utils/GameUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setWordle, setBoard, setGuess, setGuessList, setDisabled, setOver, setRow, } from '../redux/actions';
import OverScreen from './OverScreen';

const GameScreen = () => {
    const { wordle, board, guessList, over, row } = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (over === false) {
            dispatch(setWordle(getRandomWord().toUpperCase()));
            dispatch(setBoard(getInitialBoard()));
            dispatch(setGuess(''))
            dispatch(setGuessList([]));
            dispatch(setDisabled([]));
            dispatch(setRow(0));
        }
    }, [over])

    // useEffect(() => {
    //     const guessLength = guessList.length;
    //     if (guessList[guessLength - 1] === wordle || guessLength === MAX_GUESSES) {
    //         dispatch(setOver(true));
    //     } else {
    //         const list = [];
    //         guessList.forEach(word => {
    //             word.split('').forEach(letter => {
    //                 if (!wordle.includes(letter)) list.push(letter);
    //             })
    //         });
    //         dispatch(setDisabled(list));
    //     }
    // }, [guessList])

    useEffect(() => {
        if ((board && board[row]?.join('') == wordle) || row === MAX_GUESSES) {
            dispatch(setOver(true));
        } else {
            var list = [];
            board.forEach(r => {
                r.forEach(c => {
                    if (!wordle.includes(c)) list.push(c);
                })
            });
            dispatch(setDisabled(list));
        }
    }, [row])

    return (
        <View style={styles.fg1}>
            <Modal
                visible={over}
                transparent
            >
                <OverScreen />
            </Modal>
            {board.map((rowValue, rowIndex) => {
                return (
                    <View key={rowIndex} style={styles.row}>
                        {
                            rowValue.map((char, charIndex) => {
                                var state;
                                if (rowIndex >= row) state = TextBlockState.GUESS;
                                else {
                                    if (char == wordle[charIndex]) state = TextBlockState.CORRECT;
                                    else if (wordle.includes(char)) state = TextBlockState.POSSIBLE;
                                    else state = TextBlockState.INCORRECT;
                                }
                                return (
                                    <View style={styles.mh2} key={'BoxId-' + charIndex}>
                                        <TextBlock text={char} state={state} />
                                    </View>
                                );
                            })
                        }
                    </View>
                );
            })}

            {/* {board.map((row, rowIndex) => {
                return (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((_, colIndex) => {
                            const guessLetter = guessList[rowIndex]?.[colIndex];
                            var state;
                            switch (guessLetter) {
                                case wordle[colIndex]:
                                    state = TextBlockState.CORRECT;
                                    break;
                                case undefined:
                                    state = TextBlockState.GUESS;
                                    break;
                                default:
                                    if (wordle.includes(guessLetter)) state = TextBlockState.POSSIBLE;
                                    else state = TextBlockState.INCORRECT;
                            }

                            const letterToShow =
                                rowIndex === guessList.length ? guess[colIndex] : guessLetter;

                            return (
                                <View style={styles.mh2} key={'boxId-' + colIndex}>
                                    <TextBlock text={letterToShow || ''} state={state} />
                                </View>
                            );
                        })}
                    </View>
                );
            })} */}

            <View style={styles.bottomContainer}>
                <Keyboard />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    mb12: {
        marginBottom: 12,
    },
    mh2: {
        marginHorizontal: 2,
    },
    fg1: {
        flexGrow: 1,
    },
    textWhite: {
        color: '#fff',
        fontSize: 22,
    },
    row: {
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomContainer: {
        flexGrow: 1,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    score: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    buttonSpacer: {
        width: 12,
    },
});

export default GameScreen;