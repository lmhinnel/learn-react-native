import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../src/utils/Intro';
import { FlatList, Text } from 'react-native';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the flatlist component', () => {
  const tree = renderer.create(
    <FlatList
      data={['item1', 'item', 'item3']}
      keyExtractor={item => item}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})