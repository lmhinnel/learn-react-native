import 'react-native-gesture-handler';
import React from 'react';

import ScreenA from './screens/ScreenA';
import ScreenB from './screens/ScreenB';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='ScreenB'
        screenOptions={{
          drawerPosition: 'right',
          drawerType: 'front',
          swipeEdgeWidth: 100,
          drawerStyle: {
            backgroundColor: '#ececff',
            width: 200
          },
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ececff'
          }
        }}
      >
        <Drawer.Screen
          name="ScreenA"
          component={ScreenA}
          options={{
            title: 'CreenA',
            drawerIcon: ({ focused }) => (
              <FontAwsome5
                name='font'
                size={focused ? 22 : 20}
                color={focused ? '#8888ff' : '#b1b1aa'}
              />
            )
          }}
        />
        <Drawer.Screen
          name="ScreenB"
          component={ScreenB}
          options={{
            drawerIcon: ({ focused }) => (
              <FontAwsome5
                name='bold'
                size={focused ? 22 : 20}
                color={focused ? '#8888ff' : '#b1b1aa'}
              />
            )
          }}
          initialParams={{ message: 'Hello from A' }}
        />
      </Drawer.Navigator>
    </NavigationContainer >
  );
};

export default App;