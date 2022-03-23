import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{counter * 5}</Text>
      <Button title='add' onPress={() => { setCounter(counter + 1); }}></Button>
      <Text style={styles.text}>You clicked {counter} times</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#6463AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ffffff',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
  }
});

export default App;