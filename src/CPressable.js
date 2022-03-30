import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text
} from 'react-native';

const CPressable = (props) => {

    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#ccccff' : '#b1b1ff' },
                { borderRadius: 10 },
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            android_ripple={{ color: '#fff' }}
            onPress={props.onPressHandler}
        >
            <Text style={styles.text}>{props.submit ? 'clear' : 'submit'}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#6463AF',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
      },
});

export default CPressable;