import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const getConRequest = () => {
  return {
    type: types.GET_CON.REQUEST,
  };
};

export const getChatFailure = error => {
  return {
    type: types.GET_CHAT.FAILURE,
    error,
  };
};

export const getChatSuccess = data => {
  return {
    type: types.GET_CHAT.SUCCESS,
    payload: data,
  };
};

export const getChatDeatils = (params, headers) => {
  return (dispatch, getState) => {
    dispatch(getConRequest());
    return service
      .getChat(params, headers)
      .then(json => {
        dispatch(getChatSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          // LogOut();
          // dispatch(loginReset(error));
          // alert('Login session expired');
          dispatch(getChatFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(getChatFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
