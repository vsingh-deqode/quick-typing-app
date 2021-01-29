import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home} from '../../../screens/home';
import {HomeScreen} from '../constants/HomeScreen';

const Stack = createStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={HomeScreen.Home}
      component={Home}
      options={{title: 'Home'}}
    />
  </Stack.Navigator>
);
