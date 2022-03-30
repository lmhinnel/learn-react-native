import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

function ScreenB({ navigation }) {
    const onPressHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.body}>
            <Text style={styles.text}>This is the content of ScreenB</Text>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#ccccff' : '#b1b1ff' }
                ]}
                onPress={onPressHandler}
            >
                <Text style={styles.text}>Go back to ScreenA</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontWeight: '900',
        fontSize: 30,
    }
});

export default ScreenB;