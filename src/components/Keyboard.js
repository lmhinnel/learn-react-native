import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setGuess, setBoard, setRow } from '../redux/actions';
import { GlobalStyles } from '../styles/GlobalStyles';
import { MAX_WORD_LENGTH } from '../utils/GameUtils';

export const SpecialKeys = {
    DELETE: 'DELETE',
    GUESS: 'ENTER',
}

const Keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    [SpecialKeys.DELETE, SpecialKeys.GUESS],
];

const Keyboard = () => {
    const { guess, disabled, board, row } = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    const handleKeyPress = (key) => {
        switch (key) {
            case SpecialKeys.DELETE:
                if (guess.length != 0) {
                    var b = board;
                    b[row][guess.length - 1] = '';
                    dispatch(setBoard(b));
                }
                dispatch(setGuess(guess.slice(0, -1)));
                break;
            case SpecialKeys.GUESS:
                if (guess.length != 5) break;
                dispatch(setRow(row + 1));
                dispatch(setGuess(''));
                break;
            default:
                if (guess.length < MAX_WORD_LENGTH) {
                    var b = board;
                    b[row][guess.length] = key;
                    dispatch(setBoard(b));
                    dispatch(setGuess(guess + key));
                }
        }
    }

    return (
        <View style={GlobalStyles.container}>
            {Keys.map((row, rowId) => {
                return (
                    <View key={rowId} style={styles.row}>
                        {row.map(key => {
                            var dis;
                            if ((key == SpecialKeys.GUESS && guess.length != 5)
                                || (key == SpecialKeys.DELETE && guess.length == 0))
                                dis = true;
                            else dis = Object.values(disabled).includes(key);
                            return (
                                <Pressable
                                    key={key}
                                    disabled={dis}
                                    onPress={() => { handleKeyPress(key); }}
                                    style={[styles.cell,
                                    dis && styles.cellDisabled]}
                                >
                                    <Text
                                        style={[styles.text,
                                        dis && styles.textDisabled,
                                        GlobalStyles.text]}
                                    >
                                        {key + ' '}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    cell: {
        padding: 4,
        margin: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    cellDisabled: {
        borderColor: '#444',
        backgroundColor: '#6464af'
    },
    text: {
        color: '#fff',
        fontSize: 28,
    },
    textDisabled: {
        color: '#444',
    },
});

export default Keyboard;