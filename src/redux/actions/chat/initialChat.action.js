import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const intiRequest = () => {
  return {
    type: types.INIT_CHAT.REQUEST,
  };
};

export const intiConFailure = error => {
  return {
    type: types.INIT_CHAT.FAILURE,
    error,
  };
};

export const intiSuccess = data => {
  return {
    type: types.INIT_CHAT.SUCCESS,
    payload: data,
  };
};

export const createChat = (params, headers) => {
  return (dispatch, getState) => {
    dispatch(intiRequest());
    return service
      .createCon(params, headers)
      .then(json => {
        dispatch(intiSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          LogOut();
          dispatch(loginReset(error));
          dispatch(intiFailure(error));
          return Promise.reject(error);
        }
        dispatch(intiFailure(error));
        return Promise.reject(error);
      });
  };
};
