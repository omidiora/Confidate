import * as types from '../actionTypes';
import * as service from '../../../API/loginuser.Services';
import {getUser} from '../../../API/getuser.Services';
import {getUserDeatils} from '../getUser/getUser.action';
const loginError = () => {
  return alert('Enter Correct Email and password');
};
export const loginRequest = () => {
  return {
    type: types.LOGIN_USER.REQUEST,
  };
};

export const loginFailure = error => {
  return {
    type: types.LOGIN_USER.FAILURE,
    error,
  };
};

export const loginSuccess = data => {
  return {
    type: types.LOGIN_USER.SUCCESS,
    payload: data,
  };
};

export const loginReset = data => {
  return {
    type: types.LOGIN_USER.CACHED,
    payload: data,
  };
};

export const login = params => {
  return (dispatch, getState) => {
    dispatch(loginRequest());
    return service
      .post(params)
      .then(json => {
        dispatch(loginSuccess(json));

        return Promise.resolve(json);
      })
      .catch(error => {
        dispatch(loginFailure(error));
        return Promise.reject(error);
      });
  };
};
