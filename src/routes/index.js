import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home';
import ScanScreen from '../screens/scan';
import ResultsScreen from '../screens/results';

import strings from '../resources/values/strings.json';

const Stack = createStackNavigator();

export default function Routes() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ HomeScreen } options={{ headerShown: false }}/>

        <Stack.Screen name="Scan" options={{ title: strings.scan_screen_name }}>
          
          { props => <ScanScreen { ...props } /> }

        </Stack.Screen>

        <Stack.Screen name="Results" options={{ title: strings.results_screen_name }}>
          
          { props => <ResultsScreen { ...props } /> }

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );

}