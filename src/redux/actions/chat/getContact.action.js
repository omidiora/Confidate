import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const getContactRequest = () => {
  return {
    type: types.GET_CONTACT.REQUEST,
  };
};

export const getContactFailure = error => {
  return {
    type: types.GET_CONTACT.FAILURE,
    error,
  };
};

export const getContactSuccess = data => {
  return {
    type: types.GET_CONTACT.SUCCESS,
    payload: data,
  };
};

export const getContactDeatils = (params, headers) => {
  return (dispatch, getState) => {
    dispatch(getContactRequest());
    return service
      .findContacts(params, headers)
      .then(json => {
        dispatch(getContactSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          alert('Login session expired');
          LogOut();
          dispatch(loginReset(error));
          dispatch(getContactFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(getContactFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
