import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const emergencyContactRequest = () => {
  return {
    type: types.EMER_CONTACT.REQUEST,
  };
};

export const emergencyContactFailure = error => {
  return {
    type: types.EMER_CONTACT.FAILURE,
    error,
  };
};

export const emergencyContactSuccess = data => {
  return {
    type: types.EMER_CONTACT.SUCCESS,
    payload: data,
  };
};

export const emergencyContactDeatils = (params, headers) => {
  return (dispatch, getState) => {
    dispatch(emergencyContactRequest());
    return service
      .getContacts(params, headers)
      .then(json => {
        dispatch(emergencyContactSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          // LogOut();
          // dispatch(loginReset(error));
          // alert('Login session expired');
          dispatch(emergencyContactFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(emergencyContactFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
