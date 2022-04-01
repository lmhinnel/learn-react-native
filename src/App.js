import 'react-native-gesture-handler';
import React from 'react';

import Home from './screens/Home';
import Login from './screens/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
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
        <Stack.Screen
          name="Login"
          component={Login}
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ focused }) => (
              <FontAwsome5
                name='font'
                size={focused ? 22 : 20}
                color={focused ? '#8888ff' : '#b1b1aa'}
              />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default App;