import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../utils/GlobalStyle';

export default function Done({ navigation }) {
  const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully');
      }).catch(err => console.log(err));
  };

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success!', 'Task state is changed');
        }).catch(err => console.log(err));
    }
  }

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.item_row}>
              <CheckBox
                value={item.Done}
                onValueChange={(newValue) => checkTask(item.ID, newValue)}
              />
              <View style={styles.item_body}>
                <Text
                  style={[GlobalStyle.CustomFont, styles.title]}
                  onPress={() => {
                    dispatch(setTaskID(item.ID));
                    navigation.navigate('Task');
                  }}
                >
                  {item.Title}
                </Text>
                <Text
                  style={[GlobalStyle.CustomFont, styles.subtitle]}
                  numberOfLines={1}
                >
                  {item.Desc}
                </Text >
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteTask(item.ID)}
              >
                <FontAwesome5
                  name={'trash'}
                  size={24}
                  color={'#ff5555'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 4,
    backgroundColor: '#fffbcd',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 44,
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#999',
    fontSize: 30,
    marginHorizontal: 10,
  },
});