import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  SectionList,
} from 'react-native';

const App = () => {
  const [items, setItems] = useState([
    {
      title: 'Item 0',
      data: ['Item 0.0'],
    },
    {
      title: 'Item 1',
      data: ['Item 1.0', 'Item 1.1'],
    },
    {
      title: 'Item 2',
      data: ['Item 2.0', 'Item 2.1', 'Item 2.2'],
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    var data = [];
    const length = items.length;
    for (var i = 0; i <= length; i++) {
      data.push('Item ' + length + '.' + i);
    }
    setItems([...items, { title: 'Item ' + items.length, data: data }]);
    setRefreshing(false);
  }

  return (
    <View style={styles.body}>
      <SectionList
        keyExtractor={(item, index) => index.toString()}
        sections={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.title}>
            <Text style={styles.text_title}>{section.title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6463AF']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },

  item: {
    backgroundColor: '#6463AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },

  title: {
    backgroundColor: '#1463AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },

  text: {
    color: '#fff',
    fontSize: 24,
    fontStyle: 'italic',
    margin: 10,
  },

  text_title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
  }
});

export default App;