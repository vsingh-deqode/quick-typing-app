import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import 'react-native-gesture-handler';
import {InitialNavigator} from './src/navigation/navigator/InitialNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <InitialNavigator />
    </NavigationContainer>
  );
}
