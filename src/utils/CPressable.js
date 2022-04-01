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
                { backgroundColor: pressed ? '#ccccff' : '#6463AF' },
                { borderRadius: 10 },
            ]}
            // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            margin={10}
            android_ripple={{ color: '#fff' }}
            onPress={props.onPressHandler}
        >
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
        margin: 10,
        textAlign: 'center',
      },
});

export default CPressable;