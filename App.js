import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';

const App = () => {
  const [items, setItems] = useState([
    { key: 0, name: 'Item 0' },
    { key: 1, name: 'Item 1' },
    { key: 2, name: 'Item 2' },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...items, {key: items.length, name: 'Item ' + items.length}]);
    setRefreshing(false);
  }

  return (
    <View style={styles.body}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#d463AF']}
          />
        }>
        {items.map((item) => {
          return (
            <View style={styles.item} key={item.key}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  item: {
    margin: 10,
    backgroundColor: '#6463AF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 36,
    fontStyle: 'italic',
    margin: 10,
  }
});

export default App;