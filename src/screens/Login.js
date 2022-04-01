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
// import AsyncStorage from '@react-native-async-storage/async-storage';
import sqlite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge } from '../redux/actions';

const db = sqlite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) },
);

function Login({ navigation }) {
    const { name, age } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // const [name, setName] = React.useState('');
    // const [age, setAge] = React.useState();

    React.useEffect(() => {
        createTable();
        getData();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
            )
        })
    }

    const getData = () => {
        try {
            /*             AsyncStorage.getItem('user')
                            .then(value => {
                                if (value != null)
                                    navigation.navigate('Home');
                            }) */
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users ",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            navigation.navigate('Home');
                        }
                    }
                )
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
                /*                 var user = {
                                    name: name,
                                    age: age,
                                }
                                await AsyncStorage.setItem('user', JSON.stringify(user)); */
                dispatch(setName(name));
                dispatch(setAge(age));
                await db.transaction(async (tx) => {
                    // await tx.executeSql(
                    //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "', " + age + ")"
                    // );

                    await tx.executeSql(
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name, age]
                    );

                })
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
            <Text style={styles.text}>REDUX</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => dispatch(setName(value))}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value) => dispatch(setAge(value))}
                keyboardType={'number-pad'}
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