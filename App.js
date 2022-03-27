import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ToastAndroid,
  Modal,
} from 'react-native';

const App = () => {
  const [name, setName] = React.useState('');
  const [submit, setSubmit] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const onPressHandler = () => {
    if (name.length > 3)
      setSubmit(!submit);
    else setModal(true);
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
    ); 
    ToastAndroid.showWithGravityAndOffset(
      'Teheehee',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      100,
      200,
    ); */
  }

  return (
    <View style={styles.body}>
      <Modal
        visible={modal}
        transparent
        onRequestClose={() => {
          setModal(false)
        }}
        animationType='slide'
        hardwareAccelerated
      >
        <View style={styles.center_view}>
          <View style={styles.warning_modal}>
            <View style={[styles.warning_title]}>
              <Text style={styles.text}>Warning</Text>
            </View>
            <View style={styles.warning_body}>
              <Text style={styles.text}>Teheehee</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#ccccff' : '#b1b1ff' },
                styles.warning_OK]}
              android_ripple={{ color: '#fff' }}
              onPress={() => setModal(false)}
            >
              <Text style={styles.text}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#b1b1ff',
    borderRadius: 10,
  },
  center_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffc8c870",
  },

  warning_modal: {
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ffc8c8',
  },

  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc8c8',
  },

  warning_body: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  warning_OK: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },


});

export default App;