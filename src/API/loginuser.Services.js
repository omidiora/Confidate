import {BASE_URL, POST, LOGIN} from './constants';
import {statusParsing, jsonParsing} from './utilis';
import axios from 'axios';
import {getUser} from './getuser.Services';

export const post = (params = {}) => {
  let loginDetail = {
    email: params.email,
    password: params.password,
  };

  const resource = `${'https://api.confidateapp.com/api'}${LOGIN}`;
  // const resource = `https://api.confidateapp.com/api`;

  return axios
    .post(resource, loginDetail, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
    .then(statusParsing)
    .then(jsonParsing)
    .catch(Error => {
      // console.log('err-lo', Error);
      // Error ? alert(Error.toString()) : '';
      // Error[0] === 'Error: Network Error' ? alert('Muneer') : '';
    });
};
