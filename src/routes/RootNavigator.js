import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Route from './Route';
import PublicRoute from './PublicRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {set} from 'react-native-reanimated';
import QuizScreen from '../screens/GetStarted/QuizScreen ';
import GroupedHomeRoute from './GroupedHomeRoute';
import QuizResult from '../screens/GetStarted/QuizResult';
import Rubbish from '../screens/Profile/Rubbish';
function RootNavigator() {
  const Stack = createStackNavigator();
  const Tokenstate = useSelector(state => state.userLogin.token);
  //   console.log('state' ,state)
  const [state, setState] = useState(null);
  let data = null;
  const storage = async () => {
    const load = await AsyncStorage.getItem('user');
    data = JSON.parse(load);
    setState(load);
  };

  useEffect(() => {
    storage();
  });
  // console.log('data---121',state, data);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, header: () => null}}>
        {/* <*/}
        {/* <Stack.Screen
            screenOptions={{headerShown: false}}
            name="PublicRoute"
            component={Rubbish}
            options={{headerShown: false}}
          /> */}
        
        
        {state !== null ? (
          <Stack.Screen
            screenOptions={{headerShown: false}}
            name="Route"
            component={GroupedHomeRoute}
            // Hiding header for Navigation Drawer
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            screenOptions={{headerShown: false}}
            name="PublicRoute"
            component={PublicRoute}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
