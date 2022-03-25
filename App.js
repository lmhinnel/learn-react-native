import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

const App = () => {
  const [name, setName] = React.useState('');

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Please write your name:</Text>
      <TextInput
        // multiline
        // keyboardType='phone-pad'
        style={styles.input}
        placeholder='Todoroki Shouto'
        onChangeText={(value) => setName(value)}
        secureTextEntry={true}
      />
      <Text style={styles.text}>Your name is {name}</Text>
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
  },

  text: {
    color: '#6463AF',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  }
});

export default App;