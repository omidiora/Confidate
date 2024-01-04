import {BASE_URL, POST, GET_USER} from './constants';
import {statusParsing, jsonParsing} from './utilis';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOut from '../components/LogOut';

export const getUser = headers => {

  const resource = `https://api.confidateapp.com/api/getProfile`;
  return axios
    .post(resource, {headers})

    .then(jsonParsing);
  // .catch(Error => {
  //   console.log('err', Error.toString().slice(39, 42) === '401');
  //   if (Error.toString().slice(39, 42) === '401') {
  //     // await AsyncStorage.removeItem('user');
  //     // ForegroundService.stopService();
  //     // LogOut();
  //     // alert('Login Session Expired');
  //   } else {
  //     Error ? alert(Error) : '';
  //   }
  // });
};
