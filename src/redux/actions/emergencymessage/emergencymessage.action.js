import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const emergencyMessageRequest = () => {
  return {
    type: types.EMER_CONTACT.REQUEST,
  };
};

export const emergencyMessageFailure = error => {
  return {
    type: types.EMER_CONTACT.FAILURE,
    error,
  };
};

export const emergencyMessageSuccess = data => {
  return {
    type: types.EMER_CONTACT.SUCCESS,
    payload: data,
  };
};

export const emergencyMessageDeatils = (params, headers) => {
  console.log(params,"PARAMS=>")
  return (dispatch, getState) => {
    dispatch(emergencyMessageRequest());
    return service
      .getMessage(params, headers)
      .then(json => {

        dispatch(emergencyMessageSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          // LogOut();
          // dispatch(loginReset(error));
          // alert('Login session expired');
          dispatch(emergencyMessageFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(emergencyMessageFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
