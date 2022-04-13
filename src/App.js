import 'react-native-gesture-handler';
import React from 'react';

import Splash from './screens/Splash';
import ToDo from './screens/ToDo';
import Done from './screens/Done';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

import { LogBox } from 'react-native';
import Task from './screens/Task';
import Camera from './screens/Camera';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let name;
            size = focused ? 25 : 20;
            if (route.name === 'To-Do') name = 'clipboard-list';
            else if (route.name === 'Done') name = 'clipboard-check';
            return (
              <FontAwsome5
                name={name}
                size={size}
                color={color}
              />
            )
          },
          headerShown: false,
          tabBarActiveTintColor: '#6464af',
          tabBarInactiveTintColor: '#7777',
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' }
        })
      }
    >
      <Tab.Screen name={'To-Do'} component={ToDo} />
      <Tab.Screen name={'Done'} component={Done} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName='Splash'
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#6464af'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold'
            }
          }}
        >
          <RootStack.Screen
            name="Splash"
            component={Splash}
            initialParams={{ message: 'Hello from A' }}
            options={{
              headerShown: false
            }}
          />
          <RootStack.Screen
            name="My Tasks"
            component={HomeTabs}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
          />
          <RootStack.Screen
            name="Camera"
            component={Camera}
          />
        </RootStack.Navigator>
      </NavigationContainer >
    </Provider>
  );
};

export default App;