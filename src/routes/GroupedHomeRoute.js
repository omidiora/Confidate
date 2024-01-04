import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
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
import {useSelector} from 'react-redux';
import GetStarted from '../screens/GetStarted/GetStarted';
import Route from './Route';
import QuizScreen from '../screens/GetStarted/QuizScreen ';

const RoutedMainHOme = createStackNavigator();

function GroupedHomeRoute(props) {
  const stated = useSelector(state => state.userLogin.success);
  const token = useSelector(state => state.userLogin.token);

  console.log('stateMaintain ROUTE', token);
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState('');
  let data;
  const storage = async () => {
    const load = await AsyncStorage.getItem('user');
    data = JSON.parse(load);
    data = data ? data.token : null;
    setState(data);
    // console.log(load,'loaded')
  };

  useEffect(() => {
    storage();
  });
  console.log('staadlamdte', state);

  return state ? (
    <RoutedMainHOme.Navigator
       // initialRouteName={`${title}`}
    >
      {/* <RoutedMainHOme.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{headerMode: 'none', headerShown: false}}
      /> */}
      <RoutedMainHOme.Screen
        name="DrawerRoute"
        component={Route}
        options={{headerMode: 'none', headerShown: false}}
      />
    </RoutedMainHOme.Navigator>
  ) : null;
}

export default GroupedHomeRoute;
