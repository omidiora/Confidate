import * as types from '../actionTypes';
import * as service from '../../../API/getuser.Services';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const getRequest = () => {
  return {
    type: types.GET_USER.REQUEST,
  };
};

export const getFailure = error => {
  return {
    type: types.GET_USER.FAILURE,
    error,
  };
};
export const getNetwork = error => {
  return {
    type: types.GET_USER.CACHED,
    error,
  };
};

export const getSuccess = data => {
  return {
    type: types.GET_USER.SUCCESS,
    payload: data,
  };
};

export const getUserDeatils = params => {
  // alert('muneer');
  return (dispatch, getState) => {
    // console.log('sd', getState);
    dispatch(getRequest());
    return service
      .getUser(params)
      .then(json => {
        console.log(json,'userINfo');
        dispatch(getSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          alert('Login session expired');
          LogOut();
          dispatch(loginReset(error));
          dispatch(getFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(getFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
