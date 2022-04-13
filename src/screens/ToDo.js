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

export default function ToDo({ navigation }) {
  const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getTasks();
  }, [])

  const getTasks = () => {
    AsyncStorage.clear();
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks));
        }
      }).catch(err => console.log(err));
  }

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
        data={tasks.filter(task => task.Done === false)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.item_row}>
              <View
                style={[{
                  backgroundColor:
                    item.Color === 'red' ? '#f0c0c0' :
                      item.Color === 'green' ? '#d0f0c0' :
                        item.Color === 'blue' ? '#c0eef0' : '#fff',
                }, styles.color]}
              />
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskID(Date.now()));
          navigation.navigate('Task');
        }}
      >
        <FontAwesome5
          name={'plus'}
          size={20}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6464af',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
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
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});