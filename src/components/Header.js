import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function Header() {
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text style={[GlobalStyles.text, styles.text]}>WORDLE </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  text: {
    color: '#F5DF4D',
    fontSize: 54,
  },
});