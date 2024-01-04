import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  Login,
  Register,
  Disclaimer,
  ForgetPassword,
  ResetPassword,
  VerfiyOtp,
  getStarted,
} from '../screens';
import TermsandCondtions from '../screens/TermsandCondtions/TermsandCondtions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import GetStarted from '../screens/GetStarted/GetStarted';

const PublicStack = createStackNavigator();
function PublicRoute(props) {
  const stated = useSelector(state => state.userLogin.logout);

  console.log(
    'stateMaintain',
    useSelector(state => state.userLogin.logout),
  );
  const [val, setVal] = useState(stated);
  const [state, setState] = useState(true);
  let title = stated ? 'Login' : 'GetStarted';
  console.log(stated, 'loadedLogin Workflow');

  let data
  const storage = async () => {
    const load = await AsyncStorage.getItem('user');
    data = JSON.parse(load);

    if (data) {
      setState(false);
    } else {
      setState(true);
    }
  };
  useEffect(() => {
    storage();
  }, [stated]);

  return (
    <PublicStack.Navigator
    screenOptions={{ headerShown: false }}
        // initialRouteName={`${title}`}
        >
        <PublicStack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerMode: 'none', headerShown: false }}
        />
        <PublicStack.Screen
          name="Disclaimer"
          component={Disclaimer}
          options={{ headerMode: 'none', headerShown: false }}
        />

        <PublicStack.Screen
          name="Login"
          component={Login}
          options={{ headerMode: 'none', headerShown: false }}
        />
        <PublicStack.Screen
          name="Register"
          component={Register}
          options={{ headerMode: 'none', headerShown: false }}
        />
        <PublicStack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerMode: 'none', headerShown: false }}
        />
        <PublicStack.Screen
          name="VerfiyOtp"
          component={VerfiyOtp}
          options={{ headerMode: 'none', headerShown: false }}
        />

        <PublicStack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerMode: 'none', headerShown: false }}
        />
        <PublicStack.Screen
          name="TermsandConditions"
          component={TermsandCondtions}
          options={{ headerMode: 'none', headerShown: false }}
        />
      </PublicStack.Navigator>
  );
}

export default PublicRoute;
