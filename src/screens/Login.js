import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert
} from 'react-native';
import CPressable from '../utils/CPressable';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState();

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('user')
                .then(value => {
                    if (value != null)
                        navigation.navigate('Home');
                })
        } catch (err) {
            console.log(err);
        }
    }

    const updateData = async () => {
        if (name.length == 0 || age.length == 0) {
            Alert.alert('Warning!', 'Please write your name');
        } else {
            try {
                var user = {
                    name: name,
                    age: age,
                }
                await AsyncStorage.setItem('user', JSON.stringify(user));
                // Alert.alert('Success!', 'Data is updated');
                navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.body}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.text}>
                Async Storage
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value) => setAge(value)}
            />
            <CPressable
                title='Login'
                onPressHandler={updateData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#b1b1ff',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 10
    },
    text: {
        fontSize: 28,
        color: '#0f0f0f',
        marginBottom: 40,
    },

    input: {
        width: 320,
        borderWidth: 1,
        borderColor: '#6464AF',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Login;