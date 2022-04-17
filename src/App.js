import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

const App = () => {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <Header />
        <GameScreen />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6667AB',
  },
});

export default App;
