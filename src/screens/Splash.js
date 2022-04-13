import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import PushNotification from 'react-native-push-notification';
import GlobalStyle from '../utils/GlobalStyle';

/* const db = sqlite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) },
); */

function Splash({ navigation }) {
    React.useEffect(() => {
        createChannels();
        setTimeout(() => {
            navigation.replace('My Tasks');
        }, 2000);
    }, []);

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: 'task-channel',
                channelName: 'Task Channel'
            }
        )
    }

    return (
        <View style={styles.body}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <Text style={[GlobalStyle.CustomFont, styles.text]}> TO-DO APP </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b1b1ff',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 10
    },
    text: {
        fontSize: 52,
        color: '#000',
    },
});

export default Splash;