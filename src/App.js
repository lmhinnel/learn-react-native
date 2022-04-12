import 'react-native-gesture-handler';
import React from 'react';

import Home from './screens/Home';
import Login from './screens/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

import { LogBox } from 'react-native';
import Map from './screens/Map';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
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
              headerShown: false,
            }}
            initialParams={{ message: 'Hello from A' }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
};

export default App;