import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Initial} from '../../screens/initial';
import {InitialScreen} from '../constants/InitialScreen';

const Stack = createStackNavigator();

export const InitialNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={InitialScreen.Initial}
      component={Initial}
      options={{title: 'Initial'}}
    />
  </Stack.Navigator>
);
