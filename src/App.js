import React from 'react';

import ScreenA from './ScreenA';
import ScreenB from './ScreenB';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

/* const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // activeColor='#b1b1ff'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            size = focused ? 25 : 20;
            // color = focused ? '#b1b1ff' : '#ccccff'
            if (route.name === 'ScreenA') {
              iconName = 'font';
            } else if (route.name === 'ScreenB') {
              iconName = 'bold';
            }
            return (
              <FontAwsome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
          tabBarActiveTintColor: '#5555aa',
          tabBarActiveBackgroundColor: '#ffb1b1',
          tabBarShowLabel: true,
          tabBarLabelStyle: { fontSize: 12 }
        })}
      >
        <Tab.Screen
          name="ScreenA"
          component={ScreenA}
          options={{
            tabBarBadge: 3
          }}
        />
        <Tab.Screen
          name="ScreenB"
          component={ScreenB}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}; */

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            size = focused ? 25 : 20;
            // color = focused ? '#b1b1ff' : '#ccccff'
            if (route.name === 'ScreenA') {
              iconName = 'font';
            } else if (route.name === 'ScreenB') {
              iconName = 'bold';
            }
            return (
              <FontAwsome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
        })}
        activeColor='#5544aa'
        inactiveColor='#a1a1a1'
        barStyle={{
          backgroundColor: '#ccccff'
        }}
        tabBarIcon={true}
      >
        <Tab.Screen
          name="ScreenA"
          component={ScreenA}
        />
        <Tab.Screen
          name="ScreenB"
          component={ScreenB}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
};

export default App;