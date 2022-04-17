import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

export const TextBlockState = {
  GUESS: 'guess',
  CORRECT: 'correct',
  POSSIBLE: 'possible',
  INCORRECT: 'incorrect',
}

const ColorMap = {
  [TextBlockState.GUESS]: 'transparent',
  [TextBlockState.CORRECT]: '#6aa84f',
  [TextBlockState.POSSIBLE]: '#F1C232',
  [TextBlockState.INCORRECT]: '#444444',
};

const TextBlock = (props) => {
  const { text, state } = props;

  return (
    <View
      style={[
        styles.container,
        GlobalStyles.container,
        { backgroundColor: ColorMap[state] },
      ]}>
      <Text style={[styles.text, GlobalStyles.text]}>
        {text.toUpperCase() + ' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
  },
  text: {
    fontSize: 32,
    color: '#fff',
  },
});

export default TextBlock;