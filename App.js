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
      <View style={styles.row}>
        <View style={styles.view1}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>

      <View style={[styles.row, styles.row2]}>
        <Text style={styles.text}>4</Text>
      </View>
      <View style={[styles.row, styles.row3]}>
        <Text style={styles.text}>5</Text>
      </View>

      <View style={[styles.row, styles.row4]}>
        <View style={styles.view6}>
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text}>7</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#6463AF',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row2: {
    backgroundColor: '#edbc0a',
  },

  row3: {
    backgroundColor: '#eaac0a',
  },

  row4: {
    flex: 1,
    alignItems: 'stretch',
  },

  view1: {
    flex: 1,
    backgroundColor: '#4463AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view2: {
    flex: 2,
    backgroundColor: '#2253AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view3: {
    flex: 3,
    backgroundColor: '#0073AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view6: {
    flex: 1,
    backgroundColor: '#9963AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view7: {
    flex: 1,
    backgroundColor: '#7763AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 36,
    fontStyle: 'italic',
    margin: 10,
  }
});

export default App;