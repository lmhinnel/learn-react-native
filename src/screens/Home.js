import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
} from 'react-native';

import GlobalStyle from '../utils/GlobalStyle';
import CPressable from '../utils/CPressable';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import sqlite from 'react-native-sqlite-storage';

const db = sqlite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) },
);


function Home({ navigation }) {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState();

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            /*             AsyncStorage.getItem('user')
                            .then(value => {
                                if (value != null) {
                                    let user = JSON.parse(value);
                                    setName(user.name);
                                    setAge(user.age);
                                }
                            }) */
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users ",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).Name;
                            var userAge = results.rows.item(0).Age;
                            setName(userName);
                            setAge(userAge);
                        }
                    }
                )
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
                // var userName = {
                //     name: name,
                // }
                // await AsyncStorage.mergeItem('user', JSON.stringify(userName));
                // Alert.alert('Success!', 'Data is updated');
                // navigation.navigate('Home');
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        () => { Alert.alert('Success!', 'Data is updated'); },
                        err => { console.log(err); }
                    )
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            // await AsyncStorage.removeItem('user')
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM Users",
                    [],
                    () => { navigation.navigate('Login'); },
                    err => { console.log(err); }
                )
            });
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