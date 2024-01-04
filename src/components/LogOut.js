import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {loginReset} from '../redux/actions/login/login.action';

const LogOut = async () => {
  await AsyncStorage.removeItem('user');
};

export default LogOut;
