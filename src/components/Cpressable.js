import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CPressable = (props) => {
  const { text, onPress } = props;

  const [isPressedIn, setIsPressedIn] = React.useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressedIn(true)}
      onPressOut={() => setIsPressedIn(false)}>
      <View style={[styles.button, isPressedIn && styles.active]}>
        <Text style={[GlobalStyles.text, styles.text]}>{text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ffc8c8',
    backgroundColor: '#ffc8c8'
  },
  active: {
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 26
  }
});

export default CPressable;