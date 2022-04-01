import React from 'react';
import {
    StyleSheet,
    Text,
    View,    
    TextInput,
    Alert,
} from 'react-native';

import GlobalStyle from '../utils/GlobalStyle';

import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CPressable from '../utils/CPressable';
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

function Home({ navigation }) {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState();

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('user')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setName(user.name);
                        setAge(user.age);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your name');
        } else {
            try {
                var userName = {
                    name: name,
                }
                await AsyncStorage.mergeItem('user', JSON.stringify(userName));
                Alert.alert('Success!', 'Data is updated');
                // navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.navigate('Login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.body}>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Welcome {name}!
                {'\n'}
                Your age is {age}.
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => setName(value)}
                defaultValue={name}
            />
            <CPressable
                title='Update'
                onPressHandler={updateData}
            />
            <CPressable
                title='Remove'
                onPressHandler={removeData}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 50,
        marginBottom: 20,
    },

    input: {
        width: 320,
        borderWidth: 1,
        borderColor: '#6464AF',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 40,
        marginBottom: 20,
    },
});

export default Home;