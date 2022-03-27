import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';

const App = () => {
  const [name, setName] = React.useState('');
  const [submit, setSubmit] = React.useState(false);
  const onPressHandler = () => {
    if (name.length > 3)
      setSubmit(!submit);
    else
      /* 
        Alert.alert('Warning',
        'Name must contain more than 3 characters.',
        [
          { text: 'OK', onPress: () => console.warn('OK hehe') }, // positive
          { text: 'NO' }, // negative
          { text: 'Nah' }, //neutral
        ],
        {
          cancelable: true,
          onDismiss: () => { console.warn('Alert dismissed!') }
        }
      ); */
      ToastAndroid.showWithGravityAndOffset(
        'Teheehee',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        100,
        200,
      );
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Please write your name:</Text>
      <TextInput
        style={styles.input}
        placeholder='Todoroki Shouto'
        onChangeText={(value) => setName(value)}
      />

      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#ccccff' : '#b1b1ff' },
          { borderRadius: 10 },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        android_ripple={{ color: '#fff' }}
        onPress={onPressHandler}
      >
        <Text style={styles.text}>{submit ? 'clear' : 'submit'}</Text>
      </Pressable>

      {submit ?
        <Text style={styles.text}>Your name is {name}</Text>
        :
        null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  input: {
    borderColor: '#6463AF',
    borderWidth: 2,
    borderRadius: 10,
    width: 280,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },

  text: {
    color: '#6463AF',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },

  button: {
    backgroundColor: '#b1b1ff',
    borderRadius: 10,
  },
});

export default App;