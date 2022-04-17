import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setOver } from '../redux/actions';
import CPressable from '../components/Cpressable';

export default function OverScreen() {
    const { wordle } = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    return (
        <View style={[GlobalStyles.container, styles.container]}>
            <View style={[GlobalStyles.container, styles.center]}>
                <Text style={[GlobalStyles.text, styles.header]}>GAME OVER! </Text>
                <Text style={[GlobalStyles.text, styles.text]}>
                    The wordle: {wordle}.
                </Text>
                <CPressable text="Play Again " onPress={() => dispatch(setOver(false))} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6464af99',
        flex: 1,
    },
    center: {
        width: 320,
        height: 240,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#ffc8c8',
        justifyContent: 'space-around',
    },
    header: {
        fontSize: 44,
        color: '#6464af'
    },
    text: {
        fontSize: 34,
    }
});