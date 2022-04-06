import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Alert,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setTaskID } from '../redux/actions';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import CPressable from '../utils/CPressable';
import GlobalStyle from '../utils/GlobalStyle';
import RNFS from 'react-native-fs';

export default function Task({ navigation }) {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [done, setDone] = React.useState(false);
    const [color, setColor] = React.useState('white');
    const [showBellModal, setShoweBellModal] = React.useState(false);
    const [bellTime, setBellTime] = React.useState('1');
    const [image, setImage] = React.useState('');

    const { tasks, taskID } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getTask();
        });
    }, []);

    const getTask = () => {
        const Task = tasks.find(task => task.ID == taskID);
        if (Task) {
            setTitle(Task.Title);
            setDesc(Task.Desc);
            setDone(Task.Done);
            setColor(Task.Color);
            setImage(Task.Image);
        }
    };

    const setTask = () => {
        if (title.length == 0)
            Alert.alert('Warning!', 'The task title is empty.');
        else {
            try {
                var task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color,
                    Image: image,
                }
                const index = tasks.findIndex(task => task.ID === taskID);
                let newTasks = [];
                if (index > -1) {
                    newTasks = [...tasks];
                    newTasks[index] = task;
                } else {
                    newTasks = [...tasks, task];
                }
                AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                    .then(() => {
                        dispatch(setTasks(newTasks));
                        Alert.alert('Success!', 'Task saved successfully.');
                        navigation.goBack();
                    }).catch(err => console.log(err))
            } catch (err) { console.log(err); }
        }
    };

    const setTaskAlarm = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'task-channel',
            title: title,
            message: desc,
            date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
            allowWhileIdle: true
        })
    }

    const deleteImage = () => {
        RNFS.unlink(image)
            .then(() => {
                const index = tasks.findIndex(task => task.ID === taskID);
                if (index > -1) {
                    let newTasks = [...tasks];
                    newTasks[index].Image = '';
                    AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                        .then(() => {
                            dispatch(setTasks(newTasks));
                            getTask();
                            Alert.alert('Success!', 'Task image is removed');
                        }).catch(e => console.log(e))
                }
            })
    }

    return (
        <ScrollView>

            <View style={[GlobalStyle.body, styles.body]}>
                <Modal
                    visible={showBellModal}
                    transparent
                    onRequestClose={() => setShoweBellModal(false)}
                    animationType='slide'
                    hardwareAccelerated
                >
                    <View style={styles.centerized_view}>
                        <View style={styles.bell_modal}>
                            <View style={styles.bell_body}>
                                <Text style={styles.text}>Remind me after</Text>
                                <TextInput
                                    style={styles.bell_input}
                                    keyboardType='numeric'
                                    value={bellTime}
                                    onChangeText={(value) => setBellTime(value)}
                                />
                                <Text style={styles.text}>minute(s)</Text>
                            </View>
                            <View style={styles.bell_buttons}>
                                <TouchableOpacity
                                    style={styles.bell_cancel_button}
                                    onPress={() => {
                                        setShoweBellModal(false);
                                    }}
                                >
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bell_ok_button}
                                    onPress={() => {
                                        setShoweBellModal(false);
                                        setTaskAlarm();
                                    }}
                                >
                                    <Text style={styles.text}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TextInput
                    value={title}
                    style={styles.input}
                    placeholder='Title'
                    onChangeText={(value) => setTitle(value)}
                />
                <TextInput
                    value={desc}
                    style={styles.input}
                    placeholder='Detail'
                    multiline
                    onChangeText={(value) => setDesc(value)}
                />
                <View style={styles.color_bar}>
                    <TouchableOpacity
                        style={styles.color_white}
                        onPress={() => setColor('white')}
                    >
                        {color === 'white' &&
                            <FontAwesome5
                                name={'check'}
                                size={24}
                                color={'#000'}
                            />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color_red}
                        onPress={() => setColor('red')}
                    >
                        {color === 'red' &&
                            <FontAwesome5
                                name={'check'}
                                size={24}
                                color={'#000'}
                            />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color_green}
                        onPress={() => setColor('green')}
                    >
                        {color === 'green' &&
                            <FontAwesome5
                                name={'check'}
                                size={24}
                                color={'#000'}
                            />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color_blue}
                        onPress={() => setColor('blue')}
                    >
                        {color === 'blue' &&
                            <FontAwesome5
                                name={'check'}
                                size={24}
                                color={'#000'}
                            />}
                    </TouchableOpacity>
                </View>
                <View style={styles.extra_row}>
                    <TouchableOpacity
                        style={styles.extra_button}
                        onPress={() => setShoweBellModal(true)}
                    >
                        <FontAwesome5
                            name={'bell'}
                            size={24}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.extra_button}
                        onPress={() => navigation.navigate('Camera', { id: taskID })}
                    >
                        <FontAwesome5
                            name={'camera'}
                            size={24}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
                {image ?
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: image }}
                        />
                        <TouchableOpacity
                            style={styles.delete}
                            onPress={() => { deleteImage() }}
                        >
                            <FontAwesome5
                                name={'trash'}
                                size={25}
                                color={'#ff3636'}
                            />
                        </TouchableOpacity>
                    </View>
                    : null
                }
                <View style={styles.checkbox}>
                    <CheckBox
                        value={done}
                        onValueChange={(newValue) => setDone(newValue)}
                    />
                    <Text style={styles.text}>Is done</Text>
                </View>
                <CPressable
                    title='Save Task'
                    onPressHandler={setTask}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#6464af',
        borderRadius: 10,
        backgroundColor: '#e1e1ff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    },
    checkbox: {
        flexDirection: 'row',
        margin: 10,
    },
    text: {
        fontSize: 22,
        color: '#000'
    },
    color_bar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000',
        marginVertical: 10,
    },
    color_white: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    color_red: {
        flex: 1,
        backgroundColor: '#f0c0c0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_green: {
        flex: 1,
        backgroundColor: '#d0f0c0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_blue: {
        flex: 1,
        backgroundColor: '#c0eef0',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    extra_row: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    extra_button: {
        flex: 1,
        height: 50,
        backgroundColor: '#6464af',
        borderRadius: 10,
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerized_view: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bell_modal: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000'
    },
    bell_body: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_buttons: {
        flexDirection: 'row',
        height: 50
    },
    bell_input: {
        width: 50,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
    },
    bell_cancel_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_ok_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        margin: 20,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#ffffff80',
        margin: 10,
        borderRadius: 5,
    }
})